const mongoose = require('mongoose');
const ListOfCars = require('./listOfCar');

const carBooking = mongoose.Schema({
    // id:{
    //     type:mongoose.Schema.Types.ObjectId,ref:'ListOfCars'
    // },
    from :{
        type: String,
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    package:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    carName:{
        type:String,
        require:true
    },
    totalPrice:{
        type:Number,
        require:true
    },
    phoneNo:{
        type:Number,
        require:true,
    },
    vehicalNo:{
        type:String,
        require:true,

    },
    bookId:{
        type:mongoose.Schema.ObjectId,
        require:true
    },
    time:{
        type:String,
        require:true
    }
})

const carBookings = new mongoose.model("carBookings",carBooking);
module.exports = carBookings;