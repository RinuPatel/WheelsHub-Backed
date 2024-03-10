const express = require("express")
const router = express.Router()
const auth = require('../../../middlewares/auth');
const listOfCar = require("../../../model/listOfCar");
const carBooking = require("../../../model/carBooking")

router.get("/",auth,async(req,res)=>{
    try {
        const user = req.user;
        const driverId = user._id;
        const driverCars = await listOfCar.find({driverId:driverId})
        let isCarId = []
        if(driverCars){
            driverCars.forEach(element => {
                const id = element._id;
                isCarId.push(id)
                console.log("my driver car",element._id);
            });
        }
        const driverBooking = await carBooking.find({ bookId: { $in: isCarId } }).sort({pickupDate:-1}).limit(5)
        console.log("user ===>",driverBooking);


        res.send(JSON.stringify({
            status:200,
            type:"sucess",
            bookings : driverBooking
        }))
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({
            status:500,
            type:"error"
        }))
    }
})

module.exports = router;