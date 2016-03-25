var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var BenchConstants = require('../constants/bench-constants');


var _benches = [];

var BenchStore = new Store(Dispatcher);

function resetBenches(benches) {
	_benches = benches.slice();
}

BenchStore.all = function () {
	return _benches.slice();
};

BenchStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case BenchConstants.BENCHES_RECEIVED:
			resetBenches(payload.benches);
			BenchStore.__emitChange();
			break;
	}
};

module.exports = BenchStore;
