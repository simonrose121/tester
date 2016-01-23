(function() {
	angular
		.module('testerAdmin')
		.controller('TesterAdmin', TesterAdmin);

	TesterAdmin.$Inject = ['dataService'];

	/**
	 * Controls application logic and communicates with view directly.
	 *
	 * @param dataService
	 */
	function TesterAdmin(dataService) {
		var vm = this;

		vm.userIds = [];
		vm.scores = [];
		vm.data = null;

		// function hoisting
		vm.getData = getData;
		vm.getData();

		/**
		 * Get data from all answers
		 *
		 */
		function getData() {
			dataService.getAnswers(function(data) {
				vm.userIds = getDistinct(data);
				vm.userIds.sort(sortNumber);
				vm.data = data;
				for (var i = 0; i < vm.userIds.length; i++) {
					var userId = vm.userIds[i];
					var score = getScore(userId);
					var answers = getAnswers(userId);
					vm.scores.push({
						"userId": userId,
						"score": score.score,
						"total": score.total,
						"answers": answers
					});
				}
			});
		}

		/**
		 * Get all answers for a user
		 *
		 * @param userId {number} - UserId
		 * @return {object} - Array of answers
		 */
		function getAnswers(userId) {
			var answers = [];

			for (var i = 0; i < vm.data.length; i++) {
				var item = vm.data[i];
				if (item.user_id === userId) {
					answers.push(item);
				}
			}

			return answers;
		}

		/**
		 * Get overall score for a user
		 *
		 * @param userId {number} - UserId
		 * @returns {object} - Score and total questions answered
		 */
		function getScore(userId) {
			var score = 0;
			var total = 0;

			for (var i = 0; i < vm.data.length; i++) {
				var item = vm.data[i];
				if (parseInt(item.user_id) === userId) {
					// got data here
					if (item.correct === true) {
						score++;
					}
					total++;
				}
			}

			return {
				score: score,
				total: total
			};
		}

		/**
		 * Get distinct userIds from data
		 *
		 * @param array {object} - Array of all answers
		 * @returns {object} - Distinct array of userIDs
		 */
		function getDistinct(array) {
			var unique = {};
			var distinct = [];
			for (var i in array) {
			 	if (typeof(unique[array[i].user_id]) == "undefined") {
			  		distinct.push(parseInt(array[i].user_id));
			 	}
			 	unique[array[i].user_id] = 0;
			}
			return distinct;
		}

		/**
		 * Sort two numbers
		 *
		 * @param a {number} - First number
		 * @param b {number} - Second number
		 * @returns {number}
		 */
		function sortNumber(a, b) {
			return a - b;
		}
	}
})();
