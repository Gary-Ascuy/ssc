const EventEmitter = require('events');

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
    this._options = options;
  }

  /**
   * Executes a command of this robot with play options.
   * @param {string} command - command name.
   * @param {object} playOptions - play options.
   */
  do(command, playOptions) {
    const sequence = options.commands[command];
    sequence.play(Object.assign({}, options.playOptions, playOptions));
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
