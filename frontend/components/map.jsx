var React = require('react');
var UiStore = require('../stores/ui');

var Map = React.createClass({
	getInitialState: function () {
		return {
			focusedMarkerIndex: null
		};
	},

	componentWillMount: function () {
		this.markers = {};
	},

	componentDidMount: function () {
		this.uiChangeToken = UiStore.addListener(this._handleUiChange);

		this._createMap();

		this.setState({
			focusedMarkerIndex: UiStore.getFocusedIndex()
		});

	},

	componentWillUnmount: function () {
		this.uiChangeToken.remove();
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
		if (this.props.onIdle) {
			this.props.onIdle({
				northEast: { lat: northEast.lat(), lng: northEast.lng() },
				southWest: { lat: southWest.lat(), lng: southWest.lng() }
			});
		}
	},

	_handleClick: function (e) {
		var latLng = e.latLng;
		if (this.props.onClick) {
			this.props.onClick({ lat: latLng.lat(), lng: latLng.lng() });
		}
	},

	_handleMarkerClick: function (marker) {
		return function (e) {
			if (this.props.onMarkerClick) {
				this.props.onMarkerClick(marker.benchId);
			}
		};
	},

	_createMap: function () {
		if (this.map) return;

		var mapDOMNode = this.refs.map;
		var mapOptions = {
			center: {lat: 40.725184, lng: -73.997226},
			zoom: 13
		};
		Object.assign(mapOptions, this.props.mapOptions || {});
		this.map = new google.maps.Map(mapDOMNode, mapOptions);
		this.map.addListener('idle', this._handleIdle);
		this.map.addListener('click', this._handleClick);
	},

	_updateMarkers: function () {
		if (!this.map) return;

		var bench, id, marker;
		var newBenches = {};


		for (var i = 0; i < this.props.benches.length; ++i) {
			bench = this.props.benches[i];
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
				var markerOptions = {
					position: latLng,
					title: bench.description
				};
				Object.assign(markerOptions, this.props.markerOptions || {});
				marker = new google.maps.Marker(markerOptions);
				marker.setMap(this.map);
				marker.benchId = id;
				marker.addListener('click', this._handleMarkerClick(marker).bind(this));
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
