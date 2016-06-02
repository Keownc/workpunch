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

const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    company: String,
    position: String,
    description: String
});

mongoose.model('User', userSchema);
mongoose.model('Profile', profileSchema);
