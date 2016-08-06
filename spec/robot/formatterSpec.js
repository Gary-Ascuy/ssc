describe('Formatter Module', function() {
  const {Formatter: {format, formatObject}} = require('../..');

  //
  // formatObject
  //
  describe('formatObject Method', function() {
    it('should be able to format object', function() {
      const message = {pin: 10, pwm: 500};
      expect(formatObject(message)).toEqual('#10P500');
    });

    it('should be able to format object with duration', function() {
      const message = {pin: 10, pwm: 500, duration: 1000};
      expect(formatObject(message)).toEqual('#10P500T1000');
    });
  });

  //
  // format
  //
  describe('format Method', function() {
    it('should be able to format object', function() {
      expect(format(10, 500)).toEqual('#10P500');
    });

    it('should be able to format object with duration', function() {
      expect(format(10, 500, 1000)).toEqual('#10P500T1000');
    });
  });
});
