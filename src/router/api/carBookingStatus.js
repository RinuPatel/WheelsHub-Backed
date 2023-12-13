const express = require("express");
const auth = require("../../middlewares/auth");
const carbookings = require("../../model/carBooking");
const listOfCars = require("../../model/listOfCar")
const router = express.Router()
router.get("/", auth, async (req, res) => {
    try {
        console.log("user name which is booking car", req.user)
        const userPhoneNo = req.user.phoneNo;
        console.log("user phone number ===>", userPhoneNo);
        const carBookingData = await carbookings.find({ phoneNo: userPhoneNo }, {
            phoneNo: 1

        })
        console.log("my carBooking Data===>", carBookingData)
        var userNo = ""
        const myAuthUser = carBookingData.map(elm => {
            userNo = elm.phoneNo

        })
        console.log("my elem", userNo, userPhoneNo);

        const result = await carbookings.aggregate([
            {
                $match: {
                    phoneNo: userPhoneNo // The condition for matching products
                },
            },
            {
                $lookup: {
                    from: "listofcars",
                    localField: "bookId",
                    foreignField: "_id",
                    as: "data",
                    // pipeline: [
                    //     {
                    //       $match: {
                    //         phoneNo: userPhoneNo // The condition for matching products
                    //       }
                    //     }
                    //   ]
                },

            },

        ]);
        console.log("my result ===>", result)
        if (userNo === userPhoneNo) {
        }

        const bookingDetails = result.map(bookings => {
            return {
                from: bookings.from,
                carName: bookings.carName,
                date: bookings.date,
                package: bookings.package,
                totalPrice: bookings.totalPrice,
                driveNO: bookings.data[0].phone
            }
        })
        res.send(JSON.stringify({
            status: 200,
            type: "success",
            bookingDetails
        }))



    } catch (error) {
        console.log("this is bookig Status error", error)
    }
})

module.exports = router