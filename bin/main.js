#! /usr/bin/env node
const program = require('commander');
const Commands = require('./commands');
const packageJson = require('../package.json');

program.version(packageJson.version)
  .description(packageJson.description)
  .usage('[options] <command> [parameters ...]')
  .option('-f, --format <format>', 'Output format', /^(json|yaml|text)$/i, 'yaml')

  .option('-p, --port <port>', 'Path or Name of serial port', '/dev/cu.SLAB_USBtoUART')
  .option('--oo-baud-rate <baudRate>', 'Baud rate default: 115200', 115200)
  .option('--oo-data-bits <dataBits>', 'Data bits default: 8', 8)
  .option('--oo-parity <parity>', 'Parity default: none', 'none')
  .option('--oo-stop-bits <stopBits>', 'Stop bits default: 1', 1)

  .parse(process.argv);

if (!program.args.length) {
  program.help();
} else {
  const [command] = program.args;
  const commands = new Commands(packageJson);
  (commands[command] || commands['default'])(program);
}
