describe('Formatter Module', function() {
  const {SSC} = require('../..');

  //
  // Open/Close/Write events
  //
  describe('Open/Close events', function() {
    it('should be able to open and close actions', function(done) {
      const counter = {open(){}, close(){}, write(){}};
      spyOn(counter, 'open');
      spyOn(counter, 'write');
      spyOn(counter, 'close');

      const ssc = new SSC({events: counter});
      ssc.on('close', () => {
        expect(counter.open.calls.count()).toEqual(1);
        expect(counter.close.calls.count()).toEqual(1);
        expect(counter.write.calls.count()).toEqual(1);
        done();
      });

      ssc.write('message');
      ssc.close();
    });
  });

  //
  // Write method
  //
  describe('Write events', function() {
    it('should be able to write', function(done) {
      const counter = {open(){}, close(){}, write(){}};
      spyOn(counter, 'write');

      const ssc = new SSC({events: counter});
      ssc.on('close', () => {
        expect(counter.write.calls.count()).toEqual(1);
        expect(ssc.sp._message).toEqual('#0P100\r\n')
        done();
      });

      ssc.write('#0P100');
      ssc.close();
    });

    it('should be able to write without new line', function(done) {
      const counter = {open(){}, close(){}, write(){}};
      spyOn(counter, 'write');

      const ssc = new SSC({events: counter});
      ssc.on('close', () => {
        expect(counter.write.calls.count()).toEqual(1);
        expect(ssc.sp._message).toEqual('#0P100')
        done();
      });

      ssc.write('#0P100', false);
      ssc.close();
    });

    it('should be able to write with transformation', function(done) {
      const counter = {open(){}, close(){}, write(){}};
      spyOn(counter, 'write');

      const ssc = new SSC({
        transform(data) {return `#${data.pin}P${data.pwm}`;},
        events: counter
      });

      ssc.on('close', () => {
        expect(counter.write.calls.count()).toEqual(1);
        expect(ssc.sp._message).toEqual('#0P2500')
        done();
      });

      ssc.write({pin: 0, pwm: 2500}, false);
      ssc.close();
    });
  });
});
