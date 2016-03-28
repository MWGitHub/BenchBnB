var ApiActions = require('../actions/api-actions');
var FilterStore = require('../stores/filter');

var ApiUtil = {
	fetchBenches: function () {
		var filters = FilterStore.filters();
		$.ajax({
			type: 'GET',
			url: '/api/benches',
			dataType: 'json',
			data: {
				bounds: filters.bounds,
				minSeating: filters.minSeating,
				maxSeating: filters.maxSeating
			},
			success: function (data) {
				ApiActions.receiveAll(data);
			}
		});
	},

	createBench: function (bench) {
		$.ajax({
			type: 'POST',
			url: '/api/benches',
			dataType: 'json',
			data: {
				bench: bench
			},
			success: function (data) {
				ApiActions.receiveBench(data);
			}
		});
	}
};

module.exports = ApiUtil;
