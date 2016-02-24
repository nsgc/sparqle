var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

var AppConstants = require('../constants/AppConstants');

var PayloadSources = AppConstants.PayloadSources;

AppDispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: PayloadSources.VIEW_ACTION,
    action: action
  });
}

AppDispatcher.handleServerAction = function(action) {
  this.dispatch({
    source: PayloadSources.SERVER_ACTION,
    action: action
  });
}

module.exports = AppDispatcher;
