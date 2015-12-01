(function() {
	angular
		.module('tester')
		.service('logService', logService);

	logService.$Inject = ['$http'];

	function logService($http) {
		var vm = this;

		vm.postAnswerUrl = '/answer/';
		vm.getIdCheckUrl = '/checkId/';

		var service = {
			getIdCheck: getIdCheck,
			postAnswer: postAnswer
		};

		return service;

		function getIdCheck(id, callback) {
			var req = {
				userId: id
			};

			getIdExists(req, callback);
		}

		function postAnswer(userId, question, answer, correct) {
			var log = {
				userId: userId,
				questionId: question,
				answerId: answer,
				correct: correct,
				timestamp: new Date()
			};

			postLog(log);
		}

		/* private methods */

		function getIdExists(id, callback) {
			$http.post(vm.getIdCheckUrl, id).success(function(exists) {
				callback(exists);
			}).error(function(err) {
				throw err;
			});
		}

		function postLog(log) {
			console.log(log);
			$http.post(vm.postAnswerUrl, log).success(function(data) {
				return data;
			}).error(function(data) {
				throw data;
			});
		}
	}
})();
