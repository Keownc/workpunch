'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');


const isAuthenticated = function (req, res, next) {
    // if (method = 'GET'){ return next();}
    if(!req.isAuthenticated()){return next();}
    res.send(401);
    res.redirect('/');
}

router.use('/employee/dashboard', isAuthenticated);

router.route('/employee/dashboard', isAuthenticated)

    .get(function (req, res) {
        Employee.find({}, function(err, data) {
            res.send(data);
        })
    })
    .post(function (req, res) {

        var user = new Employee();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.name = user.firstName + user.lastName;
        user.company = req.body.company;
        user.position = req.body.position;
        user.description = req.body.description;
        user.save(function(err, data) {
            if (err){
                return res.send(500, err);
            }
            return res.json(data);
        });
    })


router.route('/employee/dashboard/:id', isAuthenticated)

    .get(function (req, res) {
        Employee.findOne({_id: req.params.id },function(err, data){

                if (err){
                    return res.send(500, err);
                }
                res.json(data);

        });
    })

    .post(function (req, res) {
        Employee.findAndModify({_id: req.params.id}, function(err, data){
            res.json(data);
        });
    })

    .delete(function (req, res) {
        Employee.remove({_id: req.params.id}, function (err) {
            res.send(500, err);
        });
    });




module.exports = router;
