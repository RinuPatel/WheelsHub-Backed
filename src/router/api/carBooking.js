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
            const packageValue = reqBody.package;
            const rent = reqBody.price
            const hourse = packageValue.substring(packageValue,2)
            const totalRent = rent*hourse
            console.log("my drive time",rent,hourse);

            const bookDetails = new carBookingSchema({
                from: reqBody.from,
                date:reqBody.date,
                package:reqBody.package,
                price:reqBody.price,
                carName:reqBody.carName,
                totalPrice:totalRent,
                phoneNo:req.user.phoneNo,
                vehicalNo:reqBody.vehicalNo,
                bookId:reqBody.bookId,
                time:reqBody.time
            })
            console.log("my booking data",bookDetails);
            await bookDetails.save()
            if(bookDetails){

                res.send(JSON.stringify({
                    status:200,
                    type:"success"
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