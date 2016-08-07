const {formatObject} = require('./formatter.js');

//
// Transformers
//
const Transformer = module.exports = {
  // create(pin, pwm, duration)

  create(start, end, startPWM, endPWM, stringify = true) {
    const interval = end - start;
    const intervalPWM = endPWM - startPWM;
    const ratio = intervalPWM / interval;

    return (data) => {
      const {value} = data;
      data.pwm = startPWM + (value - start) * ratio;
      return stringify ? formatObject(data) : data;
    }
  }
};
