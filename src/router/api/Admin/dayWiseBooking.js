const express = require('express')
const router = express.Router()
const booking = require("../../../model/carBooking")
router.post("/", async (req, res) => {
    try {
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const TodayBooking = await booking.find({
            pickupDate: {
                $gte: startOfToday,
                $lt: endOfToday
            }
        }).count()

        console.log("mybooking", TodayBooking)
        console.log("date and time",startOfToday,endOfToday)
        res.send("hello")
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;