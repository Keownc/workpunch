'use-strict'
// Employee schema
const mongoose = require('mongoose');

//Employee Database schema
const employeeSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    companyID: String,
    company: String,
    position: String,
    description: String,
    avatar: String,
    created_at: {type: Date, default: Date.now},
    // timecards: {
    //     year: Number,
    //     month: Number,
    //     day: Number,
    //     clockIn: {type: Date, default: Date.now},
    //     clockOut: {type: Date, default: Date.now},
    // }
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

//SickLeave

mongoose.model('Employee', employeeSchema);
mongoose.model('Company', companySchema);
