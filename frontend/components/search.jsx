var React = require('react');
var Index = require('./index');
var Map = require('./map');
var FilterStore = require('../stores/filter');
var FilterActions = require('../actions/filter-actions');
var ApiUtil = require('../util/api-util');
var FilterSeat = require('./filter-seat');

var Search = React.createClass({
	contextTypes: {
		router: function() {
			return React.PropTypes.func.isRequired;
		}
	},

	getInitialState: function () {
		return {
			filters: FilterStore.filters()
		};
	},

	componentDidMount: function () {
		this.filterToken = FilterStore.addListener(this._handleFilterChange);
	},

	componentWillUnmount: function () {
		this.filterToken.remove();
	},

	_handleFilterChange: function () {
		this.setState({
			filters: FilterStore.filters()
		});

		ApiUtil.fetchBenches();
	},

	_handleMapIdle: function (bounds) {
		FilterActions.receiveFilters({
			bounds: bounds
		});
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
				<div className="left">
					<FilterSeat />
					<Index />
				</div>
				<div className="right">
					<Map onIdle={this._handleMapIdle} onClick={this._handleMapClick} />
				</div>
			</div>
		);
	}
});

module.exports = Search;
