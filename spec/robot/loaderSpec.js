const path = require('path');
const file = (name) => path.resolve(path.join(__dirname, name));

describe('Loader Async Method', function() {
  const {Loader: {load}} = require('../..');

  it('should be able to load config from JSON file', function(done) {
    load(file('../assets/robot.json'), (error, robot) => {
      expect(error).toBe(null);
      expect(robot).toBeDefined();
      expect(robot.commands['move-arm']).toBeDefined();
      expect(robot.commands['move-leg']).toBeDefined();
      expect(robot.commands['something']).toBeDefined();
      done();
    });
  });

  it('should be able to load config from JS file', function(done) {
    load(file('../assets/robot.js'), (error, robot) => {
      expect(error).toBe(null);
      expect(robot).toBeDefined();
      expect(robot.commands['move-arm']).toBeDefined();
      expect(robot.commands['move-leg']).toBeDefined();
      expect(robot.commands['something']).toBeDefined();
      done();
    });
  });

  it('should be able to load config from YAML (.yaml) file', function(done) {
    load(file('../assets/robot.yaml'), (error, robot) => {
      expect(error).toBe(null);
      expect(robot).toBeDefined();
      expect(robot.commands['move-arm']).toBeDefined();
      expect(robot.commands['move-leg']).toBeDefined();
      expect(robot.commands['something']).toBeDefined();
      done();
    });
  });

  it('should be able to load config from YAML (.yml) file', function(done) {
    load(file('../assets/robot.yml'), (error, robot) => {
      expect(error).toBe(null);
      expect(robot).toBeDefined();
      expect(robot.commands['move-arm']).toBeDefined();
      expect(robot.commands['move-leg']).toBeDefined();
      expect(robot.commands['something']).toBeDefined();
      done();
    });
  });
});

describe('Loader Sync Method', function() {
  const {Loader: {loadSync}} = require('../..');

  it('should be able to load config from JSON file', function() {
    const robot = loadSync(file('../assets/robot.json'));

    expect(robot).toBeDefined();
    expect(robot.commands['move-arm']).toBeDefined();
    expect(robot.commands['move-leg']).toBeDefined();
    expect(robot.commands['something']).toBeDefined();
  });

  it('should be able to load config from JS file', function() {
    const robot = loadSync(file('../assets/robot.js'));

    expect(robot).toBeDefined();
    expect(robot.commands['move-arm']).toBeDefined();
    expect(robot.commands['move-leg']).toBeDefined();
    expect(robot.commands['something']).toBeDefined();
  });

  it('should be able to load config from YAML (.yaml) file', function() {
    const robot = loadSync(file('../assets/robot.yaml'));

    expect(robot).toBeDefined();
    expect(robot.commands['move-arm']).toBeDefined();
    expect(robot.commands['move-leg']).toBeDefined();
    expect(robot.commands['something']).toBeDefined();
  });

  it('should be able to load config from YAML (.yml) file', function() {
    const robot = loadSync(file('../assets/robot.yml'));

    expect(robot).toBeDefined();
    expect(robot.commands['move-arm']).toBeDefined();
    expect(robot.commands['move-leg']).toBeDefined();
    expect(robot.commands['something']).toBeDefined();
  });
});


