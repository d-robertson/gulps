var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./components/header.jsx');

var App = React.createClass({
  render: function() {
    return <Header name="Josh" />
  }
});

ReactDOM.render(<App />, document.body);