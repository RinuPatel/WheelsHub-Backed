const express = require('express')
const router = express.Router()
const carBookings = require('../../../model/carBooking')
router.get("",async(req,res)=>{
    try {

        const data = await carBookings.find({},{DropDate:1,dropTime:1,bookId:1})
        res.send(JSON.stringify({
            status:200,
            result:data
        }))
    } catch (error) {
        console.log(error);
    }
})
module.exports = router