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
    // Create a new user in the employee schema
    const new_user = new Employee();
    new_user.username = req.body.username;
    new_user.password = new_user.createHash(req.body.password);
    new_user.first_name = req.body.firstName;
    new_user.last_name = req.body.lastName;
    new_user.email = req.body.email;
    new_user.company = req.body.company;
    new_user.employee_id =  new_user.createID();
    new_user.created_at = date;
    new_user.save(function(err, data){
        if (err){
            return res.send(500, err);
        }
        return res.json(data);
    });
    req.flash('success', 'You have succesfull registered');
});

// A Register route for companies
router.post('/companyRegister', function(req, res){
    // Create a new user in the company schema
    const new_company = new Company();
    new_company.branch = req.body.branch;
    new_company.company_id = req.body.companyID;
    new_company.company = req.body.company;
    new_company.username = req.body.username;
    new_company.password = new_company.createHash(req.body.password);
    new_company.save(function(err, data){
        if (err) { return res.send(500, err); }
        return res.json(data);
    });
})
// passpot local Strategy to sign the Employees
// Start a new LocalStrategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    //   Run a function to fine A user using the username field in the Employee schema
    Employee.findOne({ 'username': username }, function(err, user) {
        // Run an if statem to check for errors or if the user and their password matches
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
// Passport Strategy to sign in the
passport.use('signup-company',new LocalStrategy(
  function(username, password, done) {
      //   Run a function to fine A user using the username field in the Company schema
    Company.findOne({ 'username': username }, function(err, user) {
        // Run an if statem to check for errors or if the user and their password matches
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
    res.send(req.session);
});

//log out the Users
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
//  Employee Dashboard Route
router.route('/employeeDashboard/')
// Run a get request function to find the logged in user and return their information/data
    .get(function (req, res) {
        Employee.findOne({_id: req.user._id}, function(err, data) {
            res.json(data);
        });
    })
    // Run a put request Function to update the user's data
    .put(function (req, res) {
        var user = req.user;
        user.first_name = req.body.firstName;
        user.last_name = req.body.lastName;
        user.company = req.body.company;
        user.position = req.body.position;
        user.save(function(err, data) {
            if (err){
                return res.send(500, err);
            }
            return res.json(data);
        });
    })
    // Run a post request to add their avatar image
    .post(function (req, res) {
        var user = req.user;
        user.avatar = req.body.avatar;
        user.save(function(err, data) {
            if (err){
                return res.send(500, err);
            }
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
    time_punch.clock_in = req.body.clockIn;
    time_punch.clock_out = req.body.clockOut;
    time_punch.day = req.body.day;
    time_punch.month = req.body.month;
    time_punch.year = req.body.year;
    time_punch.employee_id = req.body.employeeID;
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

    SickLeave.find({employeeID: req.user.employeeID}, function(err, data){
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
        // console.log("GEt Session", req.session);
        // req.user.companyID
        Employee.find({companyID: "fullsail123"}, function(err, data){
            res.json(data);
        })
    })
module.exports = router;
