const express = require('express')
const router = express.Router()
const auth = require("../../../middlewares/auth")
const carBooking = require("../../../model/carBooking")
const listOfCar = require("../../../model/listOfCar")

router.patch("/", auth, async (req, res) => {
    try {
        const user = req.user;
        const reqParams= req.query;
        const bookId = reqParams.bookId;
        const reqBody = req.body
        console.log("user driver number", reqBody)
        if(reqParams && bookId){
            const updateReq ={status:reqBody.status}
            const result = await carBooking.findByIdAndUpdate(bookId,{$set:updateReq},{new:true})
            // await carBooking.save()
            console.log(result);
            res.send(JSON.stringify({
                status:200,
                type:'success'
            }))
        }else{
            res.send(JSON.stringify({
                status:401,
                type:'error'
            })) 
        }
        
    } catch (error) {
        res.send(JSON.stringify({
            status:500,
            type:'error'
        }))
    }
})
module.exports = router;