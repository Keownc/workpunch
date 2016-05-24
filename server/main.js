'use-strict'

const express = require('express');
const body_parser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Adding body parser to parse json automatically
app.use(body_parser.json());

// Routes
// app.use('/', require('../routes/js')(express));
// app.use('/route', require('../routes/js')(express));

// Start server
var server = app.listen(port, function() {
    console.log("Listening on " + port + "...");
});

module.exports = server;
