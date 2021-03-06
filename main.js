var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  //mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow = new BrowserWindow({width: 1800, height: 1600});

  mainWindow.loadUrl('file://' + __dirname + '/app/app.html');
  mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
