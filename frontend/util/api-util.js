var ApiActions = require('../actions/api-actions');

var ApiUtil = {
	fetchBenches: function () {
		$.ajax({
			type: 'GET',
			url: '/api/benches',
			dataType: 'json',
			success: function (data) {
				ApiActions.receiveAll(data);
			}
		});
	}
};

module.exports = ApiUtil;
