const express = require('express')
const router = express.Router()
const listOfCar = require("../../../model/listOfCar")
const auth = require("../../../middlewares/auth")

router.get("/",auth,async (req,res)=>{
    try {
        const user = req.user;
        const userId = user._id;
        const driverCar = await listOfCar.find({driverId:userId},{onStatus:1})
        console.log("my status car",driverCar);
        res.send(JSON.stringify({
            status:200,
            data:driverCar
        }))
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({
            status:500,
            type:"error"    
        }))
    }
})
module.exports = router