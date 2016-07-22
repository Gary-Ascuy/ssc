class Commands {
  constructor() {}

  help(program) {
    program.help();
  }

  default(program) {
    console.log('  Unknown sub-command');
    program.help();
  }

  run(program) {
    console.log(program.args);
  }
};

module.exports = Commands;
