var Dispatcher = require('../dispatcher/dispatcher');
var FilterConstants = require('../constants/filter-constants');

var FilterActions = {
	receiveFilters: function (filters) {
		Dispatcher.dispatch({
			actionType: FilterConstants.RECEIVE_FILTERS,
			filters: filters
		});
	}
};

module.exports = FilterActions;
