const express = require("express")
const router = express.Router()
const auth = require("../../../middlewares/auth")
const driverBookingStatus = require("../../../model/driverBookingStatus")

router.get("/",auth,async(req,res)=>{
    try {
        const driver = req.user
        if(driver){

           const statusCount = await driverBookingStatus.findOne({driverId:driver._id},{_id:0,pending:1,accepted:1,cancel:1})
            console.log("driver",statusCount);
            res.send(JSON.stringify({
                status:200,
                data:statusCount
            }))
        }else{
            res.send(JSON.stringify({
                status:401,
                type:"something is wrong"
            }))
        }
    } catch (error) {
        console.log("my req",error);
        res.send(JSON.stringify({
            status:500,
            type:error
        }))
    }
})

module.exports = router;