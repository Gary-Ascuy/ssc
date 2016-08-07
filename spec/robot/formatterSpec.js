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

    it('should be able to format object using decimals', function() {
      const message = {pin: 10.3, pwm: 500.5};
      expect(formatObject(message)).toEqual('#10P500');
    });

    it('should be able to format object with duration', function() {
      const message = {pin: 10, pwm: 500, duration: 1000};
      expect(formatObject(message)).toEqual('#10P500T1000');
    });

    it('should be able to format object with duration using decimals', function() {
      const message = {pin: 10.3, pwm: 500.5, duration: 1000.7};
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

    it('should be able to format object using decimals', function() {
      expect(format(10.3, 500.5)).toEqual('#10P500');
    });

    it('should be able to format object with duration', function() {
      expect(format(10, 500, 1000)).toEqual('#10P500T1000');
    });

    it('should be able to format object with duration using decimals', function() {
      expect(format(10.3, 500.5, 1000.7)).toEqual('#10P500T1000');
    });
  });
});