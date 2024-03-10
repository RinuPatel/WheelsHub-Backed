const express = require('express')
const router = express.Router()
const register = require("../../../model/registration")
const driverRegister = require("../../../model/driverRegister")
router.get("/",async(req,res)=>{
    try {

        const clientCounter = await register.find().count()
        const driverCounter = await driverRegister.find().count()
        console.log("user Counter",clientCounter);
        res.send(JSON.stringify({
            status:200,
            client:clientCounter,
            driver:driverCounter
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