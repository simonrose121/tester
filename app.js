var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 8078;

app.set('view engine', 'jade');

// get POST parameter
app.use(bodyParser.json());

// page routes
app.get('/', function(req,res) {
    res.render(__dirname + '/client/views/index.jade');
});

// static files
app.use('/libs', express.static(__dirname + '/client/assets/libs'));
app.use('/css', express.static(__dirname + '/client/assets/css'));
app.use('/img', express.static(__dirname + '/client/assets/img'));

// api routes

app.listen(port);

// expose app
exports = module.exports = app;
