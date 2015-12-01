var express = require('express');
var bodyParser = require('body-parser');
var DocumentDBClient = require('documentdb').DocumentClient;

var app = express();

var config = require('./config');
var LogDAO = require('./server/log.dao.js');
var LogController = require('./server/log.controller.js');

var port = process.env.PORT || 8078;

app.set('view engine', 'jade');

// get POST parameter
app.use(bodyParser.json());

// page routes
app.get('/', function(req,res) {
    res.render(__dirname + '/client/views/index.jade');
});

// static files
app.use('/libs', express.static(__dirname + '/client/libs'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/js', express.static(__dirname + '/client/js'));

// database
var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});
var logDAO = new LogDAO(docDbClient, config.databaseId, config.collectionId);
var logController = new LogController(logDAO);
logDAO.init();

// api routes
app.post('/answer/', logController.addLog.bind(logController));
app.post('/checkId/', logController.checkId.bind(logController));

app.listen(port);

// expose app
exports = module.exports = app;
