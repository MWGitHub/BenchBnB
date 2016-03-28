var React = require('react');
var FilterActions = require('../actions/filter-actions');
var FilterStore = require('../stores/filter');

var FilterSeat = React.createClass({
	getInitialState: function () {
		var filters = FilterStore.filters();
		
		return {
			minSeats: filters.minSeating,
			maxSeats: filters.maxSeating
		};
	},

	componentDidMount: function () {
		this.filterToken = FilterStore.addListener(this._onFilterChange);
	},

	componentWillUnmount: function () {
		this.filterToken.remove();
	},

	_onFilterChange: function () {
		var filters = FilterStore.filters();
		this.setState({
			minSeats: filters.minSeating,
			maxSeats: filters.maxSeating
		});
	},

	_handleMinSeatChange: function (e) {
		var val = parseInt(e.target.value);
		this.setState({
			minSeats: val
		});

		FilterActions.receiveFilters({ minSeating: val });
	},

	_handleMaxSeatChange: function (e) {
		var val = parseInt(e.target.value);
		this.setState({
			maxSeats: val
		});

		FilterActions.receiveFilters({ maxSeating: val });
	},

	render: function () {
		return (
			<div>
				<div>
					<label>Min Seats:
						<input type="text"
							value={this.state.minSeats}
							onChange={this._handleMinSeatChange} />
					</label>
				</div>
				<div>
					<label>Max Seats:
						<input type="text"
							value={this.state.maxSeats}
							onChange={this._handleMaxSeatChange} />
					</label>
				</div>
			</div>
		);
	}
});

module.exports = FilterSeat;
