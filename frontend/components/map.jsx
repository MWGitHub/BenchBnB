var React = require('react');
var BenchStore = require('../stores/bench');
var UiStore = require('../stores/ui');

var Map = React.createClass({
	getInitialState: function () {
		return {
			benches: BenchStore.all(),
			focusedMarkerIndex: null
		};
	},

	componentWillMount: function () {
		this.markers = {};
	},

	componentDidMount: function () {
		this.benchChangeToken = BenchStore.addListener(this._handleBenchChange);
		this.uiChangeToken = UiStore.addListener(this._handleUiChange);

		this._createMap();

		this.setState({
			benches: BenchStore.all(),
			focusedMarkerIndex: UiStore.getFocusedIndex()
		});

	},

	componentWillUnmount: function () {
		this.benchChangeToken.remove();
		this.uiChangeToken.remove();
	},

	_handleBenchChange: function () {
		this.setState({
			benches: BenchStore.all()
		});
	},

	_handleUiChange: function () {
		this.setState({
			focusedMarkerIndex: UiStore.getFocusedIndex()
		});
	},

	_handleIdle: function () {
		var bounds = this.map.getBounds();
		var northEast = bounds.getNorthEast();
		var southWest = bounds.getSouthWest();
		if (northEast.lat() === southWest.lat() &&
			northEast.lng() === southWest.lng()) {
			return;
		}
		this.props.onIdle({
			northEast: { lat: northEast.lat(), lng: northEast.lng() },
			southWest: { lat: southWest.lat(), lng: southWest.lng() }
		});
	},

	_handleClick: function (e) {
		var latLng = e.latLng;
		this.props.onClick({ lat: latLng.lat(), lng: latLng.lng() });
	},

	_createMap: function () {
		if (this.map) return;

		var mapDOMNode = this.refs.map;
		var mapOptions = {
			center: {lat: 40.725184, lng: -73.997226},
			zoom: 13
		};
		this.map = new google.maps.Map(mapDOMNode, mapOptions);
		this.map.addListener('idle', this._handleIdle);
		this.map.addListener('click', this._handleClick);
	},

	_updateMarkers: function () {
		if (!this.map) return;

		var bench, id, marker;
		var newBenches = {};


		for (var i = 0; i < this.state.benches.length; ++i) {
			bench = this.state.benches[i];
			newBenches[bench.id] = bench;
		}

		// Remove markers that are no longer shown
		for (id in this.markers) {
			marker = this.markers[id];
			if (!newBenches[id]) {
				marker.setMap(null);
				delete this.markers[id];
			}
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
				this.markers[id] = marker;
			}
		}
	},

	render: function () {
		this._updateMarkers();

		for (var id in this.markers) {
			var marker = this.markers[id];
			if (parseInt(id) !== this.state.focusedMarkerIndex) {
				marker.setAnimation(null);
			} else if (!marker.getAnimation()) {
				marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}

		return (
			<div className="map" ref="map">

			</div>
		);
	}
});

module.exports = Map;
