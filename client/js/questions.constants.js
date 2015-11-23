(function() {
	angular
		.module('tester')
		.constant('questions', {
			"1": {
				"Question" : "Match one of the shapes below with this shape",
				"Image" : "q1.png",
				"Answers": [
					{
						"id": 1,
						"src": "q1a1.png"
					},
					{
						"id": 2,
						"src": "q1a2.png"
					},
					{
						"id": 3,
						"src": "q1a3.png"
					},
					{
						"id": 4,
						"src": "q1a4.png"
					},
				],
				"CorrectAnswer": 3
			},
			// "2": {
			// 	"Question" : "What is the next value in the sequence?",
			// 	"Image" : "q2.png",
			// 	"Answers": {
			// 		1: {
			// 			"id": 1,
			// 			"src": "q2a1.png"
			// 		},
			// 		2: {
			// 			"id": 2,
			// 			"src": "q2a2.png"
			// 		},
			// 		3: {
			// 			"id": 3,
			// 			"src": "q2a3.png"
			// 		},
			// 		4: {
			// 			"id": 4,
			// 			"src": "q2a4.png"
			// 		},
			// 	},
			// 	"CorrectAnswer": 4
			// }
		});
})();
