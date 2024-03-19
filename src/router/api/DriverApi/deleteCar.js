const express = require('express')
const router = express.Router();
const listOfCar = require("../../../model/listOfCar")
router.delete("/",async(req,res)=>{
    try {
        const bodyRes = req.body;
        const carId = bodyRes.carId
        console.log("my cariddddd",bodyRes)
        if(bodyRes && bodyRes.carId){

            const findCar = await listOfCar.findOneAndDelete({_id:carId});
            console.log("car id===>",carId,findCar)
            res.send({
                status:200,
                type:"Success"
            })
        }else{

            res.send({
                status:401,
                message:"item can not found"
            })
        }

    } catch (error) {
        console.log("delete error",error)
        res.send({
            status:500,
            type:"error"
        })
    }
})
module.exports = router;