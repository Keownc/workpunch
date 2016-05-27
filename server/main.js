'use-strict'

const express = require('express'),
      body_parser = require('body-parser'),
      path = require('path');

const app = express();
const port = process.env.PORT || 4000;

// Adding body parser to parse json automatically
app.use(body_parser.json());
app.use(express.static(path.join(__dirname, '../assets')));

// Routes
app.set('view engine', 'ejs');
app.set('../views', path.join(__dirname + 'views'));

app.get('/', function(req, res) {
  res.render('index');
});
app.use('/register', function(req, res) {
  res.render('register');
});
// Start server
var server = app.listen(port, function() {
    console.log("Listening on " + port + "...");
});

module.exports = server;
