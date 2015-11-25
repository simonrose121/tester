var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('../config.js');

function LogController(logDao) {
  	this.logDao = logDao;
}

LogController.prototype = {
    addLog: function (req, res) {
        var self = this;
		var entry = {
			user_id: req.body.userId,
			question: req.body.questionId,
			answer: req.body.answerId,
			correct: req.body.correct,
            date: new Date()
		};

		console.log(entry);

		if (config.store) {
			self.logDao.addItem(entry, function (err) {
				if (err) {
					throw (err);
				}

				console.log(entry);

				res.json(entry);
			});
		} else {
            res.json(entry);
        }
    },
};

module.exports = LogController;
