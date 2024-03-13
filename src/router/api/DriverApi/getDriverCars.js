const express = require("express")
const router = express.Router()
const auth = require("../../../middlewares/auth")
const listOfCar = require("../../../model/listOfCar")
router.get("/",auth,async (req,res) =>{
    try {
        const driver = req.user;
        const driverId = driver._id
        const carsOfDriver = await listOfCar.find({driverId:driverId},{onStatus:0,isBooked:0})
        console.log("user driver==>",carsOfDriver);
        if(carsOfDriver){

            res.send(JSON.stringify({
                status:200,
                data:carsOfDriver
            }))
        }else{
            res.send(JSON.stringify({
                status:401,
                type:"success",
                message:"car is not found"
            }))
        }
    } catch (error) {
        res.send(JSON.stringify({
            status:500,
            type:"error"
        }))
    }
})

module.exports = router;