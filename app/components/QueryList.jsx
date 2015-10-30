const React = require('react');
import {Link} from 'react-router'

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import {IconButton, Card, CardHeader, CardText} from 'material-ui'
const ActionOpenInNew = require('material-ui/lib/svg-icons/action/open-in-new');


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

class QueryList extends React.Component {
  items() {
    let items = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i).toString(),
          value = JSON.parse(localStorage.getItem(key));

      items.push( <QueryListItem querySet={value} queryId={key} key={i} /> );
    };
    return items;
  }
  render() {
    let query_items = (localStorage.length === 0) ? "Empty!" : this.items();
    return (
       <div>{query_items}</div>
     );
  }
}

module.exports = QueryList;
