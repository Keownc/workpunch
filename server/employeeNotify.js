'use-strict'
const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');
// Create a worker function to query the database for upcoming appointments and sends reminders
const notificationWorkerFactory =  function(){
  return {
    run: function(){
      Appointment.sendNotifications();
    }
  };
};

module.exports = notificationWorkerFactory();
