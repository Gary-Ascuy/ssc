//
// Sequences
//
const moveArm = [{
  "time": 50,
  "actions": {"0": 2500}
}, {
  "time": 20,
  "actions": {"0": 2500}
}, {
  "time": 50,
  "actions": {"0": 1500}
}];

const moveLeg = [{
  "time": 1000,
  "actions": {"0": 2500}
}, {
  "time": 500,
  "actions": {"0": 2500}
}, {
  "time": 2000,
  "actions": {"0": 1500}
}];

const pick = [{
  "time": 10,
  "actions": {"0": 2500}
}];

//
// Export
//
module.exports = {keyframes: moveArm, moveLeg, pick};
