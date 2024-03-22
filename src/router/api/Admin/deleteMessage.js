const express = require('express');
const router = express.Router()
const contectus = require("../../../model/contactUs")
router.delete("/",async(req,res)=>{
    try {
        const bodyRes = req.body;
        const clientID = bodyRes.userId;
        console.log("client id", bodyRes)
        if (bodyRes && clientID) {
            const deleteUser = await contectus.findOneAndDelete({ _id: clientID})
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
        console.log(error);
        res.send(JSON.stringify({
            status:500,
            Error : true
        }))
    }
})
module.exports = router;