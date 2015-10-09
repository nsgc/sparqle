var path = require("path");

var projectRoot = path.join(__dirname);
var appRoot = path.join(projectRoot, 'app');

module.exports = {
  entry: {
    app: path.join(appRoot, 'app.js')
  },
  output: {
    path: projectRoot + '/dist/',
    filename: 'bundle.js'
  }
};
