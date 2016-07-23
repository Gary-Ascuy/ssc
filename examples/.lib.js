const program = require('commander');

//
// Load Command line arguments.
//
module.exports = {
  getOptions() {
    return {port: program.port, openOptions: {
      baudRate: +program.ooBaudRate,
      dataBits: +program.ooDataBits,
      parity: program.ooParity,
      stopBits: +program.ooStopBits
    }};
  }
};
