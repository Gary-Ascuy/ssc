//
// Actions
//

const moveArm = [{
  "time": 50,
  "actions": {"0": 2500}
}, {
  "time": 20,
  "actions": {"0": 2500}
}, {
  "time": 50,
  "actions": {"0": 1500}
}];

const moveLeg = [{
  "time": 10,
  "actions": {"0": 2500}
}];

describe('Robot', function() {
  const {Robot} = require('../..');
  let robot;

  beforeEach(() => {
    const commands = {moveArm, moveLeg};
    robot = new Robot({autoPlay: true, commands});
  });

  it('should have command "something"', function() {
    expect(robot.has('moveArm')).toBe(true);
  });

  it('shouldn\'t have command "gary"', function() {
    expect(robot.has('gary')).toBe(false);
  });

  //
  // Robot events
  //
  it('should run "moveArm" command without errors', function(done) {
    const events = {
      complete(actions) {
        expect(actions.length).toEqual(3);
        done();
      }
    };
    robot.do('moveArm', {events});
  });

  it('should run "moveLeg" command without errors', function(done) {
    const events = {
      complete(actions) {
        expect(actions.length).toEqual(1);
        done();
      }
    };
    robot.do('moveLeg', {events});
  });

  //
  // Robot events with repeat
  //
  it('should run "moveArm" command without errors twice', function(done) {
    const events = {
      complete(actions) {
        expect(actions.length).toEqual(6);
        done();
      }
    };
    robot.do('moveArm', {events, repeat: 2});
  });

  it('should run "moveLeg" command without errors twice', function(done) {
    const events = {
      complete(actions) {
        expect(actions.length).toEqual(2);
        done();
      }
    };
    robot.do('moveLeg', {events, repeat: 2});
  });

  //
  // Robot events without auto play
  //
  it('should run "moveLeg" command without autoPlay', function(done) {
    const commands = {moveArm, moveLeg};
    const robot = new Robot({autoPlay: false, commands});

    const sequence = robot.do('moveLeg');
    sequence.on('complete', actions => {
      expect(actions.length).toEqual(1);
      done();
    })
    sequence.play({name: 'moveLeg'});
  });

  it('should run "moveArm" command without autoPlay', function(done) {
    const commands = {moveArm, moveLeg};
    const robot = new Robot({autoPlay: false, commands});

    const sequence = robot.do('moveLeg');
    sequence.on('complete', actions => {
      expect(actions.length).toEqual(3);
      done();
    })
    sequence.play({name: 'moveArm'});
  });
});
