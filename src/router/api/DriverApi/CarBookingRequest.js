const express = require("express")
const router = express.Router()
const carBooking = require("../../../model/carBooking")
const listOfCar = require("../../../model/listOfCar")
const auth = require("../../../middlewares/auth")
router.get("/", auth, async (req, res) => {
    try {
        const user = req.user
        const _id = user._id

        console.log("user driver number", _id)

        const findDriver = await listOfCar.find({ driverId: _id })
        let phone = ""
        let idArray = [];

        console.log("car book detail", findDriver)
        findDriver.forEach(element => {
            phone = element.phone
            const _id = element._id
            idArray.push(_id)

        })
        console.log("driver phone==>", idArray)
        if (user.phone === phone) {
            const data = await carBooking.find({ bookId: { $in: idArray } })
            console.log("my booking data", data)
            res.send(JSON.stringify({
                status: 200,
                data: data,
            }))
        } else {
            res.send(JSON.stringify({
                status: 401,
                type: "not fond"
            }))
        }


    } catch (error) {
        console.log(error)
        res.send(JSON.stringify({
            status: 500,
            type: "Something went wrong"
        }))
    }
})
module.exports = router