const SerialPort = require('serialport');

const defaults = {
  port: '/dev/cu.SLAB_USBtoUART',
  serialPortOptions: {
    baudrate: 115200
  }
};

function SSC(options) {
  const opts = Object.assign(options || {}, defaults);
  this.sp = new SerialPort(opts.port, opts.serialPortOptions);
};

/**
 * Writes a message into serial port.
 * @param {string|Buffer} message - the message.
 */
SSC.prototype.write = function(message) {
  return this.sp.write(message);
};

/**
 * Moves the servo motor 'pin' to 'pwm' with 'duration'.
 * @param {number} pin - a valid positive number between 0 to 31.
 * @param {number} pwm - a valid positive number between 500 to 2500.
 * @param {number} duration - a valid positive number.
 */
SSC.prototype.move = function(pin, pwm, duration) {
  return this.write(`#${pin}P${pwm}T${duration}\r\n`);
};

module.exports = SSC;
