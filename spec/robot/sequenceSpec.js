const path = require('path');
const file = (name) => path.resolve(path.join(__dirname, name));

describe('Sequence', function() {
  const {Sequence, Loader: {loadSync}} = require('../..');
  let sequence;

  beforeEach(() => {
    const options = loadSync(file('../assets/sequence/sequence.js'));
    sequence = new Sequence(options);
  });

  //
  // Basic functionality
  //
  it('should be finish before 500 mSeconds', function(done) {
    sequence.on('complete', (results) => {
      expect(results.length).toEqual(3);
      done();
    });
    sequence.play();
  });

  it('should be emit three times the "keyframe" event', function(done) {
    const counter = {event(){}};
    spyOn(counter, 'event');

    sequence.on('keyframe', counter.event);
    sequence.on('complete', (results) => {
      expect(counter.event.calls.count()).toEqual(3);
      done();
    });

    expect(counter.event.calls.count()).toEqual(0);
    sequence.play();
  });

  //
  // Repeat events
  //
  it('should be finish before 1000 mSeconds', function(done) {
    sequence.on('complete', (results) => {
      expect(results.length).toEqual(6);
      done();
    });
    sequence.play({repeat: 2});
  });

  it('should be emit six times the "keyframe" event', function(done) {
    const counter = {event(){}};
    spyOn(counter, 'event');

    sequence.on('keyframe', counter.event);
    sequence.on('complete', (results) => {
      expect(counter.event.calls.count()).toEqual(6);
      done();
    });

    expect(counter.event.calls.count()).toEqual(0);
    sequence.play({repeat: 2});
  });

  it('should be emit five times the "start-keyframe" event with pick sequence', function(done) {
    const counter = {event(){}};
    spyOn(counter, 'event');

    sequence.on('start-keyframe', counter.event);
    sequence.on('complete', (results) => {
      expect(counter.event.calls.count()).toEqual(5);
      done();
    });

    expect(counter.event.calls.count()).toEqual(0);
    sequence.play({name: 'pick', repeat: 5});
  });

  it('should be emit five times the "start-keyframe" event with default sequence', function(done) {
    const counter = {event(){}};
    spyOn(counter, 'event');

    sequence.on('start-keyframe', counter.event);
    sequence.on('complete', (results) => {
      expect(counter.event.calls.count()).toEqual(2);
      done();
    });

    expect(counter.event.calls.count()).toEqual(0);
    sequence.play({repeat: 2});
  });

  //
  // Events
  //
  it('should be emit all event, with "keyframes" sequence', function(done) {
    const counter = {play(){}, stop(){}, complete(){}, error(){}, keyframe(){}, startKeyframe(){}};
    spyOn(counter, 'play');
    spyOn(counter, 'stop');
    spyOn(counter, 'complete');
    spyOn(counter, 'error');
    spyOn(counter, 'keyframe');
    spyOn(counter, 'startKeyframe');

    sequence.on('play', counter.play);
    sequence.on('stop', counter.stop);
    sequence.on('complete', counter.complete);
    sequence.on('error', counter.error);
    sequence.on('keyframe', counter.keyframe);
    sequence.on('start-keyframe', counter.startKeyframe);

    sequence.on('complete', () => {
      expect(counter.play.calls.count()).toEqual(1);
      expect(counter.stop.calls.count()).toEqual(0);
      expect(counter.complete.calls.count()).toEqual(1);
      expect(counter.error.calls.count()).toEqual(0);
      expect(counter.keyframe.calls.count()).toEqual(6);
      expect(counter.startKeyframe.calls.count()).toEqual(2);
      done();
    });
    sequence.play({repeat: 2});
  });

  it('should be emit all event, with "pick" sequence', function(done) {
    const counter = {play(){}, stop(){}, complete(){}, error(){}, keyframe(){}, startKeyframe(){}};
    spyOn(counter, 'play');
    spyOn(counter, 'stop');
    spyOn(counter, 'complete');
    spyOn(counter, 'error');
    spyOn(counter, 'keyframe');
    spyOn(counter, 'startKeyframe');

    sequence.on('play', counter.play);
    sequence.on('stop', counter.stop);
    sequence.on('complete', counter.complete);
    sequence.on('error', counter.error);
    sequence.on('keyframe', counter.keyframe);
    sequence.on('start-keyframe', counter.startKeyframe);

    sequence.on('complete', () => {
      expect(counter.play.calls.count()).toEqual(1);
      expect(counter.stop.calls.count()).toEqual(0);
      expect(counter.complete.calls.count()).toEqual(1);
      expect(counter.error.calls.count()).toEqual(0);
      expect(counter.keyframe.calls.count()).toEqual(3);
      expect(counter.startKeyframe.calls.count()).toEqual(3);
      done();
    });
    sequence.play({name: 'pick', repeat: 3});
  });

  it('should be emit stop event', function(done) {
    const counter = {play(){}, stop(){}, complete(){}, error(){}, keyframe(){}, startKeyframe(){}};
    spyOn(counter, 'play');
    spyOn(counter, 'stop');
    spyOn(counter, 'complete');
    spyOn(counter, 'error');
    spyOn(counter, 'keyframe');
    spyOn(counter, 'startKeyframe');

    sequence.on('play', counter.play);
    sequence.on('stop', counter.stop);
    sequence.on('complete', counter.complete);
    sequence.on('error', counter.error);
    sequence.on('keyframe', counter.keyframe);
    sequence.on('start-keyframe', counter.startKeyframe);

    sequence.on('stop', () => {
      expect(counter.stop.calls.count()).toEqual(1);
      done();
    });

    sequence.play({name: 'pick', repeat: 3});
    sequence.stop();
  });
});
