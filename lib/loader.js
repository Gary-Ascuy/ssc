const path = require('path');
const YAML = require('yamljs');

//
// Loaders
//
const loaders = {
  '.yaml': (path) => YAML.load(path),
  '.yml': (path) => YAML.load(path),
  '.json': (path) => require(path),
  default: (path) => require(path)
};

const self = module.exports = {
  /**
   * Loads a file (YAML|JSON) from path in sync way.
   * @param {string} file - file path.
   * @returns {obejct} an javascript object.
   */
  loadSync(file) {
    const ext = path.extname(file).toLowerCase();
    return (loaders[ext] || loaders.default)(file);
  },

  /**
   * Loads a file (YAML|JSON) from path in async way.
   * @param {string} file - file path.
   * @param {function} callback - callback to send result object.
   */
  load(file, callback) {
    try {
      callback(null, self.loadSync(file));
    } catch (error) {
      callback(error);
    }
  }
};
