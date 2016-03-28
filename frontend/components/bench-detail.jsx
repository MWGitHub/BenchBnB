var React = require('react');
var BenchStore = require('../stores/bench');
var ApiUtil = require('../util/api-util');
var Map = require('./map');
var Link = require('react-router').Link;

var BenchDetail = React.createClass({
	getInitialState: function () {
		return {
			bench: BenchStore.find(parseInt(this.props.params.id))
		};
	},

	componentDidMount: function () {
		this.benchToken = BenchStore.addListener(this._onBenchChange);

		ApiUtil.fetchBench(this.props.params.id);
	},

	componentWillUnmount: function () {
		this.benchToken.remove();
	},

	_onBenchChange: function () {
		this.setState({
			bench: BenchStore.find(parseInt(this.props.params.id))
		});
	},

	componentWillReceiveProps: function (newProps) {
		this.setState({
			bench: BenchStore.find(parseInt(newProps.params.id))
		});
	},

	render: function () {
		if (!this.state.bench) {
			return <div></div>;
		}

		var newReviewLink = '';
		if (!this.props.location.pathname.match('reviews/new/?$')) {
			newReviewLink = (
				<p>
					<Link to={'/benches/' + this.state.bench.id + '/reviews/new'}>
						Write Review
					</Link>
				</p>
			);
		}

		var reviewsLink = '';
		if (!this.props.location.pathname.match('reviews/?$')) {
			reviewsLink = (
				<p>
					<Link to={'/benches/' + this.state.bench.id + '/reviews'}>
						Read Reviews
					</Link>
				</p>
			);
		}

		return (
			<div>
				<div className="left">
					<p>Latitude: {this.state.bench.lat}</p>
					<p>Longitude: {this.state.bench.lng}</p>
					<p>Seating: {this.state.bench.seating}</p>
					<p>Description: {this.state.bench.description}</p>
					{newReviewLink}
					{reviewsLink}
					{this.props.children}
				</div>
				<div className="right">
					<Map
						benches={[this.state.bench]}
						mapOptions={{
							disableDefaultUI: true,
							disableDoubleClickZoom: true,
							draggable: false,
							keyboardShortcuts: false,
							scrollwheel: false
						}}
						markerOptions={{
							clickable: false,
							cursor: "default"
						}}
					/>
				</div>
			</div>
		);
	}
});

module.exports = BenchDetail;
