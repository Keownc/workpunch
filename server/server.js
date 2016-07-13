'use-strict'
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const cookie_parser = require('cookie-parser');
const body_parser = require('body-parser');
const logger = require('morgan');
const multer  = require('multer');
const upload = multer({ dest: '../uploads/'}).array()
const path = require('path');
const passport = require('passport');
// Database connection and session
require('../models/model.js');
require('../models/companyModel.js');
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/passport");
const MongoDBStore = require('connect-mongodb-session')(session)
// Run Server
const app = express();
const port = process.env.PORT || 3000;
const api = require('../routes/api');

//set static folder
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
});

// middleware
app.use(logger('dev'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));
app.use(cookie_parser());
//express session
app.use(session({
    secret: 'punchme',
    saveUninitialized: true,
    resave: true,
    store: new MongoDBStore({
        uri: 'mongodb://localhost:27017/passport',
        collection: 'mySessions',
        connection: mongoose.connect
        // ttl: 2 * 3 * 60 * 60
  })
}));
app.use(passport.initialize());
app.use(passport.session());


//connect flash
app.use(flash());
app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.failure = req.flash('failure');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
  next();
})

app.use('/api' ,api);

// Start server
var server = app.listen(port, function() {
    console.log("Listening on " + port + "...");
});

module.exports = server;
