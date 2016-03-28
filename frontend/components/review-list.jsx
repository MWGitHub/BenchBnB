var React = require('react');
var BenchStore = require('../stores/bench');

var ReviewList = React.createClass({
	getInitialState: function () {
		return this._getReviewsState(this.props.params.id);
	},

	_getReviewsState: function (id) {
		var bench = BenchStore.find(parseInt(id));
		var reviews = [];
		if (bench) {
			reviews = bench.reviews;
		}
		return {
			reviews: reviews
		};
	},

	componentDidMount: function () {
		this.benchToken = BenchStore.addListener(this._onBenchChange);
	},

	componentWillUnmount: function () {
		this.benchToken.remove();
	},

	_onBenchChange: function () {
		this.setState(this._getReviewsState(this.props.params.id));
	},

	componentWillReceiveProps: function (newProps) {
		this.setState(this._getReviewsState(newProps.params.id));
	},

	render: function () {
		var reviews = this.state.reviews.map(function (review) {
			return (
				<div key={review.id}>
					<p>{review.score}</p>
					<p>{review.body}</p>
				</div>
			);
		});

		return (
			<div>
				{reviews}
			</div>
		);
	}
});

module.exports = ReviewList;
