'use-strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');
const moment = require('moment');


// GET: /appointments
router.get('/appointments', function(req, res, next) {
  Appointment.find()
    .then(function (appointments) {
      res.render('appointments/index', { appointments: appointments });
    });
});

// A route to get and save the user number
router.post('/appointments', function(req, res, next) {
    const appointment = new Appointment();
  appointment.first_name = req.body.first_name;
  appointment.ast_name = req.body.last_name;
  appointment.phone_number = req.body.phone_number;
  appointment.notification = req.body.notification;
  appointment.time_zone = req.body.time_zone;
  appointment.time = moment(req.body.time);
  appointment.save()
    .then(function () {
      res.redirect('/');
    });
});
module.exports = router;
