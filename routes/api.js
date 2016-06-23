'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const SickLeave = mongoose.model('SickLeave');


const isLoggedIn = function (req, res, next) {
    // if (method = 'GET'){ return next();}
    if(req.isAuthenticated()){return next();}
    res.send(401);
    res.redirect('/');
}

router.use('/employee/dashboard', isLoggedIn);

router.route('/employee/dashboard', isLoggedIn)

    .get(function (req, res) {
        Employee.find({}, function(err, data) {
            res.send(data);
             user : data.user
        })
    })
    .post(function (req, res) {

        var user = new Employee();

        user.fullname = user.body.fullname;
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


router.route('/employee/dashboard/:id', isLoggedIn)

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

router.post('/upload', function(req, res){
    // var userForm = new SickLeave();
    // userForm.employeeID = req.body.employeeID;
    // userForm.daysOutSick = req.body.days;
    // userForm.slip = req.body.file
    // userForm.save(function(err, data) {
    //     if (err){
    //         return res.send(500, err);
    //     }
    //     return res.json(data);
    // });
        console.log(req.body);
        console.log(req.files);
    	res.status(204).end()
	});

//log in
// router.post('/login', passport.authenticate('login', {
// 	successRedirect: '/auth/employeeDashboard',
// 	failureRedirect: '/',
// 	failureFlash : true
// }));
//
// router.route('/register', isAuthenticated, function(){
//
//     const new_user = new Employee();
//     new_user.username = req.param.username;
//     new_user.password = req.param.createHash(password);
//     new_user.firstName = req.param('firstName');
//     new_user.lastName = req.param('lastName');
//     new_user.email = req.param('email');
//     new_user.companyID = req.param('companyID');
//     new_user.company = req.param('company');
//     new_user.save(function(err){
//         if (err) { return done(err, false); }
//         return done(null, new_user);
//     });
// })

module.exports = router;
