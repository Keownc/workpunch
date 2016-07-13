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
const auth = require('../routes/auth')(passport);
const mongo = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/workpunch");
const MongoDBStore = require('connect-mongodb-session')(session)

// Api routes
const api = require('../routes/api');
app.use('/api', api);
app.use('/auth', auth);

// Run Server
const app = express();
const port = process.env.PORT || 5000;
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

//app.use(facicon(__dirname + '/public/facicon.ico'))
app.get('/employeeDashboard', ensureAuthenticated, function(req, res){
    res.render('../public/views/pages/employee/employeeDashboard');
});
app.get('*', function(req, res) {
    // res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
    res.sendFile('index.html', { root: path.join(__dirname, '../public/views') });
});

//set static folder
app.use(express.static(path.join(__dirname, '../public')));

// middleware
app.use(logger('dev'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));
app.use(cookie_parser());

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


app.use(upload);

// Start server
var server = app.listen(port, function() {
    console.log("Listening on " + port + "...");
});

module.exports = server;
