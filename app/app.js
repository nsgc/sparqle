const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/App.jsx');

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('app_root')
);
