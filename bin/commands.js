const fs = require('fs');
const path = require('path');
const SerialPort = require('serialport');
const YAML = require('yamljs');

const copyright = (extra = '\n') => {
  console.log('Serial Servo Controller // Command Line Interface');
  console.log(`Gary Ascuy <gary.ascuy@gmail.com>${extra}`);
};

const devices = (cb) => {
  SerialPort.list((error, ports) => {
    return error ? console.error('Error listing ports', error) : cb(ports);
  });
};

const formats = {
  text(ports) {
    const data = ports.map(port => `${port.comName}\t${port.pnpId || ''}\t${port.manufacturer || ''}`);
    console.log(data.join('\n'));
  },
  json(ports) {
    console.log(JSON.stringify(ports, null, 2));
  },
  yaml(ports) {
    console.log(YAML.stringify(ports, 2));
  }
};

class Commands {
  constructor(packageJson) {
    this.packageJson = packageJson;
  }

  help(program) {
    copyright('');
    program.help();
  }

  default(program) {
    console.log('  Unknown sub-command');
    program.help();
  }

  run(program) {
    const [command, file] = program.args;
    const fullpath = `../examples/${file}`;
    const module = require(fullpath);
    console.log(module.message || `[${command}] From ${fullpath}`);
  }

  list(program) {
    copyright();
    const [command, query] = program.args;
    const fullpath = path.resolve(__dirname, '../examples/');
    console.log(`Examples available to run: $ ssc run <exampleFileName>\n`);

    const files = fs.readdirSync(fullpath).filter(file => !/^\./.test(file) && /\.js$/.test(file));
    const examples = files.map(file => `    ${file.replace(/\.js$/, '')}`);
    console.log(examples.join('\n') + '\n');
  }

  devices(program) {
    copyright();
    devices(formats[program.format] || formats['text']);
  }
};

module.exports = Commands;
