var React = require('react');
var Index = require('./index');
var Map = require('./map');
var FilterStore = require('../stores/filter');
var FilterActions = require('../actions/filter-actions');
var ApiUtil = require('../util/api-util');
var FilterSeat = require('./filter-seat');
var BenchStore = require('../stores/bench');

var Search = React.createClass({
	contextTypes: {
		router: function() {
			return React.PropTypes.func.isRequired;
		}
	},

	getInitialState: function () {
		return {
			filters: FilterStore.filters(),
			benches: BenchStore.all()
		};
	},

	componentDidMount: function () {
		this.filterToken = FilterStore.addListener(this._handleFilterChange);
		this.benchToken = BenchStore.addListener(this._handleBenchChange);
	},

	componentWillUnmount: function () {
		this.filterToken.remove();
		this.benchToken.remove();
	},

	_handleFilterChange: function () {
		this.setState({
			filters: FilterStore.filters()
		});

		ApiUtil.fetchBenches();
	},

	_handleBenchChange: function () {
		this.setState({
			benches: BenchStore.all()
		});
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

	_handleBenchClick: function (id) {
		this.context.router.push({
			pathname: 'benches/' + id
		});
	},

	render: function () {
		return (
			<div>
				<div className="left">
					<FilterSeat />
					<Index onClick={this._handleBenchClick} />
				</div>
				<div className="right">
					<Map
						benches={this.state.benches}
						onIdle={this._handleMapIdle}
						onClick={this._handleMapClick}
						onMarkerClick={this._handleBenchClick}
					/>
				</div>
			</div>
		);
	}
});

module.exports = Search;
