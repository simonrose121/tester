(function() {
	angular
		.module('testerAdmin')
		.controller('TesterAdmin', TesterAdmin);

	TesterAdmin.$Inject = ['dataService'];

	function TesterAdmin(dataService) {
		var vm = this;

		vm.userIds = [];
		vm.scores = [];
		vm.data = null;

		vm.getData = getData;

		vm.getData();

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
						"score": score,
						"answers": answers
					});
				}
			});
		}

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

		function getScore(userId) {
			var score = 0;

			for (var i = 0; i < vm.data.length; i++) {
				var item = vm.data[i];
				if (parseInt(item.user_id) === userId) {
					// got data here
					if (item.correct === true) {
						score++;
					}
				}
			}

			return score;
		}

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

		function sortNumber(a, b) {
			return a - b;
		}
	}
})();
