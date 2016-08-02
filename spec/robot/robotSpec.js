describe('Robot', function() {
  const {Robot} = require('../..');
  let robot;

  beforeEach(() => {
    const something = [{
      time: 3000,
      actions: {"0": 2500}
    }, {
      time: 1000,
      actions: {"0": 2500}
    }, {
      time: 1500,
      actions: {"0": 1500}
    }];

    const commands = {something};
    robot = new Robot({commands});
  });

  it('should have command "something"', function() {
    expect(robot.has('something')).toBe(true);
  });

  it('shouldn\'t have command "gary"', function() {
    expect(robot.has('gary')).toBe(false);
  });
});
