var React = require('react');
var ReactDOM = require('react-dom');
var uuid = require('node-uuid');

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var mui = require('material-ui'),
   {AppBar, FlatButton, TextField, RaisedButton} = mui,
   NavigationClose = require('material-ui/lib/svg-icons/navigation/close');

var QueryForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    var endpoint = this.refs.endpoint.getValue(),
        query = this.refs.query.getValue();

    localStorage.setItem(e.target.id, JSON.stringify({endpoint: endpoint, query: query}));
  },
  render: function() {
    var hintQuery = "select distinct * where { <http://ja.dbpedia.org/resource/東京都> ?p ?o . } ",
        id = uuid.v4();
    return (
      <form className="queryForm" onSubmit={this.handleSubmit} id={id} >
        <TextField  ref='endpoint' floatingLabelText="Endpoint url" hintText="http://ja.dbpedia.org/sparql"  fullWidth={true} />
        <TextField  ref='query' floatingLabelText="Query" hintText={hintQuery} multiLine={true} fullWidth={true} rows={3} />
        <RaisedButton label="Run" type="submit" />
      </form>
    );
  }
});

var AppRoot = React.createClass({
  render: function() {
    return (
      <div className="appRoot">
        <AppBar title="SPARQLE" iconElementRight={<FlatButton label="New" />} />
        <QueryForm />
      </div>
    );
  }
});

ReactDOM.render(
  <AppRoot />,
  document.getElementById('app_root')
);
