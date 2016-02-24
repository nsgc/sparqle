const React = require('react');
const NodeUUID = require('node-uuid');

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import {TextField, RaisedButton} from 'material-ui'

var ActionCreators = require('../actions/ActionCreators');

class QueryForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    let endpoint = this.refs.endpoint.getValue(),
        query = this.refs.query.getValue(),
        summary = this.refs.summary.getValue();

    ActionCreators.executeQuery(endpoint, query);
    localStorage.setItem(e.target.id, JSON.stringify({endpoint: endpoint, query: query, summary: summary}));
  }
  render() {
    let hintQuery = "select distinct * where { <http://ja.dbpedia.org/resource/東京都> ?p ?o . } ",
        id = NodeUUID.v4();
    return (
      <form className="queryForm" onSubmit={this.handleSubmit.bind(this)} id={id} >
        <TextField  ref='endpoint' floatingLabelText="Endpoint url" hintText="http://ja.dbpedia.org/sparql"  fullWidth={true} />
        <TextField  ref='summary' floatingLabelText="Summary" hintText="東京都に関する情報を取得するクエリ" fullWidth={true} />
        <TextField  ref='query' floatingLabelText="Query" hintText={hintQuery} multiLine={true} fullWidth={true} rows={3} />
        <RaisedButton label="Run" type="submit" />
      </form>
    );
  }
}

module.exports = QueryForm;
