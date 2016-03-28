var React = require('react');
var BenchStore = require('../stores/bench');
var ApiUtil = require('../util/api-util');
var Map = require('./map');

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

		return (
			<div>
				<div className="left">
					<p>Latitude: {this.state.bench.lat}</p>
					<p>Longitude: {this.state.bench.lng}</p>
					<p>Seating: {this.state.bench.seating}</p>
					<p>Description: {this.state.bench.description}</p>
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
