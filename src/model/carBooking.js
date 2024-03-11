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
    pickupDate:{
        type:Date,
        require:true
    },
    DropDate:{
        type:Date,
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
        require:true,
        sparse:true
    },
    pickupTime:{
        type:String,
        require:true
    },
    dropTime:{
        type:String,
        require:true
    },
   
    status: { type: String, enum: ['pending', 'Accepted','Cancel'], default: 'pending' },
    shareRent:{
        type:String,
        default:'No'
    }
})

const carBookings = new mongoose.model("carBookings",carBooking);
module.exports = carBookings;