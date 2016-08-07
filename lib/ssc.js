const SerialPort = require('serialport');
const EventEmitter = require('events');
const fs = require('fs');

const defaults = {
  port: '/dev/cu.SLAB_USBtoUART',
  openOptions: {baudrate: 115200},
  transform(data) {return data;}
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

    for (const name in opts.events || {}) {
      this.on(name, opts.events[name]);
    }

    if (fs.existsSync(opts.port)) {
      this.sp = new SerialPort(opts.port, opts.openOptions);
      this.sp.on('open', (...args) => this.emit('open', ...args));
      this.sp.on('data', (...args) => this.emit('data', ...args));
      this.sp.on('error', (...args) => this.emit('error', ...args));
    } else {
      // TODO: Temporal fix to allow tests
      this.sp = {open(){}, write(message){this._message = message;}, close(){}};
      this.emit('open', this.sp);
    }
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
   * Writes a message into serial port adding newline.
   * @param {string} message - the message.
   * @param {boolean} line - true to write as new line.
   */
  write(message, line = true) {
    const {transform} = this._options;
    const data = line ? `${transform(message)}\r\n` : transform(message);
    this.emit('write', data);
    return this.sp.write(data);
  }
};

module.exports = SSC;
