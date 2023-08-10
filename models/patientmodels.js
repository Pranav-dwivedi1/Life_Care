const mongoose = require("mongoose");


const patientModel = new mongoose.Schema({
    fullname: String,
    age: Number,
    mobile: Number,
    date: Date,
    gender: String,
    city: String,
    addres: String,
    

}); 

const patientlist = mongoose.model("patientlist" , patientModel);
module.exports = patientlist;  
