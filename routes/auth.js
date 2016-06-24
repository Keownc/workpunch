'use-strict'
const express = require('express');
const router = express.Router();
const api = require('../routes/api');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

const isLoggedIn = function (req, res, next) {
    // if (method = 'GET'){ return next();}
    if(req.isAuthenticated()){return next();}
    res.send(401);
}

module.exports = function(passport){

	//sends successful login state back to angular
	router.get('/success', function(req, res){
		// res.send({state: 'success', user: req.user ? req.user : null});
        res.json(req.session);
	});

	//sends failure login state back to angular
	router.get('/failure', function(req, res){
		// res.send({state: 'failure', user: null, message: "Invalid username or password"});
		res.redirect('/employeeDashboard');
	});

	//log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure',
		failureFlash : true
	}));

	//sign up
	router.post('/employee-signup', passport.authenticate('employee-signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure',
		failureFlash : true
	}));

	//log out
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;

}
