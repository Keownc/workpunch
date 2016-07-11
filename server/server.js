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
mongoose.connect("mongodb://localhost/workpunch");
const MongoDBStore = require('connect-mongodb-session')(session)
// Run Server
const app = express();
const port = process.env.PORT || 5000;

//set static folder
app.use(express.static(path.join(__dirname, '../public')));

//app.use(facicon(__dirname + '/public/facicon.ico'))

app.get('*', function(req, res) {
    // res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
    res.sendFile('index.html', { root: path.join(__dirname, '../public/views') });
});

// middleware
app.use(logger('dev'));
app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));
//express session
app.use(session({
    secret: 'punchme cat',
    saveUninitialized: true,
    resave: true,
    store: new MongoDBStore({
        uri: 'mongodb://localhost:27017/workpunch',
        collection: 'mySessions',
        connection: mongoose.connect
        // ttl: 2 * 3 * 60 * 60
  })
}));
app.use(passport.initialize());
app.use(passport.session());
//initialize Password
const init_passport = require('./passport');
init_passport(passport);
//connect flash
app.use(flash());
// Api routes
const auth = require('../routes/auth')(passport);
const api = require('../routes/api');
app.use('/auth', auth);
app.use('/api', api);



app.use(upload);

// Start server
var server = app.listen(port, function() {
    console.log("Listening on " + port + "...");
});

module.exports = server;
