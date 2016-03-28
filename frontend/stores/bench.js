var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var BenchConstants = require('../constants/bench-constants');


var _benches = [];

var BenchStore = new Store(Dispatcher);

function resetBenches(benches) {
	var original = {};
	var i;

	for (i = 0; i < _benches.length; ++i) {
		original[_benches[i].id] = _benches[i];
	}

	_benches = benches.slice();

	// Give benches the reviews back if they have any
	for (i = 0; i < _benches.length; ++i) {
		var bench = _benches[i];
		if (original[bench.id]) {
			bench.reviews = bench.reviews || original.reviews;
		}
	}
}

function receiveBench(bench) {
	for (var i = 0; i < _benches.length; ++i) {
		if (_benches[i].id === bench.id) {
			_benches[i] = bench;
		}
	}
	_benches.push(bench);
}

BenchStore.all = function () {
	return _benches.slice();
};

BenchStore.find = function (id) {
	for (var i = 0; i < _benches.length; ++i) {
		if (_benches[i].id === id) return _benches[i];
	}
	return null;
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
