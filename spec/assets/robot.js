//
// Sequences
//
const moveArm = [{
  "time": 3000,
  "actions": {"0": 2500}
}, {
  "time": 1000,
  "actions": {"0": 2500}
}, {
  "time": 1500,
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

const something = [{
  "time": 2000,
  "actions": {"0": 2500}
}, {
  "time": 1500,
  "actions": {"0": 2500}
}, {
  "time": 2000,
  "actions": {"0": 1500}
}];

//
// Commands
//
const commands = {
  "move-arm": moveArm,
  "move-leg": moveLeg,
  something
};

//
// Export
//
module.exports = {commands};
