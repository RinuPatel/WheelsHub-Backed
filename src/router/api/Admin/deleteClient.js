const express = require('express')
const router = express.Router()
const register = require("../../../model/registration")
router.delete("/", async (req, res) => {
    try {
        const bodyRes = req.body;
        const clientID = bodyRes.userId;
        console.log("client id", bodyRes)
        if (bodyRes && clientID) {
            const deleteUser = await register.findOneAndDelete({ _id: bodyRes.userId })
            // const user = await register.find()
            console.log("my user",deleteUser);
            res.send(JSON.stringify({
                status:200,
                success : true,
                
            }))
        }else{
            res.send(JSON.stringify({
                status:404,
                Error: true
            }))
        }
       
    } catch (error) {
        res.send(JSON.stringify({
            status:500,
            Error : true
        }))
    }
})
module.exports = router;