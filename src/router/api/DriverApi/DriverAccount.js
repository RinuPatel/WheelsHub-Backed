const express = require('express')
const router = express.Router()
const  auth = require("../../../middlewares/auth")
const driverRegister = require("../../../model/driverRegister")

router.get("/",auth,async(req,res)=>{
    try {
        const user = req.user;
        const driver = await driverRegister.findById({_id:user._id},{_id:0,tokens:0})
        console.log("user driver",driver);
        res.send(JSON.stringify({
            status:200,
            type:"success",
            data:driver
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