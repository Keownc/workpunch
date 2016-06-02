'use-strict'
const mongoose = require('mongoose');
const User = mongoose.model('User');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


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
                if (!isValidPassword(user, password)) { return done('invalid password', false); }

                return done(null, user);
             });
         }
    ));

    passport.use('signup',new localStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {

            User.findOne({ username: username }, function (err, user) {

                if (err) { console.log( ' Error signup'+err); return done(err); }
                if (user) {console.log('user exits'+ username); return done(null, false); } else {
                    console.log('create new use'+ username);
                    const newuser = new User();
                    newuser.employeeId = employeeId;
                    newuser.firstName = firstName;
                    newuser.lastName = lastName;
                    newuser.username = username;
                    newuser.email = email;
                    newuser.password = createHash(password);
                    newuser.company = company;
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
