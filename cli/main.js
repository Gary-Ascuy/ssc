#! /usr/bin/env node
const program = require('commander');

program.version('0.0.1')
  .usage('[options] <keywords>')
  .option('-i, --input [file]', 'Execution file script')
  .parse(process.argv);

if (!program.args.length) {
  program.help();
} else {
  const keywords = program.args;
  console.log(keywords)
}
