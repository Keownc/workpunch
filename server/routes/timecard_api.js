'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const Timecard = mongoose.model('Timecard');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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
    time_punch.clock_in = req.body.clock_in;
    time_punch.clock_out = req.body.clock_out;
    time_punch.day = req.body.day;
    time_punch.month = req.body.month;
    time_punch.year = req.body.year;
    time_punch.employee_id = req.body.employee_id;
    time_punch.save(function(err, data){
        if (err){
            return res.send(500, err);
        }
        return res.json(data);
    });
})
// Add the time the user clocked out
router.put('timecard', function(req, res){
    time_punch.clock_out = req.body.clock_out;
    time_punch.save(function(err, data) {
        if (err){
            return res.send(500, err);
        }
        return res.json(data);
    });
})
module.exports = router;
