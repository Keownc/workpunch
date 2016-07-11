'use-strict'
const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const Company = mongoose.model('Company');
const localStrategy = require('passport-local').Strategy;


module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user.username);
      return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        Employee.findById(id, function (err, user) {
            // console.log('deserializing user:',user.username);
            return done(err, user);
        });
    });

    passport.use('login', new localStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            process.nextTick(function(){
                Employee.findOne({ 'username': username}, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) {
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message','User not found')); }
                    if (!user.validPassword(password)) {
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message','Invalid Password')); }

                    return done(null, user);
                 });
             });
         }
    ));
    // passport registration for employees
    passport.use('employee-signup',new localStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            Employee.findOne({ username: username}, function (err, user) {
                if (err) { return done(err); }
                if (user) {
                    console.log('user exits'+ username);
                    return done(null, false);
                } else {
                    console.log('create new user '+ username);
                    const new_user = new Employee();
                    new_user.companyID = req.param('companyID');
                    new_user.company = req.param('company');
                    new_user.email = req.param('email');
                    new_user.firstName = req.param('firstName');
                    new_user.lastName = req.param('lastName');
                    new_user.username = username;
                    new_user.password = new_user.createHash(password);
                    new_user.employeeID = req.param('company').substring(0,3) + new_user.createID();
                    new_user.save(function(err){
                        if (err) { return done(err, false); }
                        return done(null, new_user);
                    });
                }
            });
        }
    ));
    // passport registration for companies
    passport.use('company-signup',new localStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            Employee.findOne({ username: username , password : password }, function (err, user) {
                if (err) { return done(err); }
                if (user) {
                    console.log('user exits'+ username);
                    return done(null, false);
                } else {
                    console.log('create new user '+ username);
                    const new_company = new Company();
                    new_company.branch = req.param('branch');
                    new_company.companyID = req.param('companyID');
                    new_company.company = req.param('company');
                    new_company.username = username;
                    new_company.password = new_company.createHash(password);
                    new_company.save(function(err){
                        if (err) { return done(err, false); }
                        return done(null, new_company);
                    });
                }
            });
        }
    ));

}
