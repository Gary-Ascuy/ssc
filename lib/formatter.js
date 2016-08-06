//
// Formaters
//
const Formatter = module.exports = {
  /**
   * Generates a formatted message from object.
   * @param {object} message object.
   * @returns {string} a message format.
   */
  formatObject({pin, pwm, duration}) {
    return Formatter.format(pin, pwm, duration);
  },

  /**
   * Generates a formatted message.
   * @param {number} pin - the pin to move.
   * @param {number} pmw - the pmw.
   * @param {number} [duration = null] - duration in miliseconds.
   * @returns {string} a message format.
   */
  format(pin, pwm, duration) {
    const time = isNaN(duration)? '' : `T${duration}`;
    return `#${pin}P${pwm}${time}`;
  }
};
