const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const adminResgiter = require("../../../model/adminRegister")
router.post("/",async(req,res)=>{
    try {
        const reqBody = req.body 
        const adminInfo = await adminResgiter.findOne({username:reqBody.username})
        const isPass = await bcrypt.compare(reqBody.password,adminInfo.password)
        const token = await adminInfo.genrateingAutoToken()
        console.log("first",isPass,token)
        res.cookie("jsWebToken", token, {
            expires: new Date(Date.now() + 30000),
            httpOnly: true
        })
        if(isPass){
            res.send(JSON.stringify({
                status: 200,
                token
            }))
            return token; 
        }else{
            res.status(400).send("not found");

        }
       
    } catch (error) {
        console.log(error)
        res.status(500).send("some error curror");

    }
})
module.exports = router