const express = require('express');
const router = express.Router()
const listOFCars = require("../../../model/listOfCar")
router.get("/",async(req,res)=>{
    try {
        const data = await listOFCars.find().count()
        console.log(data)
        res.send(JSON.stringify({
            status:200,
            data:data,
            type:"Success"
        }))
    } catch (error) {
        console.log(error)
        res.send(JSON.stringify({
            status:500,
            type:"Error"
        }))
    }
})
module.exports = router