var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var FilterConstants = require('../constants/filter-constants');

var _filters = {
	bounds: null,
	minSeating: 1,
	maxSeating:  0
};

function mergeFilters(filters) {
	Object.assign(_filters, filters);
}

var FilterStore = new Store(Dispatcher);

FilterStore.filters = function () {
	return _filters;
};

FilterStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case FilterConstants.RECEIVE_FILTERS:
			mergeFilters(payload.filters);
			FilterStore.__emitChange();
			break;
	}
};

module.exports = FilterStore;
