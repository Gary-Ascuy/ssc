const {SSC} = require('../'); // require('serial-servo-control')
const {getOptions} = require('./.lib');

//
// Connection test
//
const options = getOptions();
const ssc = new SSC(options);

ssc.on('open', () => {
  console.log('Opened !!!');
  console.log(JSON.stringify(ssc.options(), null, 2));
  ssc.close(() => console.log('Closed !!!'));
});
