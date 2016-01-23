(function() {
	angular
		.module('testerAdmin')
		.service('dataService', dataService);

	dataService.$Inject = ['$http'];

	/**
	 * Service to retrieve test data
	 *
	 * @param $http
	 * @returns service
	 */
	function dataService($http) {
		var service = {
			getAnswers: getAnswers,
			getAnswersById: getAnswersById
		};

		return service;

		/**
		 * Get all answers
		 *
		 * @param callback {object} - Function to call on success
		 */
		function getAnswers(callback) {
			$http.get('/getAnswers/').success(function(data) {
				callback(data);
			}).error(function(data) {
				throw data;
			});
		}

		/**
		 * Get individual answers by ID number
		 *
		 * @param userId {number} - User ID
		 * @param callback {object} - Function to call on success
		 */
		function getAnswersById(userId, callback) {
			var req = {
				userId: userId
			};

			$http.get('/getAnswersById/', req).success(function(data) {
				callback(data);
			}).error(function(data) {
				throw data;
			});
		}
	}
})();
