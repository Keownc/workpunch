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

// A Register route for companies
router.post('/companyRegister', function(req, res){
    // Create a new user in the company schema
    const new_company = new Company();
    new_company.branch = req.body.branch;
    new_company.company = req.body.company;
    new_company.username = req.body.username;
    new_company.password = new_company.createHash(req.body.password);
    new_company.save(function(err, data){
        if (err) { return res.send(500, err); }
        return res.json(data);
    });
})

// Find and return the company data
router.route('/companyDashboard/')
    .get(function (req, res) {
        Company.findOne({_id: "5793dc65d50cfd7a3cf075ff"}, function(err, data) {
            res.json(data);
            const companyID = data.companyID;
            return companyID
        });
    })
module.exports = router;
