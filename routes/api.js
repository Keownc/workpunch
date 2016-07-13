'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const Company = mongoose.model('Company');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Register
router.get('/register', function(req, res){
	res.render('register');
});

//Register
router.post('/register', function(req, res){

    const new_user = new Employee();
    new_user.username = req.body.username;
    new_user.password = new_user.createHash(req.body.password);
    new_user.firstName = req.body.firstName;
    new_user.lastName = req.body.lastName;
    new_user.email = req.body.email;
    new_user.companyID = req.body.companyID;
    new_user.company = req.body.company;

    new_user.save(function(err, data){
        if (err){
            return res.send(500, err);
        }
        return res.json(data);
    });
    req.flash('success', 'You have succesfull registered');
    // res.redirect('/employeeDashboard');
})

passport.use(new LocalStrategy(
  function(username, password, done) {
    Employee.findOne({ 'username': username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });

  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Employee.findById(id, function(err, user) {
    done(err, user);
  });
});

//Login Route
router.post('/login', passport.authenticate('local'),
    function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    req.user;
    res.redirect('/');
  });

//log out
router.get('/logout', function(req, res) {
  req.logout();
  res.send(200);
  res.redirect('/');
});

// Employee Dashboard Route
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}
//Get all routes and set index.html as root
router.get('/employeeDashboard', ensureAuthenticated, function(req, res){
    res.render('../public/views/pages/employee/employeeDashboard');
});

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
                console.log(data);
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

module.exports = router;
