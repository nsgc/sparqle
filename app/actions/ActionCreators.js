var request = require('superagent');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var ActionsCreators = {
  executeQuery: function (endpoint, query) {
    request
      .get('http://ja.dbpedia.org/sparql?query=' + encodeURIComponent("select distinct * where { <http://ja.dbpedia.org/resource/東京都> ?p ?o . } limit 10") + '&format=' + encodeURIComponent("application/sparql-results+json"))
      .end(function(err, res){
        AppDispatcher.handleViewAction({
          type: ActionTypes.EXECUTE_QUERY,
          response: JSON.parse(res.text)
        });
      }.bind(this)
    );
  }
};

module.exports = ActionsCreators;
