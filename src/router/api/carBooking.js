const express = require("express");
const router = express.Router()
const auth = require("../../middlewares/auth")
const carBookingSchema = require("../../model/carBooking")

router.post("/", auth, async (req, res) => {
    try {
        console.log("user name", req.user)
        const reqBody = req.body;
        if (req.user) {
            // console.log(req.user)
            const pickupDate = new Date(reqBody.pickupDate);
            const dropDate = new Date(reqBody.DropDate);
            const  DayPrice = reqBody.price
            // Calculate the difference in milliseconds
            // const differenceInMilliseconds = pickupDate - dropDate;
            
            console.log(pickupDate)
            // Calculate the difference in milliseconds
            const differenceInMilliseconds = Math.abs(pickupDate - dropDate);
        

            // Convert milliseconds to days
            const differenceInDays = Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000));
            const TotalPrice = differenceInDays*DayPrice 
            console.log("days",differenceInDays,TotalPrice)

            const bookDetails = new carBookingSchema({
                from: reqBody.from,
                pickupDate: reqBody.pickupDate,
                DropDate: reqBody.DropDate,
                price: reqBody.price,
                carName: reqBody.carName,
                totalPrice: TotalPrice,
                phoneNo: req.user.phoneNo,
                vehicalNo: reqBody.vehicalNo,
                bookId: reqBody.bookId,
                pickupTime: reqBody.pickupTime,
                dropTime: reqBody.dropTime
            })
            console.log("my booking data", bookDetails);
            await bookDetails.save()
            if (bookDetails) {

                res.send(JSON.stringify({
                    status: 200,
                    type: "success"
                }))
            }
        }
    } catch (error) {
        console.log("car booking error", error);
        res.send(JSON.stringify({
            type: "error"
        }))
    }

})

module.exports = router;