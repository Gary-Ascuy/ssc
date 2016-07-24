//
// Formaters
//
module.exports = {
  format({pin, pwm, duration}) {
    const time = isNaN(duration)? '' : `T${duration}`;
    return `#${pin}P${pwm}${time}`;
  }
};
