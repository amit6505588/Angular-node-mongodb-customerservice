var express = require('express');
var http = require('http');
var cors = require('cors');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var route = require('./routes/route');

var port = 3000;


var config = require('./config/config');


// connect to mongoDB
mongoose.connect(config.dbUrl);
mongoose.connection.on('connected', () => {
  console.log('connected to mongo database');
});

mongoose.connection.on('error', err => {
  console.log('Error at mongoDB: ' + err);
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));
// set your first route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/', route);
var server = http.createServer(app);
server.listen(port, () => {
  console.log('Server is starting = ' + port);
});
