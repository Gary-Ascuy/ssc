const sleep = require('sleep');
const {SSC} = require('../'); // require('serial-servo-control')

const ssc = new SSC();
ssc.on('open', () => {
  console.log('Opened !!!');
  console.log(JSON.stringify(ssc.options(), null, 2));
  ssc.close(() => console.log('Closed !!!'));
});
