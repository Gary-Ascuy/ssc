const SerialPort = require('serialport');
const EventEmitter = require('events');
const {format} = require('./format');

const defaults = {
  port: '/dev/cu.SLAB_USBtoUART',
  openOptions: {
    baudrate: 115200
  }
};

//
// Class Serial Servo Controller (SSC)
//

/**
 * Events: open, close, data, error, write.
 */
class SSC extends EventEmitter {
  /**
   * Creates an SSC instance.
   */
  constructor(options) {
    super();
    this._init(options);
  }

  /**
   * Gets the current options.
   */
  options() {
    return this._options;
  }

  /**
   * Initializes and open the serial port.
   * @param {object} options - ssc options.
   */
  _init(options) {
    const opts = this._options = Object.assign({}, defaults, options || {});
    this.sp = new SerialPort(opts.port, opts.openOptions);
    this.sp.on('open', (...args) => this.emit('open', ...args));
    this.sp.on('data', (...args) => this.emit('data', ...args));
    this.sp.on('error', (...args) => this.emit('error', ...args));
  }

  /**
   * Closes the connection.
   * @param {function} callback - the function to call after complete operation.
   */
  close(callback) {
    this.emit('close');
    this.sp.close(callback);
  }

  /**
   * Writes a message into serial port.
   * @param {string|Buffer} message - the message.
   */
  _write(message) {
    this.emit('write', message);
    return this.sp.write(message);
  }

  /**
   * Writes a message into serial port adding newline.
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
    const command = format(pin, pwm, duration);
    return this._write(`${command}\r\n`);
  }
};

module.exports = SSC;
