'use-strict'
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuid = require('mongoose-uuid');
//Company Database schema
const companySchema = new mongoose.Schema({
    _id: false,
    username: String,
    password: String,
    company: String,
    company_id: String,
    plan: String,
    branch: String,
    description: String
});

// Methods
// Generate Hash
companySchema.methods.createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}
// checking if password is valid
companySchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}
// Use mongoose-uuid to Generate an id
companySchema.plugin(uuid.plugin);

mongoose.model('Company', companySchema);
