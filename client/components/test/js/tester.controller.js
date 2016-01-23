(function() {
	angular
		.module('tester')
		.controller('Tester', Tester);

	Tester.$Inject = ['$sanitize', 'logService', 'timerService', 'questions',
		'ngProgressFactory'];

	/**
	 * Controls application logic and communicates with view directly.
	 *
	 * @param $sanitize
	 * @param logService
	 * @param timerService
	 * @param questions
	 * @param ngProgressFactory
	 */
	function Tester($sanitize, logService, timerService, questions,
					ngProgressFactory) {

		var vm = this;

		/* variables available to view */
		vm.answers = [];
		vm.current = null;
		vm.finished = null;
		vm.index = 0;
		vm.limit = 40;
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

		/**
		 * Display the next question on screen
		 *
		 */
		function displayNextQuestion() {
			// remove answers and question
			vm.answers.length = 0;
			vm.question = "";

			// get next question in array
			vm.current = questions.questions[vm.index];

			// add answers to current page
			for (var i = 1; i <= vm.current.answers; i++) {
				vm.answers.push(i);
			}

			// push 2 more of the wrong answer if odd one out question
			if (vm.current.type == "odd") {
				vm.answers.push(2);
				vm.answers.push(2);
			}

			// randomise answer position
			shuffle(vm.answers);

			// set question
			vm.question = questions.types[vm.current.type];
		}

		/**
		 * Display message saying test is finished
		 *
		 */
		function displayFinishedMessage() {
			$('.finished').show();
			$('.test').hide();
		}

		/**
		 * Initialise progress bar
		 *
		 * @param
		 * @returns
		 */
		function progressBar() {
			vm.progressBar = ngProgressFactory.createInstance();
			vm.progressBar.setColor('#FFFFFF');
			vm.progressBar.setHeight(1);
		}

		/**
		 * Register user
		 *
		 */
		function register() {
			if (isNormalInteger(vm.userIdField)) {
				var sanitized = $sanitize(vm.userIdField);
				if (sanitized) {
					var checkId = logService.getIdCheck(sanitized, function(exists) {
						if (!exists) {
							vm.userId = sanitized;
							vm.message = '';
						} else {
							vm.message = 'Id already exists in database';
						}
					});
				} else {
					vm.message = 'Input not valid';
				}
			} else {
				vm.message = 'Input not valid';
			}
		}

		/**
		 * Handle answer selection
		 *
		 * @param answer {object} - Answer given
		 */
		function selectAnswer(answer) {
			// is answer correct?
			var correct = false;
			if (answer === vm.current.correct) {
				correct = true;
			}

			// log answer
			logService.postAnswer(vm.userId, vm.index, vm.current.pictureId, answer, correct, vm.current.type);

			// display next question or show finished screen
			vm.index++;
			if (vm.index == vm.limit) {
				vm.displayFinishedMessage();
			}
			vm.displayNextQuestion();
		}

		/**
		 * Set timer interval to decrease in intervals
		 *
		 */
		function timerInterval() {
			var value = 0;
			var percentage = 100;

			// decrease timer every 100 milliseconds
			timerService.interval(100, function() {
				// clear interval
				$('body').bind('beforeunload',function(){
					clearInterval(this);
				});

				// set new time
				value += 100;
				if (value == vm.timeLimit) {
					// trigger test finish
					clearInterval(this);
					vm.displayFinishedMessage();
					vm.progressBar.complete();
					vm.progressBar.reset();
				} else {
					// set percentage of bar
					var newPercentage = percentage-((value/vm.timeLimit)*percentage);
					vm.progressBar.set(newPercentage);
				}
			});
		}

		/**
		 * Start test
		 *
		 */
		function start() {
			vm.finished = false;
			vm.displayNextQuestion();
			vm.timerInterval();
			vm.progressBar();
		}

		/* private methods */
		/**
		 * CHeck is string is a normal integer
		 *
		 * @param str {string} - String to be checked
		 * @returns {boolean} - If string is normal integer
		 */
		function isNormalInteger(str) {
		    var n = ~~Number(str);
		    return String(n) === str && n >= 0;
		}

		/**
		 * Shuffle an array of values
		 *
		 * @param array {object} - Array to be shuffled
		 */
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
		}
	}
})();
