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
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
       { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' }
     ]
   }
};
