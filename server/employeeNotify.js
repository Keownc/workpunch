'use-strict'
const Appointment = require('../models/appointmentModel')
// Create a worker function to query the database for upcoming appointments and sends reminders
const notificationWorkerFactory =  function(){
  return {
    run: function(){
      Appointment.sendNotifications();
    }
  };
};

module.exports = notificationWorkerFactory();
