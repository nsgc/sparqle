const React = require('react');

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import {TextField, RaisedButton} from 'material-ui'

var QueryResultStore = require('../stores/QueryResultStore');

var ActionCreators = require('../actions/ActionCreators');



class QueryResultsRows extends React.Component {
  render() {
    var ress = this.props.heads.map ( (head, index) => {
      return (
        <span key={index}>
          {this.props.binding[head]}
        </span>
      )
    });

    return (
      <div>
        {ress}
      </div>
    );
  }
}

class QueryResultsTable extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {results: QueryResultStore.getAll()};
  }
  componentDidMount() {
    QueryResultStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    QueryResultStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState({ results: QueryResultStore.getAll() });
  }
  render() {
    var ress = this.state.results.bindings.map( (binding, index) => {
      return (
        <li className="list-group-item" key={index}>
          {<QueryResultsRows heads={this.state.results.heads} binding={binding} />}
        </li>
      );
    });

    return (
      <div className="tracks">
        <ul className="list-group">
          {ress}
        </ul>
      </div>
    );
  }
};

module.exports = QueryResultsTable;
