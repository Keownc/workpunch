var gcm = require('node-gcm');

var message = new gcm.Message({
    data: { key1: 'You have '+ ' before you are required to be at work!' }
});

// Set up the sender with you API key, prepare your recipients' registration tokens.
var sender = new gcm.Sender('AIzaSyCyndfBgmvfVFUamHK4KaSozjY2whnJ_TE');
var regTokens = ['595269837107'];

sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if(err) console.error(err);
    else 	console.log(response);
});
