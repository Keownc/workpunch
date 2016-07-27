'use-strict'
// Employee schema
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuid = require('mongoose-uuid');
//Employee Database schema
const employeeSchema = new mongoose.Schema({
    _id: false,
    employee_ID: String,
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    email: String,
    company_ID: String,
    company: String,
    position: String,
    description: String,
    avatar: String,
    created_at: {type: Date}
});

//Timepunch Database
const timecardSchema = new mongoose.Schema({
    employee_ID: String,
    year: {type: Date},
    month: {type: Date},
    day: {type: Date},
    clock_in: {type: Date},
    clock_out: {type: Date}
});

//SickLeave
const sickLeaveSchema = new mongoose.Schema({
    employee_ID: String,
    days_out_sick: Number,
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
employeeSchema.methods.createID = function(company){
    const number = function(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return number() + number() + number()
}
employeeSchema.plugin(uuid.plugin);


mongoose.model('Employee', employeeSchema);
mongoose.model('SickLeave', sickLeaveSchema);
mongoose.model('Timecard', timecardSchema);
