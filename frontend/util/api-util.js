var ApiActions = require('../actions/api-actions');

var ApiUtil = {
	fetchBenches: function (bounds) {
		$.ajax({
			type: 'GET',
			url: '/api/benches',
			dataType: 'json',
			data: {
				bounds: bounds
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
