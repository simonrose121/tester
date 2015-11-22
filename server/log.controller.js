module.exports.post = function(req, res) {
	var entry = {
		user_id: req.body.userId,
		question: req.body.questionId,
		answer: req.body.answerId,
		correct: req.body.correct
	};

	console.log(entry);
};
