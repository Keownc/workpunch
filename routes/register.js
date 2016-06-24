// 'use strict';
//
// var mongoose = require('mongoose'),
//   Employee = mongoose.model('Employee'),
//   express = require('express'),
//   passport = require('passport'),
//   ObjectId = mongoose.Types.ObjectId;
// var app = express();
// /**
//  * Create user
//  * requires: {username, password, email}
//  * returns: {email, password}
//  */
// exports.create = function (req, res, next) {
//   var newUser = new User(req.body);
//   newUser.provider = 'local';
//
//   newUser.save(function(err) {
//     if (err) {
//       return res.json(400, err);
//     }
//
//     req.logIn(newUser, function(err) {
//       if (err) return next(err);
//       return res.json(newUser.user_info);
//     });
//   });
// };
//
// /**
//  *  Show profile
//  *  returns {username, profile}
//  */
// exports.show = function (req, res, next) {
//   var userId = req.params.userId;
//
//   Employee.findById(ObjectId(userId), function (err, user) {
//     if (err) {
//       return next(new Error('Failed to load User'));
//     }
//     if (user) {
//       res.send({username: user.username, profile: user.profile });
//     } else {
//       res.send(404, 'USER_NOT_FOUND')
//     }
//   });
// };
//
// /**
//  *  Username exists
//  *  returns {exists}
//  */
// exports.exists = function (req, res, next) {
//   var username = req.params.username;
//   Employee.findOne({ username : username }, function (err, user) {
//     if (err) {
//       return next(new Error('Failed to load User ' + username));
//     }
//
//     if(user) {
//       res.json({exists: true});
//     } else {
//       res.json({exists: false});
//     }
//   });
// }
//
// /**
//  * Session
//  * returns info on authenticated user
//  */
// exports.session = function (req, res) {
//   res.json(req.user.user_info);
// };
//
// /**
//  * Logout
//  * returns nothing
//  */
// exports.logout = function (req, res) {
//   if(req.user) {
//     req.logout();
//     res.send(200);
//   } else {
//     res.send(400, "Not logged in");
//   }
// };
//
// /**
//  *  Login
//  *  requires: {email, password}
//  */
// exports.login = function (req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     var error = err || info;
//     if (error) { return res.json(400, error); }
//     req.logIn(user, function(err) {
//       if (err) { return res.send(err); }
//       res.json(req.user.user_info);
//     });
//   })(req, res, next);
// }
//
// exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.send(401);
// }
