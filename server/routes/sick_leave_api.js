'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const SickLeave = mongoose.model('SickLeave');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Sick Form Router
router.get('/sickLeave', function(req, res){
    SickLeave.find({employee_id: req.user.employee_id}, function(err, data){
        res.json(data);
    })
})
router.post('/sickLeave', function(req, res){
    const sick_leave = new SickLeave();
    sick_leave.employee_id = req.body.employee_id;
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
module.exports = router;
