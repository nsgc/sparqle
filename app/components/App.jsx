const React = require('react');
import { Router, Route, Link, IndexRoute } from 'react-router'

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import {AppBar, IconButton} from 'material-ui'

const ActionList = require('material-ui/lib/svg-icons/action/list'),
      ActionNoteAdd = require('material-ui/lib/svg-icons/action/note-add');

var QueryForm = require('./QueryForm.jsx');
var EditQueryForm = require('./EditQueryForm.jsx');
var QueryList = require('./QueryList.jsx');

class Layout extends React.Component {
  render() {
    return (
      <div>
        <AppBar title="SPARQLE"
                iconElementLeft= { <IconButton containerElement={ <Link to="/queries" /> } linkButton={true} ><ActionList /></IconButton> }
                iconElementRight={ <IconButton containerElement={ <Link to="/" /> } linkButton={true} ><ActionNoteAdd /></IconButton> } />
        {this.props.children}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Layout}>
          <IndexRoute component={QueryForm} />
          <Route path="queries" component={QueryList} />
          <Route path="/query/:queryId" component={EditQueryForm} />
        </Route>
      </Router>
    )
  }
}

module.exports = App;
