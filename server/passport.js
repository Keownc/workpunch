'use-strict'
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
      return done(null, user.username);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function (err, user) {
          if (err) { return done(err, false); }
          if (!user) { return done('User not found', false); }
          return done(err, user);
      });
    });

    passport.use('login', new localStrategy({
            passReqToCallback : true
        },
            function(req, username, password, done) {
                User.findOne({ username: username }, function (err, user) {
                    if (err) { return done(err, false); }
                    if (!user) { return done('User not found', false); }
                    if (!isValidPassword(user), password) { return done('invalid password', false); }

                    return done(null, user);
                 });
             }
        ));

    passport.use('signup',new localStrategy({
            passReqToCallback : true
        },
            function(req, username, password, done) {

                User.findOne({ username: username }, function (err, user) {

                    if (err) { return done(err); }
                    if (user) { return done(null, false); } else {
                        const newuser = new User();
                        newuser.name = username;
                        newuser.password = createHash(password);
                        newuser.save(function(err){
                            if (err) { return done(err, false); }
                            return done(null, newuser);
                        });
                    }
                    if (!user.verifyPassword(password)) { return done(null, false); }
                });
            }
        ));
    const isValidPassword = function(user, password){
        return bcrypt.compareSync(password, user.password)
    }
    // Generate Hash
    const createHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }

}
