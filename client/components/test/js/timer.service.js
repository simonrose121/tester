(function() {
	angular
		.module('tester')
		.service('timerService', timerService);

	/**
	 * Server to handle timing events
	 *
	 * @returns service
	 */
	function timerService() {
		var service = {
			count: count,
			interval: interval
		};

		return service;

		/**
		 * Count using a timeout, calling back when time is reached
		 *
		 * @param milliseconds {number} - Number of milliseconds
		 * @param callback {object} - Function to call when complete
		 */
		function count(milliseconds, callback) {
		    setTimeout(function() {
				callback();
			}, milliseconds);
		}

		/**
		 * Count using an interval, calling back when time is reached
		 * NOTE: is more precise than setTimeout
		 *
		 * @param milliseconds {number} - Number of milliseconds
		 * @param callback {object} - Function to call when complete
		 */
		function interval(milliseconds, callback) {
			setInterval(function() {
				callback();
			}, milliseconds);
		}
	}
})();
