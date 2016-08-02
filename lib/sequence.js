const EventEmitter = require('events');
const async = require('async');
const {format} = require('./format');

//
// Class Sequence
//

/**
 * Events: play, stop, complete, keyframe, error, start-keyframe.
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
    this._currentHander = null;
  }

  /**
   * Generates repetitions if repeat is a positive valid number.
   * @param {object[]} keyframes - sequence tasks.
   * @param {number|mix} repeat - number of repetitions.
   */
  _generate(keyframes, repeat) {
    let frames = keyframes;
    if (!isNaN(repeat) && repeat >= 0) {
      frames = [];
      for (let index = 0;index < repeat;++index) {
        frames.push(...keyframes);
      }
    }

    let _index = 0;
    return frames.map(frame => {
      frame.index = _index++;
      return frame;
    });
  }

  /**
   * Stops the current execution.
   */
  stop() {
    try {
      clearTimeout(this._currentHander);
      this._currentHander = null;
      this.emit('stop');
    } catch (error) {
      this.emit('error', error);
    }
  }

  /**
   * Plays a sequence.
   * @param {object} playOptions - play options.
   */
  play(playOptions) {
    // TODO: try to stop current rutine.
    const {name = 'keyframes'} = playOptions || (this._options || {}).playOptions || {};
    this._play(this._options[name], playOptions);
  }

  /**
   * Plays a sequence.
   * @param {object[]} keyframes - sequence tasks.
   * @param {object} playOptions - play options.
   */
  _play(keyframes, playOptions) {
    const {repeat} = playOptions || {};
    const {length} = keyframes;
    const frames = this._generate(keyframes, repeat);

    this.emit('play', frames, playOptions);
    const execute = (frame, callback) => {
      this._currentHander = setTimeout(() => {
        if (this._currentHander == null) {
          return null;
        }

        try {
          if (frame.index % length) {
            this.emit('start-keyframe', frame, playOptions);
          }

          this.emit('keyframe', frame, playOptions);
          callback(null, frame);
        } catch (error) {
          this.emit('error', error, frame);
        }
      }, frame.time);
    };

    async.mapSeries(frames, execute, (error, results) => {
      this.emit('complete', results);
    });
  }
};

module.exports = Sequence;
