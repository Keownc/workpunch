'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');


const isAuthenticated = function (req, res, next) {
    // if (method = 'GET'){ return next();}
    if(!req.isAuthenticated()){return next();}
    res.send(401);
    res.redirect('/');
}

router.use('/dashboard', isAuthenticated);

// router.route('/dashboard', isAuthenticated)
//
//     .get(function (req, res) {
//
//     })
//     .post(function (req, res) {
//
//     });


router.route('/dashboard/:id', isAuthenticated)
    .get(function (req, res) {
        User.find(function(err, user){
			console.log('debug2');
			if(err){
				return res.send(500, err);
			}
			return res.send(200,user);
		});
    })

    .put(function (req, res) {
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.name = user.firstName + user.lastName;
        user.company = req.body.company;
        user.position = req.body.position;
        user.description = req.body.description;
        user.save(function(err, user) {
            if (err){
                return res.send(500, err);
            }
            return res.json(user);
        });
    })

    .delete(function (req, res) {
        res.send({message: 'delete'});
    });




module.exports = router;
