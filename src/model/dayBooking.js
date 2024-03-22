const { Mongoose } = require("mongoose");

const mongoose = require(mongoose);

const dayWise = mongoose.Schema({
    mon:{
        booking:Number
    },
    tue:{
        booking:Number  
    },
    web:{
        booking:Number 
    },
    thu:{
        booking:Number 
    },
    fri:{
        booking:Number 
    },
    sat:{
        booking:Number 
    },
    sun:{
        booking:Number 
    }
})

const dayBooking = new mongoose.model("dayBooking",dayWise)
module.exports = dayBooking;