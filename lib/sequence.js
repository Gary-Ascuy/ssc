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

    let index = 0;
    return frames.map(frame => {
      return Object.assign({index: index++}, frame);
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
    const {name = 'keyframes'} = playOptions || (this._options || {}).playOptions || {};
    this._throwIf(!this._options[name], 'There is no valid sequence');
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
      this._run(frame.time, () => {
        try {
          this._emitIf(!(frame.index % length), 'start-keyframe', frame, playOptions);
          this.emit('keyframe', frame, playOptions);
          callback(null, frame);
        } catch (error) {
          this.emit('error', error, frame);
        }
      });
    };

    async.mapSeries(frames, execute, (error, results) => {
      this.emit('complete', results);
    });
  }

  /**
   * Runs the callback function after time updating the current handler.
   * @param {number} time - the time in milisecond to call the function.
   * @param {function} callback - the function to call after the time.
   */
  _run(time, callback) {
    this._currentHander = setTimeout(() => {
      if (this._currentHander == null) {
        return null;
      }
      callback();
    }, time);
  }

  /**
   * Emits an event if the condition is evaluated as true.
   * @param {boolean|function} cond - the condition.
   * @param {string} name - event name.
   * @param {object[]} args - event arguments.
   */
  _emitIf(cond, name, ...args) {
    if (typeof cond === 'function' ? cond() : cond) {
      this.emit(name, ...args);
    }
  }

  /**
   * Throws an error if the condition is evaluated as true.
   * @param {boolean|function} cond - the condition.
   * @param {object[]} args - error arguments.
   */
  _throwIf(cond, ...args) {
    if (typeof cond === 'function' ? cond() : cond) {
      throw new Error(...args);
    }
  }
};

module.exports = Sequence;
