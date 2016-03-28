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

	_onClick: function (id) {
		return function (e) {
			this.props.onClick(id);
		};
	},

	render: function () {
		var that = this;
		var benches = this.state.benches.map(function (bench) {
			return (
				<div key={'bench-' + bench.id}
					onMouseEnter={that._onMouseEnter(bench.id).bind(that)}
					onMouseLeave={that._onMouseLeave(bench.id).bind(that)}
					onClick={that._onClick(bench.id).bind(that)}
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
