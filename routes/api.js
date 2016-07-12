'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const SickLeave = mongoose.model('SickLeave');
const passport = require('passport');

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        console.log("Authenticated");
        res.send(401);
    }else{
        console.log("Not Authenticated");
        next();
    }
    res.redirect('/')
}

// //sends successful login state back to angular
// router.get('/success', function(req, res){
//     res.send({state: 'success', user: req.user ? req.user : null});
// });
//
// //sends failure login state back to angular
// router.get('/failure', function(req, res){
//     res.send({state: 'failure', user: null, message: "Invalid username or password"});
//     // res.redirect('/');
// });

//log in
router.post('/login', passport.authenticate('login', function(req, res) {
    res.json(req.session)
}));

//sign up employee
router.post('/employee-signup', passport.authenticate('employee-signup', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure',
    failureFlash : true
}));

//sign up companies
router.post('/company-signup', passport.authenticate('company-signup', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure',
    failureFlash : true
}));

//log out
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
    res.send(200);
});

router.use('/employeeDashboard', isLoggedIn);

router.route('/employeeDashboard')

    .get(function (req, res) {

        Employee.find({id: req.session.passport.user._id}, function(err, data) {
            res.json({
                user : data.user,
                // user: req.data
                sessions: req.session
            })
            console.log('user data'+ data.user.username);
        })
    })
    .post(function (req, res) {

        var user = req.user;
        user.fullName = req.body.fullname;
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

router.route('/employeeDashboard/:id')

    .get(function (req, res) {
        Employee.findOne({_id: req.params.id },function(err, data){

                if (err){
                    return res.send(500, err);
                }
                res.json(data.user);
                console.log('user data id'+ data.user.username);
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

// Upload route

// router.post('/upload', function(req, res){
//     var userForm = new SickLeave();
//     userForm.employeeID = req.body.employeeID;
//     userForm.daysOutSick = req.body.days;
//     userForm.slip = req.body.file
//     userForm.save(function(err, data) {
//         if (err){
//             return res.send(500, err);
//         }
//         return res.json(data);
//     });
//         console.log(req.body);
//         console.log(req.files);
//     	res.status(204).end()
// 	});
//

//
// router.post('/register', function(req, res){
//
//     const new_user = new Employee();
//     new_user.username = req.body.username;
//     new_user.password = req.body.password;
//     new_user.firstName = req.body.firstName;
//     new_user.lastName = req.body.lastName;
//     new_user.email = req.body.email;
//     new_user.companyID = req.body.companyID;
//     new_user.company = req.body.company;
//     new_user.save(function(err, data){
//         if (err){
//             return res.send(500, err);
//         }
//         return res.json(data);
//     });
// })

module.exports = router;
