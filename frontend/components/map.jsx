var React = require('react');
var BenchStore = require('../stores/bench');
var ApiUtil = require('../util/api-util');

var Map = React.createClass({
	getInitialState: function () {
		return {
			benches: BenchStore.all()
		};
	},

	componentDidMount: function () {
		this.benchChangeToken = BenchStore.addListener(this._onBenchChange);

		var mapDOMNode = this.refs.map;
		var mapOptions = {
			center: {lat: 40.725184, lng: -73.997226},
			zoom: 13
		};
		this.map = new google.maps.Map(mapDOMNode, mapOptions);
		this.map.addListener('idle', function () {
			ApiUtil.fetchBenches();
		});
	},

	componentWillUnmount: function () {
		this.benchChangeToken.remove();
	},

	_onBenchChange: function () {
		this.setState({
			benches: BenchStore.all()
		});
	},

	_onIdle: function () {

	},

	render: function () {
		for (var i = 0; i < this.state.benches.length; ++i) {
			var bench = this.state.benches[i];
			var latLng = new google.maps.LatLng(bench.lat, bench.lng);
			var marker = new google.maps.Marker({
				position: latLng,
				title: bench.description
			});
			marker.setMap(this.map);
		}

		return (
			<div className="map" ref="map">

			</div>
		);
	}
});

module.exports = Map;
