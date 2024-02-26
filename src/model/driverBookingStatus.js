const mongoose = require('mongoose');


const driverBookingStatus=mongoose.Schema({

    padding:{
        type: number,
        require:true
    },
    accepted :{
        type: number,
        require:true
    },
    cancel :{
        type:number,
        require:true
    }
})

const driverBokingStatus = new mongoose.model("driverBookingStatus",driverBookingStatus)
module.exports = driverBokingStatus;