const mongoose = require('mongoose')


const listOfCar = mongoose.Schema({

    carName: {
        type: String,
        require: true
    },
    schedule: {
        type: String,
        require: true
    },
    exteriorColor: {
        type: String,
        require: true
    },
    interiorColor: {
        type: String,
        require: true
    },
    makeYear: {
        type: Date,
        require: true
    },
    registerYear: {
        type: Date,
        require: true
    },
    fuelType: {
        type: String,
        require: true
    },
    trasmission: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    admidName: {
        type: String,
        require: true
    },

    image: {
        type: [String],
        require: true
    },
  
    vehicalNo: {
        type: String,
        require: true
    },
    phone:{
        type:Number,
        require:true,
        unique:true,
        sparse:true
    },
    seats:{
        type:String,
        require:true
    }
    ,driverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'driverRegister',
        required: true,
    }

})

const ListOfCars = new mongoose.model("ListOfCars", listOfCar)
module.exports = ListOfCars;