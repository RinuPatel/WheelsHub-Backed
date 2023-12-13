const mongoose = require("mongoose")

const contact = mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    need:{
        type:String
    },
    message:{
        type:String,
        require:true
    }
})

const contactUs = new mongoose.model("contactUs",contact);
module.exports = contactUs;


