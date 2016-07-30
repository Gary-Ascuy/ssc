describe('Robot', function() {
  const {Robot} = require('../..');
  let robot;

  beforeEach(() => {
    const commands = [{name: 'something'}];
    robot = new Robot({commands});
  });

  it('should be able to do something', function() {
    expect(robot._options).not.toBe(null);
  });
});
