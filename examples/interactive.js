const {SSC} = require('../'); // require('serial-servo-control')
const readline = require('readline');
const {getOptions} = require('./lib');

const buildMethod = (line) => {
  const args = line.split(' ');
  const name = line[0] == '$' ? args[0].substring(1) : null;
  return {name, args: args.slice(1)};
};

//
// Interactive command line interface, press ctrl+c to exit.
//
const options = getOptions();
const ssc = new SSC(options);

const rl = readline.createInterface({input: process.stdin, output: process.stdout});
module.exports = {
  message: [
    'A Serial Servo Terminal Interface. Press ctrl+c to exit.',
    'e.g. Moves servo 0 to 500 (RPM) in 5000 (miliseconds)',
    '    $move 0 500 5000',
    '    #0P500T5000'
  ].join('\n')
};

//
// Read & Process line by line.
//
rl.on('line', (line) => {
  if (line.length) {
    const method = buildMethod(line);
    if (ssc[method.name] instanceof Function) {
      console.log(method);
      ssc[method.name](...method.args);
    } else ssc.write(line);
  }
});

//
// Events
//
ssc.on('data', (data) => console.log('Data:', data.toString()));
ssc.on('error', (error) => {
  console.error('Error:', error);
  process.exit(1);
});
