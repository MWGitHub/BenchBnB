var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Search = require('./components/search');

var App = React.createClass({
	render: function () {
		return (
			<div>
				<nav className="nav group">
					<div className="logo"><h2><a href="#">BenchBnB</a></h2></div>
				</nav>
				<div className="main">
					<Search />
				</div>
			</div>
		);
	}
});

$(function () {
	ReactDOM.render(<App />, $('#content')[0]);
});
