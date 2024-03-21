const express = require('express')
const router = express.Router();
const AdminRegister = require("../../../model/adminRegister")
router.post("/",async(req,res)=>{
    try {
        const bodyRes = req.body;
        const register = new AdminRegister({
            username:bodyRes.username,
            email:bodyRes.email,
            password:bodyRes.password
        })
        const token = await register.genrateingAutoToken()
        res.cookie("jsWenToken",token,{
            expires: new Date(Date.now() + 6000),
                httpOnly: true
        })
        await register.save()
        console.log("req body==>",register,token)
        res.send(JSON.stringify({
            status:200,
            success: true,
            token: token
        }))
    } catch (error) {
        console.log(error)
    }
})
module.exports = router