'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');
const moment = require('moment');

// A route to get and save the user number
router.post('/notification', function(req, res, next) {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;
  const notification = req.body.notification;
  const time_zone = req.body.time_zone;
  const time = moment(req.body.time, "MM-DD-YYYY hh:mma");

  const appointment = new Appointment({ first_name: first_name, last_name: last_name, phone_number: phone_number, notification: notification, time_zone: time_zone, time: time });
  appointment.save()
    .then(function () {
      res.redirect('/');
    });
});
module.exports = router;
