const path = require('path');
const {SSC, Sequence} = require('../'); // require('serial-servo-control')
const {getOptions, getInputFile} = require('./.lib');
const YAML = require('yamljs');

const load = (path) => {
  const loader = /\.yaml/.test(path) ? (path) => YAML.load(path) : require;
  return loader(path);
};

const filename = getInputFile();
const keyframes = (filename) ? load(path.resolve(getInputFile())) : require('./assets/key-frames.json');

//
// Run Sequence
//
const options = getOptions();
const ssc = new SSC(options);
const sequence = new Sequence(keyframes);

module.exports = {
  message: [
    'A Serial Servo Secuence. Press ctrl+c to exit.',
    `Reading ${filename ? path.resolve(filename) : './assets/key-frames.json'}`,
    ''
  ].join('\n')
};

//
// Events
//
sequence.on('start', () => console.log('start'));
sequence.on('keyframe', (frame, message) => console.log('  frame', message));
sequence.on('end', () => {
  console.log('end');
  ssc.close();
});

//
// play
//
setTimeout(() => sequence.play(ssc), 500);
