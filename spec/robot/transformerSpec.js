describe('Formatter Module', function() {
  const {Transformer: {create, createFrom}} = require('../..');

  //
  // create
  //
  describe('create Method', function() {
    it('should be able to create transform', function() {
      const transform = create({start: -90, end: 90, startPWM: 500, endPWM: 2500}, false);
      expect(transform({pin: 0, value: -90}).pwm).toEqual(500);
      expect(transform({pin: 0, value: 90}).pwm).toEqual(2500);
    });

    it('should be able to create transform with decimals', function() {
      const transform = create({start: -90, end: 90, startPWM: 500, endPWM: 2500}, false);
      expect(Math.floor(transform({pin: 0, value: 1}).pwm)).toEqual(1511);
    });

    it('should be able to create using stryngify', function() {
      const transform = create({start: -90, end: 90, startPWM: 500, endPWM: 2500}, true);
      expect(transform({pin: 0, value: -90})).toEqual('#0P500');
      expect(transform({pin: 0, value: 90})).toEqual('#0P2500');
    });

    it('should be able to create using stryngify using decimals', function() {
      const transform = create({start: -90, end: 90, startPWM: 500, endPWM: 2500}, true);
      expect(transform({pin: 0, value: 2})).toEqual('#0P1522');
      expect(transform({pin: 0, value: -3})).toEqual('#0P1466');
      expect(transform({pin: 0, value: 80})).toEqual('#0P2388');
      expect(transform({pin: 0, value: -79})).toEqual('#0P622');
    });
  });

  //
  // createFrom
  //
  describe('createFrom Method', function() {
    //
    // Degree transform
    //
    it('should be able to create degree transform', function() {
      const transform = createFrom('degree', {positive: true}, true);

      expect(transform({pin: 0, value: 0})).toEqual('#0P500');
      expect(transform({pin: 0, value: 360})).toEqual('#0P2500');
      expect(transform({pin: 0, value: 80})).toEqual('#0P944');
      expect(transform({pin: 0, value: 120})).toEqual('#0P1166');
      expect(transform({pin: 0, value: 271})).toEqual('#0P2005');
    });

    it('should be able to create degree transform using negative', function() {
      const transform = createFrom('degree', {positive: false}, true);

      expect(transform({pin: 0, value: -180})).toEqual('#0P500');
      expect(transform({pin: 0, value: 180})).toEqual('#0P2500');
      expect(transform({pin: 0, value: -80})).toEqual('#0P1055');
      expect(transform({pin: 0, value: 90})).toEqual('#0P2000');
      expect(transform({pin: 0, value: 135})).toEqual('#0P2250');
    });

    //
    // Gradian transform
    //
    it('should be able to create gradian transform', function() {
      const transform = createFrom('gradian', {positive: true}, true);

      expect(transform({pin: 0, value: 0})).toEqual('#0P500');
      expect(transform({pin: 0, value: 400})).toEqual('#0P2500');
      expect(transform({pin: 0, value: 80})).toEqual('#0P900');
      expect(transform({pin: 0, value: 120})).toEqual('#0P1100');
      expect(transform({pin: 0, value: 271})).toEqual('#0P1855');
    });

    it('should be able to create gradian transform using negative', function() {
      const transform = createFrom('gradian', {positive: false}, true);

      expect(transform({pin: 0, value: -200})).toEqual('#0P500');
      expect(transform({pin: 0, value: 200})).toEqual('#0P2500');
      expect(transform({pin: 0, value: -100})).toEqual('#0P1000');
      expect(transform({pin: 0, value: 120})).toEqual('#0P2100');
      expect(transform({pin: 0, value: 130})).toEqual('#0P2150');
    });

    //
    // Radian transform
    //
    it('should be able to create radian transform', function() {
      const transform = createFrom('radian', {positive: true}, true);

      expect(transform({pin: 0, value: 0})).toEqual('#0P500');
      expect(transform({pin: 0, value: 2 * Math.PI})).toEqual('#0P2500');
      expect(transform({pin: 0, value: Math.PI / 2})).toEqual('#0P1000');
      expect(transform({pin: 0, value: Math.PI})).toEqual('#0P1500');
      expect(transform({pin: 0, value: Math.PI + 0.5})).toEqual('#0P1659');
    });

    it('should be able to create radian transform using negative', function() {
      const transform = createFrom('radian', {positive: false}, true);

      expect(transform({pin: 0, value: -Math.PI})).toEqual('#0P500');
      expect(transform({pin: 0, value: Math.PI})).toEqual('#0P2500');
      expect(transform({pin: 0, value: Math.PI / 2})).toEqual('#0P2000');
      expect(transform({pin: 0, value: -Math.PI / 3})).toEqual('#0P1166');
      expect(transform({pin: 0, value: Math.PI / 4})).toEqual('#0P1750');
    });

    //
    // Using custom end value
    //
    it('should be able to create degree transform using "end" value', function() {
      const transform = createFrom('degree', {positive: true, end: 10}, true);

      expect(transform({pin: 0, value: 0})).toEqual('#0P500');
      expect(transform({pin: 0, value: 10})).toEqual('#0P2500');
      expect(transform({pin: 0, value: 3})).toEqual('#0P1100');
      expect(transform({pin: 0, value: 7})).toEqual('#0P1900');
      expect(transform({pin: 0, value: 9})).toEqual('#0P2300');
    });

    it('should be able to create degree transform using "end" value with negative', function() {
      const transform = createFrom('degree', {positive: false, end: 10}, true);

      expect(transform({pin: 0, value: -5})).toEqual('#0P500');
      expect(transform({pin: 0, value: 5})).toEqual('#0P2500');
      expect(transform({pin: 0, value: -3})).toEqual('#0P900');
      expect(transform({pin: 0, value: 3})).toEqual('#0P2100');
      expect(transform({pin: 0, value: 0})).toEqual('#0P1500');
    });

    it('should be able to create degree transform using "end" value with negative and not pair', function() {
      const transform = createFrom('degree', {positive: false, end: 11}, true);

      expect(transform({pin: 0, value: -5.5})).toEqual('#0P500');
      expect(transform({pin: 0, value: 5.5})).toEqual('#0P2500');
      expect(transform({pin: 0, value: -3})).toEqual('#0P954');
      expect(transform({pin: 0, value: 3})).toEqual('#0P2045');
      expect(transform({pin: 0, value: 0})).toEqual('#0P1500');
    });
  });
});
