(function() {
	angular
		.module('tester')
		.service('logService', logService);

	logService.$Inject = ['$http'];

	/**
	 * Handle sending log objects to server side.
	 *
	 * @param $http
	 * @returns service
	 */
	function logService($http) {
		var vm = this;

		// urls
		vm.postAnswerUrl = '/answer/';
		vm.getIdCheckUrl = '/checkId/';

		var service = {
			getIdCheck: getIdCheck,
			postAnswer: postAnswer
		};

		return service;

		/**
		 * Check if a userId exists
		 *
		 * @param id {number} - UserId
		 * @param callback {object} - Function to callback when complete
		 */
		function getIdCheck(id, callback) {
			var req = {
				userId: id
			};

			getIdExists(req, callback);
		}

		/**
		 * Post an answer to a question
		 *
		 * @param userId {number} - UserId
		 * @param number {number} - Question Number
		 * @param question {number} - QuestionId
		 * @param answer {number} - AnswerId
		 * @param correct {boolean} - Was the answer correct?
		 * @param type {string} - Type of question
		 */
		function postAnswer(userId, number, question, answer, correct, type) {
			var log = {
				userId: userId,
				number: number,
				questionId: question,
				answerId: answer,
				correct: correct,
				type: type,
				timestamp: new Date()
			};

			postLog(log);
		}

		/* private methods */

		/**
		 * Send post request to check if userId exists
		 *
		 * @param id {number} - UserId
		 * @param callback {object} - Callback to be called when complete
		 */
		function getIdExists(id, callback) {
			callback(false);
			// $http.post(vm.getIdCheckUrl, id).success(function(exists) {
			// 	callback(exists);
			// }).error(function(err) {
			// 	throw err;
			// });
		}

		/**
		 * Send post request containing log of answer
		 *
		 * @param log {object} - Object containing question answer information
		 */
		function postLog(log) {
			console.log(log);
			// $http.post(vm.postAnswerUrl, log).success(function(data) {
			// 	return data;
			// }).error(function(data) {
			// 	throw data;
			// });
		}
	}
})();
