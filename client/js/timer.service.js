(function() {
	angular
		.module('tester')
		.service('timerService', timerService);

	function timerService() {

		var interval;

		var service = {
			count: count,
			interval: interval
		};

		return service;

		function count(milliseconds, callback) {
		    setTimeout(function() {
				callback();
			}, milliseconds);
		}

		function interval(milliseconds, callback) {
			setInterval(function() {
				callback();
			}, milliseconds);
		}
	}
})();
