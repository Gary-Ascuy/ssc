const EventEmitter = require('events');
const {format} = require('./format');

//
// Class Sequence
//

/**
 * Events: start, keyframe, end.
 */
class Sequence extends EventEmitter {
  /**
   * Creates an Sequence instance.
   */
  constructor(options) {
    super();
    this._init(options);
  }

  /**
   * Initializes the sequence with options.
   * @param {object} options - sequence options.
   */
  _init(options) {
    this._options = options;
  }

  /**
   * Plays the current sequence with the play options.
   * @param {object} ssc - serial servo controller instance.
   * @param {object} playOptions - play options.
   */
  play(ssc, playOptions) {
    const {defaults, keyframes} = this._options;
    const frames = keyframes.map(keyframe => Object.assign({time: 1000, actions: {}}, defaults, keyframe || {}));
    this.emit('start', this._options);
    this._run(ssc, frames, playOptions, 0);
  }

  /**
   * Runs the current sequence with the play options.
   * @param {object} ssc - serial servo controller instance.
   * @param {object[]} frames - the frames to execute.
   * @param {object} playOptions - play options.
   * @param {object} position - current position.
   */
  _run(ssc, frames, playOptions, position) {
    if (position < frames.length) {
      const frame = frames[position];
      setTimeout(() => {
        this._execute(ssc, frame, position);
        this._run(ssc, frames, playOptions, ++position);
      }, frame.time);
    } else {
      this.emit('end', this._options);
    }
  }

  /**
   * Formats an array of actions.
   * @param {object[]} actions - a list of actions.
   * @returns {string} a message to write in the device.
   * TODO: Removes dependency of format.
   */
  _format({actions}) {
    const formats = [];
    for (const pin in actions) {
      const pwm = actions[pin];
      formats.push(format(Object.assign({pin}, isNaN(pwm) ? pwm : {pwm})));
    }
    return formats.join(' ');
  }

  /**
   * Executes a frame.
   * @param {object} ssc - serial servo controller instance.
   * @param {object} frame - frame instance.
   * @param {object} position - current position.
   */
  _execute(ssc, frame, position) {
    const message = this._format(frame);
    this.emit('keyframe', frame, message);
    ssc.write(message);
  }
};

module.exports = Sequence;
