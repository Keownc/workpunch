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

module.exports = router;
