var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var BenchConstants = require('../constants/bench-constants');


var _benches = [];

var BenchStore = new Store(Dispatcher);

function resetBenches(benches) {
	_benches = benches.slice();
}

function receiveBench(bench) {
	var index = _benches.indexOf(bench);
	if (index >= 0) {
		_benches[index] = bench;
	} else {
		_benches.push(bench);
	}
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
		case BenchConstants.BENCH_RECEIVED:
			receiveBench(payload.bench);
			BenchStore.__emitChange();
			break;
	}
};

module.exports = BenchStore;
