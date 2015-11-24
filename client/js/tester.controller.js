(function() {
	angular
		.module('tester')
		.controller('Tester', Tester);

	Tester.$Inject = ['logService', 'timerService', 'questions'];

	function Tester(logService, timerService, questions) {
		var vm = this;

		vm.currentQuestion = null;
		vm.index = 0;
		vm.userId = 0;

		vm.displayNextQuestion = displayNextQuestion;
		vm.selectAnswer = selectAnswer;
		vm.startTimer = startTimer;

		// run methods on load
		vm.displayNextQuestion();
		vm.startTimer();

		function displayNextQuestion() {
			// get next question in array
			vm.currentQuestion = questions[vm.index];
			//vm.loadAnswerIds();
			shuffle(vm.currentQuestion.Answers);
		}

		function selectAnswer(answer) {
			var correct = false;

			console.log(vm.questionIds);
			console.log(vm.index);

			if (answer.id === vm.currentQuestion.CorrectAnswer) {
				correct = true;
			}

			logService.postAnswer(vm.userId, vm.currentQuestion.Id, answer.id, correct);

			vm.index++;
			//TODO: REMOVE
			if (vm.index == 6) {
				vm.index = 0;
			}

			vm.displayNextQuestion();
		}

		function startTimer() {
			//300000 milliseconds
			timerService.count(300000, function() {
				console.log('time up');
			});
		}

		/* private methods */
		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

		    	// Pick a remaining element...
			    randomIndex = Math.floor(Math.random() * currentIndex);
			    currentIndex -= 1;

			    // And swap it with the current element.
			    temporaryValue = array[currentIndex];
			    array[currentIndex] = array[randomIndex];
			    array[randomIndex] = temporaryValue;
			}

			return array;
		}
	}
})();
