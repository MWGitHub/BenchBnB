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
	}
};

module.exports = ApiUtil;
