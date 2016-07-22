const fs = require('fs');
const path = require('path');

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
    const [command, file] = program.args;
    const fullpath = `../examples/${file}`;
    console.log(command, fullpath, require(fullpath));
  }

  list(program) {
    const [command, query] = program.args;
    const fullpath = path.resolve(__dirname, '../examples/');
    const examples = fs.readdirSync(fullpath).map(file => '  ' + file.replace(/\.js$/, ''))
    console.log(`${command}: Examples available to run\n`);
    console.log(examples.join('\n'));
  }
};

module.exports = Commands;
