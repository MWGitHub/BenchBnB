var React = require('react');
var BenchStore = require('../stores/bench');

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

	render: function () {
		var benches = this.state.benches.map(function (bench) {
			return <div key={bench.id}>{bench.description}</div>;
		});
		return (
			<div>
				{benches}
			</div>
		);
	}
});

module.exports = Index;
