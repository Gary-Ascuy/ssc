const SerialPort = require('serialport');
const EventEmitter = require('events');

const defaults = {
  port: '/dev/cu.SLAB_USBtoUART',
  openOptions: {
    baudrate: 115200
  }
};

class SSC extends EventEmitter {
  constructor(options) {
    super();
    this._init(options);
  }

  options() {
    return this._options;
  }

  _init(options) {
    const opts = this._options = Object.assign(defaults, options || {});
    this.sp = new SerialPort(opts.port, opts.openOptions);
    this.sp.on('open', (...args) => this.emit('open', ...args));
    this.sp.on('data', (...args) => this.emit('data', ...args));
    this.sp.on('error', (...args) => this.emit('error', ...args));
  }

  close(callback) {
    this.sp.close(callback);
  }

  _write(message) {
    return this.sp.write(message);
  }

  /**
   * Writes a message into serial port.
   * @param {string|Buffer} message - the message.
   */
  write(message) {
    return this._write(`${message}\r\n`);
  }

  /**
   * Moves the servo motor 'pin' to 'pwm' with 'duration'.
   * @param {number} pin - a valid positive number between 0 to 31.
   * @param {number} pwm - a valid positive number between 500 to 2500.
   * @param {number} duration - a valid positive number.
   */
  move(pin, pwm, duration = 0) {
    return this._write(`#${pin}P${pwm}T${duration}\r\n`);
  }
};

module.exports = SSC;
