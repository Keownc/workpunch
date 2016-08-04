'use-strict'
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const cookie_parser = require('cookie-parser');
const body_parser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
// Database connection and session
require('../models/model.js');
require('../models/companyModel.js');
require('../models/appointmentModel.js');
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workpunch");
const MongoDBStore = require('connect-mongodb-session')(session)
// Run Server
const app = express();
const port = process.env.PORT || 5000;
// Require routes from routes folder
const api = require('./routes/api');
const company_api = require('./routes/company_api');
const timecard_api = require('./routes/timecard_api');
const sickLeave_api = require('./routes/sick_leave_api');
const notification = require('./routes/notification');
const schedule = require('./schedule');
const auth = require('./routes/auth');

//set static folder
app.use(express.static(path.join(__dirname, '../public')));
// Authenticated Function
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		// req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}
// Employee Dashboard Route auth
app.get('/employeeDashboard', ensureAuthenticated, function(req, res){
    res.render('../public/views/pages/employee/employeeDashboard', {
        user : req.user
    });
});
// Company Dashboard Route auth
app.get('/companyDashboard', ensureAuthenticated, function(req, res){
    res.render('../public/views/pages/company/companyDashboard', {
        admin : req.user
    });
});
// middleware
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));
app.use(cookie_parser());
app.locals.moment = require('moment');
//express session
app.use(session({
    secret: 'punchme',
    saveUninitialized: true,
    resave: true,
    store: new MongoDBStore({
        uri: process.env.MONGODB_URI || "mongodb://localhost/workpunch",
        collection: 'mySessions',
        connection: mongoose.connect,
        cookie: { maxAge: 1000 * 60 * 60 * 3 * 1 }
  })
}));
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());
app.use('/api', api);
app.use('/admin', company_api );
app.use('/timeCardApi', timecard_api );
app.use('/sickLeaveApi', sickLeave_api );
app.use('/alert', notification );
app.use('/auth', auth);
//Get all routes and set index.html as root

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
});
// schedule.start();
// Start server
var server = app.listen(port, function() {
    console.log("Listening on " + port + "...");
});
