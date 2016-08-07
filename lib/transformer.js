const {formatObject} = require('./formatter.js');

const transformers = {
  degree: {start: 0, end: 360, startPWM: 500, endPWM: 2500},
  gradian: {start: 0, end: 400, startPWM: 500, endPWM: 2500},
  radian: {start: 0, end: 2 * Math.PI, startPWM: 500, endPWM: 2500},
};

//
// Transformers
//
const Transformer = module.exports = {
  createFrom(name, {positive = true, end}, stringify = true) {
    const transformer = Object.assign({}, transformers[name]);
    transformer.end = end ? end : transformer.end;
    if (!positive) {
      const medium = transformer.end / 2.0;
      transformer.start = -medium;
      transformer.end = medium;
    }
    return Transformer.create(transformer, stringify);
  },

  /**
   * Creates a transformer.
   * @param {number} start - the start position.
   * @param {number} end - the end position.
   * @param {number} startPWM - the start pwm position.
   * @param {number} endPWM - the end pwm position.
   * @param {boolean} stringify - apply stringify if it is true.
   * @returns {function} the transformation.
   */
  create({start, end, startPWM, endPWM}, stringify = true) {
    const interval = end - start;
    const intervalPWM = endPWM - startPWM;
    const ratio = intervalPWM / interval;

    return (data) => {
      const {value} = data;
      data.pwm = startPWM + (value - start) * ratio;
      return stringify ? formatObject(data) : data;
    };
  }
};
