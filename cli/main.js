#! /usr/bin/env node
const program = require('commander');
const Commands = require('./commands');

program.version('0.0.1')
  .description('Serial Servo Controller CLI')
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
