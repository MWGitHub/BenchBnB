var React = require('react');
var Index = require('./index');
var Map = require('./map');

var Search = React.createClass({
	render: function () {
		return (
			<div>
				<Map />
				<Index />
			</div>
		);
	}
});

module.exports = Search;
