var DocumentDBClient = require('documentdb').DocumentClient;

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
			correct: req.body.correct
		};

        self.logDao.addItem(entry, function (err) {
            if (err) {
                throw (err);
            }

			console.log(entry);

            return entry;
        });
    },
};

module.exports = LogController;
