var React = require('react');
var Index = require('./index');
var Map = require('./map');

var Search = React.createClass({
	contextTypes: {
		router: function() {
			return React.PropTypes.func.isRequired;
		}
	},

	_handleMapClick: function (coords) {
		this.context.router.push({
			pathname: 'benches/new',
			query: coords
		});
	},

	render: function () {
		return (
			<div>
				<Map onClick={this._handleMapClick} />
				<Index />
			</div>
		);
	}
});

module.exports = Search;
