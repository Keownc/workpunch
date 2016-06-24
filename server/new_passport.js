'use-strict'
const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const Company = mongoose.model('Company');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const passport = require('passport');


// Serializes user instance from a session store in order to support login sessions
passport.serializeUser(function(user, done) {
    done(null, user);
});

// Deserializes user so that every request will not contain the user credentials
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Defining login strategy to use
passport.use('employee-login', new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
function(req, email, password, done){
  process.nextTick(function(){
    Employee.findOne({'username': username, 'password': password}, function(err, user){
      if(user)
        return done(null, user);
      if(err)
        return err;
      return false;
    });
  });
}
));
