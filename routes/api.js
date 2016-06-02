'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Profile = mongoose.model('Profile');


function isAuthenticated (req, res, next) {
    if (method = 'GET'){ return next();}
    if(req.isAuthenticated()){return next();}

    return res.redirect('/login');
}

router.use('/dashboard', isAuthenticated);

router.route('/dashboard')

    .get(function (req, res) {
        Profile.find(function(err, user){
			console.log('debug2');
			if(err){
				return res.send(500, err);
			}
			return res.send(200,user);
		});
    })
    .post(function (req, res) {
        var user = new Profile();
        user.name = req.body.name;
        user.company = req.body.company;
        user.position = req.body.position;
        user.description = req.body.description;
        user.save(function(err, user) {
            if (err){
                return res.send(500, err);
            }
            return res.json(user);
        });
    });


router.route('/dashboard/:id')
    .get(function (req, res) {
        res.send({message: 'get'});
    })

    .put(function (req, res) {
        res.send({message: 'put'});
    })

    .delete(function (req, res) {
        res.send({message: 'delete'});
    });




module.exports = router;
