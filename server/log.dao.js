var DocumentDBClient = require('documentdb').DocumentClient;
var documentdbUtils = require('./documentdb.utils.js');

function LogDao(documentDBClient, databaseId, collectionId) {
	this.client = documentDBClient;
	this.databaseId = databaseId;
	this.collectionId = collectionId;

	this.database = null;
	this.collection = null;
}

LogDao.prototype = {
    init: function (callback) {
        var self = this;

        documentdbUtils.getOrCreateDatabase(self.client, self.databaseId, function (err, db) {
            if (err) {
                callback(err);

            } else {
                self.database = db;
                documentdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function (err, coll) {
                    if (err) {
                        callback(err);

                    } else {
                        self.collection = coll;
                    }
                });
            }
        });
    },

    find: function (querySpec, callback) {
        var self = this;

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                callback(null, results);
            }
        });
    },

    addItem: function (item, callback) {
        var self = this;

        self.client.createDocument(self.collection._self, item, function (err, doc) {
            if (err) {
                callback(err);

            } else {
                callback(null, doc);
            }
        });
    },
};

module.exports = LogDao;
