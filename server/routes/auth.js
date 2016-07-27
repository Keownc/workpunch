'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const Company = mongoose.model('Company');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Employee.findById(id, function(err, user) {
    done(err, user);
  });
});


// passpot local Strategy to sign the Employees
// Start a new LocalStrategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    //   Run a function to fine A user using the username field in the Employee schema
    Employee.findOne({ 'username': username }, function(err, user) {
        // Run an if statem to check for errors or if the user and their password matches
      if (err) { return done(err); }
    //   Check to see if the user exist
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
    //   Check to see if the password matches
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
// Passport Strategy to sign in the Employer
passport.use('signup-company',new LocalStrategy(
  function(username, password, done) {
      //   Run a function to fine A user using the username field in the Company schema
    Company.findOne({ 'username': username }, function(err, user) {
        // Run an if statem to check for errors or if the user and their password matches
      if (err) { return done(err); }
      //   Check to see if the user exist
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      //   Check to see if the password matches
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// When Login Route called, check authentication and if successful send the.
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
});
router.post('/login-company', passport.authenticate('signup-company'), function(req, res) {
    res.send(req.session);
});

//log out the Users
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
module.exports = router;
