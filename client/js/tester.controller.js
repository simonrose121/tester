(function() {
	angular
		.module('tester')
		.controller('Tester', Tester);

	Tester.$Inject = ['questions'];

	function Tester(questions) {
		var vm = this;

		vm.currentQuestion = null;
		vm.index = 0;
		vm.questionIds = [];

		vm.displayNextQuestion = displayNextQuestion;
		vm.loadQuestionIds = loadQuestionIds;
		vm.selectAnswer = selectAnswer;

		// run methods on load
		vm.loadQuestionIds();
		vm.displayNextQuestion();

		function displayNextQuestion() {
			// get next question in array
			vm.currentQuestion = questions[vm.questionIds[vm.index++]];
		}

		function loadQuestionIds() {
			// sort questions randomly and maintain this order
			$.each(questions, function(obj) {
				vm.questionIds.push(obj);
			});

			//shuffle(vm.questionIds);
		}

		function selectAnswer(answer) {
			console.log(vm.currentQuestion.CorrectAnswer);
			console.log(answer.id);
			if (answer.id === vm.currentQuestion.CorrectAnswer) {
				console.log('right');
			} else {
				console.log('wrong');
			}

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
