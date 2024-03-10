const mongoose = require('mongoose');


const driverBookingStatus=mongoose.Schema({

    pending:{
        type: Number,
        require:true
    },
    accepted :{
        type: Number,
        require:true
    },
    cancel :{
        type:Number,
        require:true
    },
    driverId:{
        type:mongoose.Schema.ObjectId,
        require:true,
        sparse:true
    }
})

const driverBokingStatus = new mongoose.model("driverBookingStatus",driverBookingStatus)
module.exports = driverBokingStatus;