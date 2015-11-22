(function() {
	angular
		.module('tester')
		.constant('questions', {
			"q1": {
				"Question" : "Match the colour of this",
				"Image" : "q1.png",
				"Answers": {
					1: "q1a1.png",
					2: "q1a2.png",
					3: "q1a3.png",
					4: "q1a4.png"
				},
				"CorrectAnswer": 1
			},
			"q2": {
				"Question" : "What is the next value in the sequence?",
				"Image" : "q2.png",
				"Answers": {
					1: "q2a1.png",
					2: "q2a2.png",
					3: "q2a3.png",
					4: "q2a4.png"
				},
				"CorrectAnswer": 4
			}
		});
})();
