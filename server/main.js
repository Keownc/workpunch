'use-strict'
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const cookie_parser = require('cookie-parser');
const body_parser = require('body-parser');
const path = require('path');
const passport = require('passport');
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/workpunch");
const db = mongoose.connection;
const app = express();
const port = process.env.PORT || 4000;

const home = require('../routes/index');
const register = require('../routes/register');
const dashboard = require('../routes/dashboard');
const authenticate = require('../routes/authenticate')(passport);

// View engine
app.set('view engine', 'ejs');
app.set('../views', path.join(__dirname + 'views'));

//set static folder
app.use(express.static(path.join(__dirname, '../assets')));

//express session
app.use(session({
    secret: 'punchme',
    saveUninitialized: true,
    resave: true
}));

//connect flash
app.use(flash());
// middleware
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}))
app.use(cookie_parser());
app.use(passport.initialize());
app.use(passport.session());

//Initialize models
require('../models/employee.js');
//initialize Password
const init_password = require('./passport');
init_password(passport);

// Routes
app.use('/', home);
app.use('/register', register);
app.use('/dashboard', dashboard);
app.use('/auth', authenticate);


// Start server
var server = app.listen(port, function() {
    console.log("Listening on " + port + "...");
});

module.exports = server;
