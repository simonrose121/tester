(function() {
	angular
		.module('tester')
		.service('logService', logService);

	logService.$Inject = ['$http'];

	function logService($http) {
		var vm = this;

		vm.baseUrl = '/answer/';

		var service = {
			postAnswer: postAnswer
		};

		return service;

		function postAnswer(userId, question, answer, correct) {
			var log = {
				userId: userId,
				questionId: question,
				answerId: answer,
				correct: correct
			};

			postLog(log);
		}

		/* private methods */

		function postLog(log) {
			$http.post(vm.baseUrl, log).success(function(data) {
				return data;
			}).error(function(data) {
				throw data;
			});
		}
	}
})();
