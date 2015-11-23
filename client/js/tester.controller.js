(function() {
	angular
		.module('tester')
		.controller('Tester', Tester);

	Tester.$Inject = ['logService', 'questions'];

	function Tester(logService, questions) {
		var vm = this;

		vm.currentQuestion = null;
		vm.index = 1;
		vm.answerIds = [];
		vm.userId = 0;

		vm.displayNextQuestion = displayNextQuestion;
		vm.loadAnswerIds = loadAnswerIds;
		vm.selectAnswer = selectAnswer;

		// run methods on load
		vm.displayNextQuestion();

		function displayNextQuestion() {
			// get next question in array
			vm.currentQuestion = questions[vm.index];
			//vm.loadAnswerIds();
			shuffle(vm.currentQuestion.Answers);
		}

		function loadAnswerIds() {
			// sort answers randomly and maintain this order
			$.each(vm.currentQuestion.Answers, function(obj) {
				vm.answerIds.push(obj);
			});

			shuffle(vm.answerIds);
		}

		function selectAnswer(answer) {
			var correct = false;

			console.log(vm.questionIds);
			console.log(vm.index);

			if (answer.id === vm.currentQuestion.CorrectAnswer) {
				correct = true;
			}

			logService.postAnswer(vm.userId, vm.questionIds[vm.index], answer.id, correct);

			vm.index++;
			vm.displayNextQuestion();
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
