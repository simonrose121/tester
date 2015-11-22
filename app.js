var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var logController = require('./server/log.controller.js');

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

// api routes
app.post('/answer/', logController.post);

app.listen(port);

// expose app
exports = module.exports = app;
