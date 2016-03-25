var React = require('react');
var BenchStore = require('../stores/bench');
var UiActions = require('../actions/ui-actions');

var Index = React.createClass({
	getInitialState: function () {
		return {
			benches: BenchStore.all()
		};
	},

	componentDidMount: function () {
		this.benchToken = BenchStore.addListener(this._onBenchChange);
	},

	componentWillUnmount: function () {
		this.benchToken.remove();
	},

	_onBenchChange: function () {
		this.setState({
			benches: BenchStore.all()
		});
	},

	_onMouseEnter: function (id) {
		return function (e) {
			UiActions.setIndexFocus(id);
		};
	},

	_onMouseLeave: function (id) {
		return function (e) {
			UiActions.setIndexFocus(null);
		};
	},

	render: function () {
		var that = this;
		var benches = this.state.benches.map(function (bench) {
			return (
				<div key={bench.id}
					onMouseEnter={that._onMouseEnter(bench.id).bind(that)}
					onMouseLeave={that._onMouseLeave(bench.id).bind(that)}
				>
					{bench.description}
				</div>
			);
		});
		return (
			<div>
				{benches}
			</div>
		);
	}
});

module.exports = Index;
