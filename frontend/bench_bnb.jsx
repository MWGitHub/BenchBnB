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
var BenchDetail = require('./components/bench-detail');
var ReviewForm = require('./components/review-form');
var ReviewList = require('./components/review-list');

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
			<Route path='benches/:id' component={BenchDetail}>
				<Route path='reviews/new' component={ReviewForm} />
				<Route path='reviews' component={ReviewList} />
			</Route>
		</Route>
	</Router>
);

$(function () {
  cloudinary.setCloudName('dbe1fg2ao');

	ReactDOM.render(routes, $('#content')[0]);
});
