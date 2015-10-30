const React = require('react');

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import {TextField, RaisedButton} from 'material-ui'

class EditQueryForm extends React.Component {
  componentWillMount() {
    this.setState({
      queryId: this.props.params.queryId,
      querySet: JSON.parse(localStorage.getItem(this.props.params.queryId))
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    let endpoint = this.refs.endpoint.getValue(),
        query = this.refs.query.getValue(),
        summary = this.refs.summary.getValue();
    localStorage.setItem(e.target.id, JSON.stringify({endpoint: endpoint, query: query, summary: summary}));
  }
  render() {
    let hintQuery = "select distinct * where { <http://ja.dbpedia.org/resource/東京都> ?p ?o . } ",
        {endpoint, summary, query} = this.state.querySet,
        id = this.state.queryId;
    return (
      <form className="queryForm" onSubmit={this.handleSubmit.bind(this)} id={id} >
        <TextField  ref='endpoint' floatingLabelText="Endpoint url" hintText="http://ja.dbpedia.org/sparql"  fullWidth={true} defaultValue={endpoint} />
        <TextField  ref='summary' floatingLabelText="Summary" hintText="東京都に関する情報を取得するクエリ" fullWidth={true} defaultValue={summary} />
        <TextField  ref='query' floatingLabelText="Query" hintText={hintQuery} multiLine={true} fullWidth={true} rows={3} defaultValue={query} />
        <RaisedButton label="Run" type="submit" />
      </form>
    );
  }
}

module.exports = EditQueryForm;
