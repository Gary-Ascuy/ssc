#! /usr/bin/env node
const program = require('commander');
const Commands = require('./commands');
const packageJson = require('../package.json');

program.version(packageJson.version)
  .description(packageJson.description)
  .usage('[options] <command> [parameters ...]')
  .option('-f, --format <format>', 'Output format', /^(json|yaml|text)$/i, 'yaml')
  .parse(process.argv);

if (!program.args.length) {
  program.help();
} else {
  const [command] = program.args;
  const commands = new Commands(packageJson);
  (commands[command] || commands['default'])(program);
}
