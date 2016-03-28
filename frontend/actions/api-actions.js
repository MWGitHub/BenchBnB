var Dispatcher = require('../dispatcher/dispatcher');
var BenchConstants = require('../constants/bench-constants');

var ApiActions = {
	receiveAll: function (benches) {
		Dispatcher.dispatch({
			actionType: BenchConstants.BENCHES_RECEIVED,
			benches: benches
		});
	},

	receiveBench: function (bench) {
		Dispatcher.dispatch({
			actionType: BenchConstants.BENCH_RECEIVED,
			bench: bench
		});
	}
};

module.exports = ApiActions;
