'use-strict'
const express = require('express');
const router = express.Router();
// const controller = require('../controllers/mainController');
const mongoose = require('mongoose');

// home
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/dashboard', function(req, res) {
  res.render('dashboard');
});

// router.use('/dashboard', isAuthenticated);

// router.get('/dashboard')
//     .get(function (req, res) {
//
//     });

// function isAuthenticated (req, res, next) {
//     if (method = 'GET'){ return next();}
//     if(req.isAuthenticated()){return next();}
//
//     return res.redirect('/login')
// }

module.exports = router;
