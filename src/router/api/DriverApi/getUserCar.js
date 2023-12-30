const express = require('express');
const router = express.Router();
const auth = require("../../../middlewares/auth")
const listOfCar = require("../../../model/listOfCar")
router.get("", auth, async (req, res) => {
    try {
        const userData = req.user
        const userPhoneNumber = userData.phone
        console.log("my user data", userPhoneNumber)
        if (userPhoneNumber) {
            const phone= "8524154632"
            const userCars = await listOfCar.findOne({phone:phone});
            console.log("user car detail=>", userCars)
            // if (userCars && userCars.length > 0) {
            //     console.log("user car detail =>", userCars);
            //     res.json(userCars);
            // } else {
            //     console.log("No user cars found");
            //     res.status(404).send("User cars not found");
            // }
        }
        res.send(JSON.stringify({
            status:200,
            type:"success"
        }))
    } catch (error) {
        console.log("get user car ", error)
    }
})
module.exports = router