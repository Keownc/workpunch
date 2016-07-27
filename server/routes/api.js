'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const Company = mongoose.model('Company');
const Timecard = mongoose.model('Timecard');
const SickLeave = mongoose.model('SickLeave');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const uuid = require('node-uuid');
// Register
router.get('/register', function(req, res){
	res.render('register');
});

//A Register route for employees
router.post('/register', function(req, res){
    const date = new Date();
    date.toString();
    // Create a new user in the employee schema
    const new_user = new Employee();
    new_user.username = req.body.username;
    new_user.password = new_user.createHash(req.body.password);
    new_user.first_name = req.body.firstName;
    new_user.last_name = req.body.lastName;
    new_user.email = req.body.email;
    new_user.company = req.body.company;
    new_user.employee_id = uuid.v4().substring(0,13) ;
    new_user.created_at = date;
    new_user.save(function(err, data){
        if (err){
            return res.send(500, err);
        }
        return res.json(data);
    });
    req.flash('success', 'You have succesfull registered');
});

//  Employee Dashboard Route
router.route('/employeeDashboard/')
// Run a get request function to find the logged in user and return their information/data
    .get(function (req, res) {
        Employee.findOne({_id: req.user._id}, function(err, data) {
            res.json(data);
        });
    })
    // Run a put request Function to update the user's data
    .put(function (req, res) {
        var user = req.user;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.company = req.body.company;
        user.position = req.body.position;
        user.save(function(err, data) {
            if (err){
                return res.send(500, err);
            }
            return res.json(data);
        });
    })
    //  Post request to add User avatar to their account
    .post(function (req, res) {
        var user = req.user;
        user.avatar = req.body.avatar;
        user.save(function(err, data) {
            if (err){
                return res.send(500, err);
            }
            return res.json(data);
        });
    })
//  A Function to find all user by the company they work
router.route('/employeeRecords')
    .get(function(req, res){
        Employee.find({company: "fullsail"}, function(err, data){
            res.json(data);
        })
    })
module.exports = router;
