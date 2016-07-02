'use-strict'
// Employee schema
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Employee Database schema
const employeeSchema = new mongoose.Schema({
    employeeID: String,
    firstName: String,
    lastName: String,
    fullname: String,
    username: String,
    password: String,
    email: String,
    companyID: String,
    company: String,
    position: String,
    description: String,
    avatar: String,
    employeeID: String,
    created_at: {type: Date, default: Date.now}
});

//Company Database schema
const companySchema = new mongoose.Schema({
    username: String,
    password: String,
    company: String,
    companyID: String,
    plan: String,
    branch: String,
    description: String
});

//Timepunch Database
const timecardSchema = new mongoose.Schema({
    employeeID: String,
    year: Number,
    month: Number,
    day: Number,
    clockIn: {type: Date, default: Date.now},
    clockOut: {type: Date, default: Date.now}
});

//SickLeave
const sickLeaveSchema = new mongoose.Schema({
    employeeID: String,
    daysOutSick: Number,
    slip: String,
});

// Methods
// Generate Hash
employeeSchema.methods.createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}
// checking if password is valid
employeeSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}
//EmployeeID Generator



mongoose.model('Employee', employeeSchema);
mongoose.model('Company', companySchema);
mongoose.model('SickLeave', sickLeaveSchema);
mongoose.model('Timecard', timecardSchema);
