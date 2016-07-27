'use-strict'
// Employee schema
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AppointmentSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    phone_number: String,
    notification : Number,
    time_zone : String,
    time : {type : Date, index : true}
});

AppointmentSchema.methods.requiresNotification = function (date) {
  return Math.round(moment.duration(moment(this.time).tz(this.time_zone).utc()
                          .diff(moment(date).utc())
                        ).asMinutes()) === this.notification;
};

AppointmentSchema.statics.sendNotifications = function(callback) {

  // now
  var searchDate = new Date();
  Appointment
    .find()
    .then(function (appointments) {
      appointments = appointments.filter(function(appointment) {
              return appointment.requiresNotification(searchDate);
      });
      if (appointments.length > 0) {
        sendNotifications(appointments);
      }
    });

    // Send messages to all appoinment owners via Twilio
    function sendNotifications(docs) {
        var client = new twilio.RestClient(cfg.twilioAccountSid, cfg.twilioAuthToken);
        // cCall every appointment coming up that requires a reminder to be sent
        docs.forEach(function(appointment) {
            // Create options to send the message
            var options = {
                to: "+" + appointment.phone_number,
                from: cfg.twilioPhoneNumber,
                body: "Hi " + appointment.first_name + appointment.first_last + ". Just a reminder that you are to be at work for  " + moment(appointment.time).calendar() +"."
            };

            // Send the message!
            client.sendMessage(options, function(err, response) {
                if (err) {
                    // Just log it for now
                    console.error(err);
                } else {
                    // Log the last few digits of a phone number
                    var masked = appointment.phone_number.substr(0,
                        appointment.phone_number.length - 5);
                    masked += '*****';
                    console.log('Message sent to ' + masked);
                }
            });
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
          callback.call(this);
        }
    }
};
mongoose.model('Appointment', AppointmentSchema);
