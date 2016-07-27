'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');

// A route to get and save the user number
router.post('/notification', function(req, res, next) {
  var name = req.body.name;
  var phoneNumber = req.body.phoneNumber;
  var notification = req.body.notification;
  var timeZone = req.body.timeZone;
  var time = moment(req.body.time, "MM-DD-YYYY hh:mma");

  var appointment = new Appointment({ name: name, phoneNumber: phoneNumber, notification: notification, timeZone: timeZone, time: time });
  appointment.save()
    .then(function () {
      res.redirect('/');
    });
});
module.exports = router;
