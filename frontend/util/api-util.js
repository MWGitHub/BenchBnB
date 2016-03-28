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

	fetchBench: function (id) {
		$.ajax({
			type: 'GET',
			url: '/api/benches/' + id,
			dataType: 'json',
			success: function (data) {
				ApiActions.receiveBench(data);
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
	},

	createReview: function (benchId, review, onSuccess) {
		$.ajax({
			type: 'POST',
			url: '/api/benches/' + benchId + '/reviews',
			dataType: 'json',
			data: {
				review: review
			},
			success: function (data) {
				ApiActions.receiveBench(data);
				if (onSuccess) {
					onSuccess(data);
				}
			}
		});
	}
};

module.exports = ApiUtil;
