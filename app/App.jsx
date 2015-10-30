const React = require('react');
const ReactDOM = require('react-dom');
const NodeUUID = require('node-uuid');
import { Router, Route, Link, IndexRoute } from 'react-router'

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import {AppBar, FlatButton, TextField, RaisedButton, IconButton, Card, CardHeader, CardText} from 'material-ui'

const ActionList = require('material-ui/lib/svg-icons/action/list'),
      ActionNoteAdd = require('material-ui/lib/svg-icons/action/note-add'),
      ActionOpenInNew = require('material-ui/lib/svg-icons/action/open-in-new');

class QueryForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    let endpoint = this.refs.endpoint.getValue(),
        query = this.refs.query.getValue(),
        summary = this.refs.summary.getValue();
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

class QueryListItem extends React.Component {
  render() {
    let {endpoint, summary, query} = this.props.querySet,
         queryId = this.props.queryId;
    return (
      <Card initiallyExpanded={false}>
        <CardHeader title={endpoint} subtitle={summary} showExpandableButton={true} avatar={  <IconButton containerElement={ <Link to={`/query/${queryId}`} /> } linkButton={true}><ActionOpenInNew /></IconButton>  } />
        <CardText expandable={true}>{query}</CardText>
      </Card>
    );
  }
}

class Queries extends React.Component {
  items() {
    let items = [];
    for(let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i).toString(),
          value = JSON.parse(localStorage.getItem(key));

      items.push( <QueryListItem querySet={value} queryId={key} key={i} /> );
    };
    return items;
  }
  render() {
    let query_items = (localStorage.length === 0) ? "Empty!" : this.items();
    return (
      <div>
        {query_items}
      </div>
    );
  }
}

class AppRoot extends React.Component {
  render() {
    return (
      <div className="appRoot">
        <AppBar title="SPARQLE"
                iconElementLeft= { <IconButton containerElement={ <Link to="/queries" /> } linkButton={true} ><ActionList /></IconButton> }
                iconElementRight={ <IconButton containerElement={ <Link to="/" /> } linkButton={true} ><ActionNoteAdd /></IconButton> } />
        {this.props.children}
      </div>
    );
  }
}

var routes = (
  <Route path="/" component={AppRoot}>
    <IndexRoute component={QueryForm} />
    <Route path="queries" component={Queries} />
    <Route path="/query/:queryId" component={EditQueryForm} />
  </Route>
);

ReactDOM.render(
  <Router>{routes}</Router>,
  document.getElementById('app_root')
);
