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
const app = express();


passport.serializeUser(function(user, next) {
  return next(null, user._id);
});

passport.deserializeUser(function(id, done) {
  return models.User.find({
   where: {
     user_id: user._id
   }
 }).then(function(user) {
   // SEND THE USER TO THE NEXT
   return next(null, user);
 });
});

passport.use(new localStrategy({
        passReqToCallback : true
    },
    function (accessToken, refreshToken, profile, next) {
        // FIND THE USER OR CREATE ONE IF IT DOESN"T EXIST
        return models.User.findOrCreate({
          where: {
            user_id: profile.id
          },
          defaults: {
            name: profile.displayName,
            username: profile.username,
            UserTypeId: 1
          }
        }).then(function(user) {
          // SEND THE USER TO THE NEXT
          return next(null, user[0]);
        });
    }
));
// SETUP THE EXPRESS STORE
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  // SETUP A STORE (MONGO or SEQUALIZE)
  store: new sequelizeStore({
    db: appRequire('core/db')
  })
}));

app.get('/auth/success', passport.authenticate('success'), function(req, res) {
  // The request will be redirected to GitHub for authentication, so this
  // function will not be called.
});

app.get('auth/success/callback', passport.authenticate('success', {
  failureRedirect: '/'
}), function(req, res) {
  var type;
  type = req.user.UserTypeId === 1 ? 'dashboard' : 'company';
  return res.redirect('/#/' + type);
});

app.get('auth/logout', function(req, res, next) {
  req.logout();
  return req.session.destroy(function() {
    return res.redirect('/#/');
  });
});

app.use(require('app/routes'));
app.use(require('app/erours'));

module.exports = app;
