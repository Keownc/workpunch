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

    const new_user = new Employee();
    new_user.username = req.body.username;
    new_user.password = new_user.createHash(req.body.password);
    new_user.firstName = req.body.firstName;
    new_user.lastName = req.body.lastName;
    new_user.email = req.body.email;
    new_user.companyID = req.body.companyID;
    new_user.employeeID = req.body.companyID.substring(0,3) + new_user.createID();
    new_user.created_at = date;
    new_user.save(function(err, data){
        if (err){
            return res.send(500, err);
        }
        return res.json(data);
    });
    req.flash('success', 'You have succesfull registered');
    // res.redirect('/employeeDashboard');
});

// A Register route for companies
router.post('/companyRegister', function(req, res){
    const new_company = new Company();
    new_company.branch = req.body.branch;
    new_company.companyID = req.body.companyID;
    new_company.company = req.body.company;
    new_company.username = req.body.username;
    new_company.password = new_company.createHash(req.body.password);
    new_company.save(function(err, data){
        if (err) { return res.send(500, err); }
        return res.json(data);
    });
})
// passpot local Strategy to sign the Employees
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
// Passport Strategy to sign in the Employers
passport.use('signup-company',new LocalStrategy(
  function(username, password, done) {
    Company.findOne({ 'username': username }, function(err, user) {
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
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
});
router.post('/login-company', passport.authenticate('signup-company'), function(req, res) {
    res.send(req.user);
});
// Employee Dashboard Route
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		// req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}

//log out
router.get('/logout', function(req, res) {
  req.logout();

  res.redirect('/');
});

// Create a route to check if the user is logged in
// router.get('/isLoggedIn', function(req, res){
//
// });

router.route('/employeeDashboard/')
// username: req.user.username
    .get(function (req, res, next) {
        Employee.findOne({_id: req.user._id}, function(err, data) {
            res.json(data);
        });
    })
    .put(function (req, res) {
        var user = req.user;
        const hash = Employee();
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
router.route('/companyDashboard/')
    .get(function (req, res) {
        console.log("Company ID", req.admin);
        Company.findOne({_id: "5793dc65d50cfd7a3cf075ff"}, function(err, data) {
            res.json(data);
            const companyID = data.companyID;
            return companyID
        });
    })

router.get('/timecard', function(req, res){
    console.log(req.user.employeeID);
    Timecard.find({employeeID: req.user.employeeID},function(err, data){
        res.json(data);
    })
})
// Timepunch routes
router.post('/timecard', function(req, res){
    const time_punch = new Timecard();
    time_punch.clockIn = req.body.clockIn;
    time_punch.clockOut = req.body.clockOut;
    time_punch.day = req.body.day;
    time_punch.month = req.body.month;
    time_punch.year = req.body.year;
    time_punch.employeeID = req.body.employeeID;
    time_punch.save(function(err, data){
        if (err){
            return res.send(500, err);
        }
        return res.json(data);
    });
})
router.put('timecard', function(req, res){

    time_punch.clockOut = req.body.clockOut;
    time_punch.save(function(err, data) {
        if (err){
            return res.send(500, err);
        }
            console.log(data);
        return res.json(data);
    });
})
// Sick Form Router
router.get('/sickLeave', function(req, res){

    SickLeave.findOne({employeeID: req.user.employeeID}, function(err, data){
        res.json(data);
    })
})
router.post('/sickLeave', function(req, res){
    const sick_leave = new SickLeave();
    sick_leave.employeeID = req.body.employeeID;
    sick_leave.daysOutSick = req.body.days;
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
        console.log("GEt Company ID",companyID);
        Employee.find({companyID: companyID}, function(err, data){
            res.json(data);
        })
    })
module.exports = router;
