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

module.exports = {
  /**
   * Loads a file (YAML|JSON) from path in sync way.
   * @param {string} path - file path.
   * @returns {obejct} an javascript object.
   */
  loadSync(path) {
    const ext = path.extname(path).toLowerCase();
    return (loaders[ext] || loaders[ext])(path);
  },

  /**
   * Loads a file (YAML|JSON) from path in async way.
   * @param {string} path - file path.
   * @param {function} callback - callback to send result object.
   */
  load(path, callback) {
    try {
      callback(null, loadSync(path));
    } catch (error) {
      callback(error);
    }
  }
};
