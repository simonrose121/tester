(function() {
	angular
		.module('tester')
		.controller('Tester', Tester);

	Tester.$Inject = ['$sanitize', 'logService', 'timerService', 'questions',
		'ngProgressFactory'];

	function Tester($sanitize, logService, timerService, questions,
					ngProgressFactory) {

		var vm = this;

		vm.currentQuestion = null;
		vm.answers = [];
		vm.question = "";
		vm.index = 0;
		vm.userId = 1;
		vm.userIdField = null;
		vm.finished = null;
		vm.timeLimit = 300000; // 5 minutes
		vm.progressBar = null;

		vm.displayNextQuestion = displayNextQuestion;
		vm.progressBar = progressBar;
		vm.register = register;
		vm.selectAnswer = selectAnswer;
		vm.start = start;
		vm.timerInterval = timerInterval;

		function displayNextQuestion() {
			vm.answers.length = 0;
			vm.question = "";

			// get next question in array
			vm.currentQuestion = questions.questions[vm.index];

			for (var i = 1; i <= vm.currentQuestion.Answers; i++) {
				vm.answers.push(i);
			}

			shuffle(vm.answers);

			vm.question = questions.types[vm.currentQuestion.Type];
		}

		function progressBar() {
			vm.progressBar = ngProgressFactory.createInstance();
			vm.progressBar.setColor('#FFFFFF');
			vm.progressBar.setHeight(1);
		}

		function register() {
			if (isNormalInteger(vm.userIdField)) {
				var sanitized = $sanitize(vm.userIdField);
				vm.userId = sanitized;
			}
		}

		function selectAnswer(answer) {
			var correct = false;

			console.log(vm.questionIds);
			console.log(vm.index);

			if (answer === vm.currentQuestion.CorrectAnswer) {
				correct = true;
			}

			logService.postAnswer(vm.userId, vm.currentQuestion.Id, answer, correct);

			vm.index++;

			if (vm.index == 7) {
				vm.index = 0;
			}

			vm.displayNextQuestion();
		}

		function timerInterval() {
			var value = 0;
			var percentage = 100;

			timerService.interval(100, function() {
				value += 100;

				if (value == vm.timeLimit) {
					clearInterval(this);
					$('.finished').show();
					$('.test').hide();
					vm.progressBar.complete();
					vm.progressBar.reset();
				} else {
					var newPercentage = percentage-((value/vm.timeLimit)*percentage);
					vm.progressBar.set(newPercentage);
				}
			});
		}

		function start() {
			vm.finished = false;
			vm.displayNextQuestion();
			vm.timerInterval();
			vm.progressBar();
		}

		/* private methods */
		function isNormalInteger(str) {
		    var n = ~~Number(str);
		    return String(n) === str && n >= 0;
		}

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
