const EventEmitter = require('events');
const {format} = require('./format');

//
// Class Sequence
//
class Sequence extends EventEmitter {
  constructor(options) {
    super();
    this._init(options);
  }

  _init(options) {
    this._options = options;
  }

  play(ssc, playOptions) {
    const {defaults, keyframes} = this._options;
    const frames = keyframes.map(keyframe => Object.assign({time: 1000, actions: {}}, defaults, keyframe || {}));
    this.emit('start', this._options);
    this._run(ssc, frames, playOptions, 0);
  }

  _run(ssc, frames, playOptions, position) {
    if (position < frames.length) {
      const frame = frames[position];
      setTimeout(() => {
        this._execute(ssc, frame, position)
        this._run(ssc, frames, playOptions, ++position);
      }, frame.time);
    } else {
      this.emit('end', this._options);
    }
  }

  _format({actions}) {
    const formats = [];
    for (const pin in actions) {
      const pwm = actions[pin];
      formats.push(format(Object.assign({pin}, isNaN(pwm) ? pwm : {pwm})));
    }
    return formats.join(' ');
  }

  _execute(ssc, frame, position) {
    const message = this._format(frame);
    this.emit('keyframe', frame, message);
    ssc.write(message);
  }
};

module.exports = Sequence;
