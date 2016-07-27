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
    new_user.employee_id = req.body.company.substring(0,3) + new_user.createID();
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

// Timepunch routes
//  Find and return the employee times
router.get('/timecard', function(req, res){
    Timecard.find({employee_id: req.user.employee_id},function(err, data){
        res.json(data);
    })
})
// A the time the user clocked in
router.post('/timecard', function(req, res){
    const time_punch = new Timecard();
    time_punch.clock_in = req.body.clockIn;
    time_punch.clock_out = req.body.clockOut;
    time_punch.day = req.body.day;
    time_punch.month = req.body.month;
    time_punch.year = req.body.year;
    time_punch.employee_id = req.body.employeeID;
    time_punch.save(function(err, data){
        if (err){
            return res.send(500, err);
        }
        return res.json(data);
    });
})
// Add the time the user clocked out
router.put('timecard', function(req, res){
    time_punch.clock_out = req.body.clockOut;
    time_punch.save(function(err, data) {
        if (err){
            return res.send(500, err);
        }
        return res.json(data);
    });
})
// Sick Form Router
router.get('/sickLeave', function(req, res){
    SickLeave.find({employee_id: req.user.employee_id}, function(err, data){
        res.json(data);
    })
})
router.post('/sickLeave', function(req, res){
    const sick_leave = new SickLeave();
    sick_leave.employee_id = req.body.employeeID;
    sick_leave.days_out_sick = req.body.days;
    sick_leave.slip = req.body.file;
    sick_leave.save(function(err, data){
        if (err){
            return res.send(500, err);
            res.status(status).send(body)
        }
        return res.json(data);
    });
})

router.route('/employeeRecords')
    .get(function(req, res){
        Employee.find({company_id: "fullsail123"}, function(err, data){
            res.json(data);
        })
    })
module.exports = router;
