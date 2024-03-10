const express = require('express')
const router = express.Router()
const auth = require("../../../middlewares/auth")
const listOfCars = require("../../../model/listOfCar")

router.patch("/", auth, async (req, res) => {
    try {
        const user = req.user;
        const userId = user._id;
        const bodyRes = req.body;
        console.log("my body data", bodyRes);
        const userCar = await listOfCars.updateMany({ driverId: userId }, { $set: { onStatus: bodyRes.onStatus } });
        console.log("my user name", userCar);
        res.send(JSON.stringify({
            status:200,
            type:"success"
        }))
    } catch (error) {
        console.log("object");
    }
})

module.exports = router;