'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const Company = mongoose.model('Company');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Register
router.post('/register', function(req, res){

    const new_user = new Employee();
    new_user.username = req.body.username;
    new_user.password = req.body.password;
    new_user.firstName = req.body.firstName;
    new_user.lastName = req.body.lastName;
    new_user.email = req.body.email;
    new_user.companyID = req.body.companyID;
    new_user.company = req.body.company;
    new_user.save(function(err, data){
        if (err){
            return res.send(500, err);
        }
        return res.json(data);
    });

    req.flash('success', 'You have succesfull registered');

    // res.redirect('/employeeDashboard');
})

passport.use(new LocalStrategy(
  function(username, password, done) {
    Employee.findOne({ 'username': username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });

  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//Login Route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/employeeDashboard',
    failureRedirect: '/',
    failureFlash: true
    }),
    function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    req.user;
    res.redirect('/');
  });

//log out
router.get('/logout', function(req, res) {
  req.logout();
  res.send(200);
  res.redirect('/');
});
// Employee Dashboard Route



module.exports = router;
