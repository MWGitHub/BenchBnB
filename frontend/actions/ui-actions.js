var Dispatcher = require('../dispatcher/dispatcher');
var UiConstants = require('../constants/ui-constants');

var UiActions = {
	setIndexFocus: function (index) {
		Dispatcher.dispatch({
			actionType: UiConstants.SET_INDEX_FOCUS,
			index: index
		});
	}
};

module.exports = UiActions;
