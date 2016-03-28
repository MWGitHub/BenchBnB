var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require('../util/api-util');

var BenchForm = React.createClass({
	getInitialState: function () {
		return {
			lat: 0,
			lng: 0,
			seating: 1,
			description: ''
		};
	},

	_handleLatChange: function (e) {
		this.setState({ lat: e.target.value });
	},

	_handleLngChange: function (e) {
		this.setState({ lng: e.target.value });
	},

	_handleSeatingChange: function (e) {
		this.setState({ seating: e.target.value });
	},

	_handleDescriptionChange: function (e) {
		this.setState({ description: e.target.value });
	},

	_handleSubmit: function (e) {
		e.preventDefault();

		ApiUtil.createBench({
			lat: this.state.lat,
			lng: this.state.lng,
			seating: this.state.seating,
			description: this.state.description
		});

		this.setState(this.getInitialState());
	},

	render: function () {
		return (
			<div>
				<form onSubmit={this._handleSubmit}>
					<div className="input-wrapper">
						<label htmlFor="lat">Latitude</label>
						<input id="lat"
							type="text"
							onChange={this._handleLatChange}
							value={this.state.lat} />
					</div>

					<div className="input-wrapper">
						<label htmlFor="lng">Longitude</label>
						<input id="lng"
							type="text"
							onChange={this._handleLngChange}
							value={this.state.lng} />
					</div>

					<div className="input-wrapper">
						<label htmlFor="seating">Seating</label>
						<input id="seating"
							type="text"
							onChange={this._handleSeatingChange}
							value={this.state.seating} />
					</div>

					<div className="input-wrapper">
						<label htmlFor="description">Description</label>
						<textarea id="description" ref="description"
							type="text"
							onChange={this._handleDescriptionChange}
							value={this.state.description}>
						</textarea>
					</div>

					<div className="input-wrapper">
						<input type="submit" value="Create Bench" />
					</div>
				</form>
			</div>
		);
	}
});

module.exports = BenchForm;