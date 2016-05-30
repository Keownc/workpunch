'use-strict'
// Employee schema
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    employeeID: String,
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    company: String,
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);
