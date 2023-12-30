const express = require('express');
const { route } = require('../contactUs');
const router = express.Router()
const driverRegister = require("../../../model/driverRegister")
router.post("", async (req, res) => {
    try {
        const bodyRes = req.body;
        const phone = bodyRes.phone;
        if (phone) {
            const userRegister = await driverRegister.findOne({ phone: phone })
            console.log(userRegister);
            if(userRegister){
                const token = await userRegister.genrateingAutoToken();
                res.send(JSON.stringify({
                    status:200,
                    token
                }))
            }else{

                res.send(JSON.stringify({
                    status:404,
                    type:"Bad responce"
                }));
            }

        }else{
            res.send(JSON.stringify({
                type:"not phone"
            }))
        }
        console.log(phone);
    } catch (error) {
        console.log(error);
    }


})

module.exports = router;