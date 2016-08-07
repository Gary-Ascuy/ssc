describe('Formatter Module', function() {
  const {Transformer: {create}} = require('../..');

  //
  // create
  //
  describe('create transform Method', function() {
    it('should be able to create transform', function() {
      const transform = create(-90, 90, 500, 2500, false);
      expect(transform({pin: 0, value: -90}).pwm).toEqual(500);
      expect(transform({pin: 0, value: 90}).pwm).toEqual(2500);
    });

    it('should be able to create transform with decimals', function() {
      const transform = create(-90, 90, 500, 2500, false);
      expect(Math.floor(transform({pin: 0, value: 1}).pwm)).toEqual(1511);
    });

    it('should be able to create using stryngify', function() {
      const transform = create(-90, 90, 500, 2500, true);
      expect(transform({pin: 0, value: -90})).toEqual('#0P500');
      expect(transform({pin: 0, value: 90})).toEqual('#0P2500');
    });

    it('should be able to create using stryngify using decimals', function() {
      const transform = create(-90, 90, 500, 2500, true);
      expect(transform({pin: 0, value: 2})).toEqual('#0P1522');
      expect(transform({pin: 0, value: -3})).toEqual('#0P1466');
      expect(transform({pin: 0, value: 80})).toEqual('#0P2388');
      expect(transform({pin: 0, value: -79})).toEqual('#0P622');
    });
  });
});
