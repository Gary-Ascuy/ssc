const path = require('path');
const file = (name) => path.resolve(path.join(__dirname, name));

describe('Sequence', function() {
  const {Sequence, Loader: {loadSync}} = require('../..');
  let sequence;

  beforeEach(() => {
    const options = loadSync(file('../assets/sequence/sequence.js'));
    sequence = new Sequence(options);
  });

  it('should be finish before 500 mSeconds', function(done) {
    sequence.on('complete', (results) => {
      expect(results.length).toEqual(3);
      done();
    });
    sequence.on('error', (error) => {
      expect(error).toBeNull();
      done();
    });

    sequence.play();
  });
});
