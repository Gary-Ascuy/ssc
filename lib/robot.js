const EventEmitter = require('events');
const Sequence = require('./sequence')

//
// Robot
//
class Robot extends EventEmitter {
  /**
   * Creates an Robot instance.
   */
  constructor(options) {
    super();
    this._init(options);
  }

 /**
  * Initializes robot instance.
  * @param {object} options - robot options.
  */
  _init(options) {
    this._options = options || {};
  }

  /**
   * Executes a command of this robot with play options.
   * @param {string} command - command name.
   * @param {object} playOptions - play options.
   * @param {boolean} playOptions.autoPlay - auto play the sequence if it is true.
   * @param {number} playOptions.repeat - number of repetitions.
   * @param {object} playOptions.events - has map of event functions to apply in teh sequence.
   */
  do(command, playOptions) {
    const sequence = new Sequence(this._options.commands);
    const options = playOptions || {};
    if (options.autoPlay || this._options.autoPlay) {
      options.name = command;
      this._applyEvents(sequence, options.events || {});
      sequence.play(options);
    }
    return sequence;
  }

  /**
   * Adds events into event emitter.
   * @param {EventEmitter} eventEmitter - event emitter instance.
   * @param {object} events - function map.
   */
  _applyEvents(eventEmitter, events) {
    for (const name in events) {
      eventEmitter.on(name, events[name]);
    }
  }

  /**
   * Check if this instance has a command name.
   * @param {string} command - command name.
   * @returns {boolean} true if command exist false otherwise.
   */
  has(command) {
    return !!this._options.commands[command];
  }
};

module.exports = Robot;
