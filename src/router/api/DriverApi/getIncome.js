const express = require('express')
const router = express.Router()
const auth = require('../../../middlewares/auth')
const income = require('../../../model/Income')

router.get("/", auth, async (req, res) => {
    try {
        const user = req.user        
        const id = user._id;
        const driverIncome = await income.find({driverId:id},{month:1,totalIncome:1,_id:0})
        console.log("hmy driver booking",driverIncome);
        res.send(JSON.stringify({
            status:200,
            income:driverIncome
        }));
    } catch (error) {
        console.log("my error", error);
        res.send(JSON.stringify({
            status:500,
            type:"error"
        }))
    }
})

module.exports = router;