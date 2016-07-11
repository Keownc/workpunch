'use-strict'
const express = require('express');
const router = express.Router();
const api = require('../routes/api');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

module.exports = function(passport){

	//sends successful login state back to angular
	router.get('/success', function(req, res){
		// res.send({state: 'success', user: req.user ? req.user : null});
        res.render('/api/employeeDashboard');
	});

	//sends failure login state back to angular
	router.get('/failure', function(req, res){
		res.send({state: 'failure', user: null, message: "Invalid username or password"});
		// res.redirect('/');
	});

	//log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure',
		failureFlash : true
	}));

	//sign up employee
	router.post('/employee-signup', passport.authenticate('employee-signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure',
		failureFlash : true
	}));

    //sign up companies
	router.post('/company-signup', passport.authenticate('company-signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure',
		failureFlash : true
	}));

    // Check to see if user is logged in
    router.get('', function(req, res){
        res.send(req.isAuthenticated() ? req.user : 0)
    })

	//log out
	router.get('/logout', function(req, res) {
		req.logout();
        res.redirect('/');
        res.send(200);
	});

	return router;

}
