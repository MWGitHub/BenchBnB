var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var Search = require('./components/search');
var browserHistory = ReactRouter.browserHistory;
var BenchForm = require('./components/bench-form');

var App = React.createClass({
	render: function () {
		return (
			<div>
				<nav className="nav group">
					<div className="logo"><h2><Link to="/">BenchBnB</Link></h2></div>
				</nav>
				<div className="main">
					{this.props.children}
				</div>
			</div>
		);
	}
});

var routes = (
	<Router history={browserHistory}>
		<Route path='/' component={App}>
			<IndexRoute component={Search} />
			<Route path='benches/new' component={BenchForm} />
		</Route>
	</Router>
);

$(function () {
	ReactDOM.render(routes, $('#content')[0]);
});
