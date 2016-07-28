//
// Formaters
//
module.exports = {
  /**
   * Generates a message from message object.
   * @param {object} message object.
   * @returns {string} a message format.
   */
  format({pin, pwm, duration}) {
    const time = isNaN(duration)? '' : `T${duration}`;
    return `#${pin}P${pwm}${time}`;
  }
};
