#! /usr/bin/env node
const program = require('commander');
const Commands = require('./commands');
const packageJson = require('../package.json');

program.version(packageJson.version)
  .description(packageJson.description)
  .usage('[options] <command> [parameters ...]')
  .option('-i, --input <file>', 'Execution file script')
  .parse(process.argv);

if (!program.args.length) {
  program.help();
} else {
  const [command] = program.args;
  const commands = new Commands();
  (commands[command] || commands['default'])(program);
}
