const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//names & types as per mongodb mock data 
//can be subjected to change in future versions

//admin schema
const adminSchema = new Schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }

})
//users schema
const userSchema = new Schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }

})
//list schema
const listSchema = new Schema({
    listType: { type: String },
    beerID: { type: ObjectId },
    venueID: { type: ObjectId }

})
//contactUs schema
const contactUsSchema = new Schema({
    userID: { type: ObjectId, required: true },
    adminID: { type: ObjectId },
    qnContent: { type: String, required: true },
    qnAnswer: { type: String }

})
//report Account schema
const reportAccSchema = new Schema({
    userID: { type: ObjectId, required: true },
    adminID: { type: ObjectId },
    reason: { type: String },
    accStatus: { type: String }

})



const Admins = mongoose.model('Admins', adminSchema, 'Admin');
const Users = mongoose.model('Users', userSchema, 'users');
const Lists = mongoose.model('Lists', listSchema, 'List');
const ContactUs = mongoose.model('ContactUs', contactUsSchema, 'contactUs');
const ReportAcc = mongoose.model('ReportAcc', reportAccSchema, 'reportAcc');


// Export the schemas
module.exports = {
    Admins,
    Users,
    Lists,
    ContactUs,
    ReportAcc
};