(function() {
	angular
		.module('tester')
		.controller('Tester', Tester);

	Tester.$Inject = ['$sanitize', 'logService', 'timerService', 'questions',
		'ngProgressFactory'];

	function Tester($sanitize, logService, timerService, questions,
					ngProgressFactory) {

		var vm = this;

		/* variables available to view */
		vm.answers = [];
		vm.currentQuestion = null;
		vm.finished = null;
		vm.index = 0;
		vm.limit = 31;
		vm.progressBar = null;
		vm.question = "";
		vm.timeLimit = 300000; // 5 minutes
		vm.userId = null;
		vm.userIdField = null;

		/* public methods */
		vm.displayFinishedMessage = displayFinishedMessage;
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

			if (vm.currentQuestion.Type == "odd") {
				// push 2 more of the wrong answer
				vm.answers.push(2);
				vm.answers.push(2);
			}

			shuffle(vm.answers);

			vm.question = questions.types[vm.currentQuestion.Type];
		}

		function displayFinishedMessage() {
			$('.finished').show();
			$('.test').hide();
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

			if (answer === vm.currentQuestion.CorrectAnswer) {
				correct = true;
			}

			logService.postAnswer(vm.userId, vm.currentQuestion.Id, answer, correct);

			vm.index++;

			if (vm.index == vm.limit) {
				vm.displayFinishedMessage();
			}

			vm.displayNextQuestion();
		}

		function timerInterval() {
			var value = 0;
			var percentage = 100;

			timerService.interval(100, function() {
				$('body').bind('beforeunload',function(){
					clearInterval(this);
				});

				value += 100;

				if (value == vm.timeLimit) {
					clearInterval(this);
					vm.displayFinishedMessage();
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
