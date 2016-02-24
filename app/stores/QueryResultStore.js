import EventEmitter from 'events'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var results = {heads:[], bindings: []};

var QueryResultStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
      this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (fn) {
      this.on(CHANGE_EVENT, fn);
  },

  removeChangeListener: function (fn) {
      this.removeListener(CHANGE_EVENT, fn);
  },

  getAll: function() {
    return results;
  }
});

// Register callback to handle all updates
QueryResultStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.EXECUTE_QUERY:
      var response = action.response;
      results = {heads: response.head.vars, bindings: response.results.bindings}

      QueryResultStore.emitChange();
      break;
    default:
  }
});

module.exports = QueryResultStore;
