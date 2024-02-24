const router = require('express').Router()
const auth = require('../../middlewares/auth')
const regiter = require('../../model/registration')
const bcrypt = require("bcrypt")

router.patch("", auth, async (req, res) => {
    try {
        // console.log("my update user",req.user);
        const id = req.user._id.toString();
        const updateDetails = req.body;
        console.log("my update user data", req.body.password);
        const password = req.body.password;
        if (Object.keys(updateDetails).length !== 0) {

           
                const updateData = await regiter.findByIdAndUpdate(id, updateDetails, { new: true })
                console.log("updates user",updateData);
    
                res.send(JSON.stringify({
                    status: 200,
                    type: "success",
    
                }))
            
            
        } else {
            res.send(JSON.stringify({
                status: 400,
                type: "bad request",
                message: "Update details are empty",
            }))
        }
    } catch (error) {
        res.send(JSON.stringify({
            status: 500,
            type: "server error",

        }))
        console.log("some error", error);
    }

})

module.exports = router;