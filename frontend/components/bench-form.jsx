var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require('../util/api-util');

var BenchForm = React.createClass({
	contextTypes: {
		router: function() {
			return React.PropTypes.func.isRequired;
		}
	},

	getInitialState: function () {
		return {
			lat: 0,
			lng: 0,
			seating: 1,
			description: '',
			photoURL: ''
		};
	},

	componentDidMount: function () {
		this.setState({
			lat: this.props.location.query.lat || "0",
			lng: this.props.location.query.lng || "0"
		});
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

	_handleImageUpload: function (e) {
		var that = this;
		cloudinary.openUploadWidget(
			{
				upload_preset: 'pn7dzl1g'
			},
  		function(error, result) {
				console.log(error, result);
				if (result) {
					that.setState({
						photoURL: result[0].url
					});
				}
			}
		);
	},

	_handleSubmit: function (e) {
		e.preventDefault();

		ApiUtil.createBench({
			lat: this.state.lat,
			lng: this.state.lng,
			seating: this.state.seating,
			description: this.state.description,
			photo_url: this.state.photoURL
		});

		this.setState(this.getInitialState());

		this.context.router.push({
			pathname: '/'
		});
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
						<button type="button" onClick={this._handleImageUpload}>
							Upload Images
						</button>
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
