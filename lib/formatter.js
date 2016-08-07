const int = (value) => {
  return !isNaN(value) ? Math.floor(value) : value;
};

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
    const time = isNaN(duration) ? '' : `T${int(duration)}`;
    return `#${int(pin)}P${int(pwm)}${time}`;
  }
};
