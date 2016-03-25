var React = require('react');
var BenchStore = require('../stores/bench');
var ApiUtil = require('../util/api-util');

var Map = React.createClass({
	getInitialState: function () {
		return {
			benches: BenchStore.all()
		};
	},

	componentWillMount: function () {
		this.markers = {};
	},

	componentDidMount: function () {
		this.benchChangeToken = BenchStore.addListener(this._onBenchChange);

		var mapDOMNode = this.refs.map;
		var mapOptions = {
			center: {lat: 40.725184, lng: -73.997226},
			zoom: 13
		};
		this.map = new google.maps.Map(mapDOMNode, mapOptions);
		this.map.addListener('idle', this._onIdle);
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
		var bounds = this.map.getBounds();
		var northEast = bounds.getNorthEast();
		var southWest = bounds.getSouthWest();
		ApiUtil.fetchBenches({
			northEast: { lat: northEast.lat, lng: northEast.lng },
			southWest: { lat: southWest.lat, lng: southWest.lng }
		});
	},

	_updateMarkers: function () {
		var bench, id, marker;
		var newBenches = {};
		var newMarkers = {};
		for (var i = 0; i < this.state.benches.length; ++i) {
			bench = this.state.benches[i];
			newBenches[bench.id] = bench;
		}
		// Create markers for ones that do not already exist
		for (id in newBenches) {
			if (!this.markers[id]) {
				bench = newBenches[id];
				var latLng = new google.maps.LatLng(bench.lat, bench.lng);
				marker = new google.maps.Marker({
					position: latLng,
					title: bench.description
				});
				marker.setMap(this.map);
				newMarkers[id] = marker;
			}
		}
		// Remove markers that are no longer shown
		for (id in this.markers) {
			marker = this.markers[id];
			if (!newBenches[id]) {
				marker.setMap(null);
				delete this.markers[id];
			}
		}
		Object.assign(this.markers, newMarkers);
	},

	render: function () {
		this._updateMarkers();

		return (
			<div className="map" ref="map">

			</div>
		);
	}
});

module.exports = Map;
