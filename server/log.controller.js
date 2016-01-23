var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('../config.js');

function LogController(logDao) {
  	this.logDao = logDao;
}

// Log access methods
LogController.prototype = {
    addLog: function (req, res) {
        var self = this;
		var entry = {
			user_id: req.body.userId,
            number: req.body.number,
			question: req.body.questionId,
			answer: req.body.answerId,
			correct: req.body.correct,
            type: req.body.type,
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

    checkId: function (req, res) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.user_id=@userId',
            parameters: [{
                name: '@userId',
                value: req.body.userId
            }]
        };

        if (config.store) {
            self.logDao.find(querySpec, function (err, docs) {
                if (err) {
                    throw (err);
                }

                if (docs.length > 0) {
                    res.json(true);
                } else {
                    res.json(false);
                }
            });
        } else {
            res.json(false);
        }
    },

    getAll: function (req, res) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root'
        };

        self.logDao.find(querySpec, function (err, docs) {
            if (err) {
                throw (err);
            }

            if (docs.length > 0) {
                res.send(docs);
            } else {
                res.send(false);
            }
        });
    },

    getById: function(req, res) {
        var self = this;

        console.log(req.body);

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.user_id=@userId',
            parameters: [{
                name: '@userId',
                value: req.body.userId
            }]
        };

        self.logDao.find(querySpec, function (err, docs) {
            if (err) {
                throw (err);
            }

            if (docs !== null) {
                res.json(docs);
            }

            res.send('Doc not found');
        });
    }
};

module.exports = LogController;
