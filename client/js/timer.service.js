(function() {
	angular
		.module('tester')
		.service('timerService', timerService);

	function timerService() {

		var interval;

		var service = {
			count: count
		};

		return service;

		function count(milliseconds, callback) {
		    setTimeout(function() {
				callback();
			}, milliseconds);
		}
	}
})();
