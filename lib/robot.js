const EventEmitter = require('events');

//
// Robot
//
class Robot extends EventEmitter {
  constructor(options) {
    super();
    this._init(options);
  }

  _init(options) {
    this._options = options;
  }

  do(command, playOptions) {
  }
};
