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
    res.render(__dirname + '/client/components/test/views/index.jade');
});

app.get('/admin/', function(req, res) {
    res.render(__dirname + '/client/components/admin/views/index.jade');
});

// static files
app.use('/libs', express.static(__dirname + '/client/assets/libs'));
app.use('/css', express.static(__dirname + '/client/assets/css'));
app.use('/img', express.static(__dirname + '/client/assets/img'));
app.use('/client', express.static(__dirname + '/client/'));
//
// // database
// var docDbClient = new DocumentDBClient(config.host, {
//     masterKey: config.authKey
// });
// var logDAO = new LogDAO(docDbClient, config.databaseId, config.collectionId);
// var logController = new LogController(logDAO);
// logDAO.init();

// api routes
// app.post('/answer/', logController.addLog.bind(logController));
// app.post('/checkId/', logController.checkId.bind(logController));
// app.get('/getAnswers/', logController.getAll.bind(logController));
// app.get('/getAnswersById/', logController.getById.bind(logController));

app.listen(port);

// expose app
exports = module.exports = app;
