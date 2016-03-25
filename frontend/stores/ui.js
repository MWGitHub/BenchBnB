var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var UiConstants = require('../constants/ui-constants');

var _focusedIndex = null;

var UiStore = new Store(Dispatcher);

UiStore.getFocusedIndex = function () {
	return _focusedIndex;
};

UiStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case UiConstants.SET_INDEX_FOCUS:
			_focusedIndex = payload.index;
			this.__emitChange();
			break;
	}
};

module.exports = UiStore;
