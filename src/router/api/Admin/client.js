const express = require('express')
const router = express.Router()
const register = require("../../../model/registration")

router.get("/",async(req,res)=>{
    try {
        const respons = await register.find().select("-password -tokens")
        console.log("first",respons)
        if(respons){

            res.send(JSON.stringify({
                status:200,
                type:"success",
                data:respons
            }))
        }else{
            res.send(JSON.stringify({
                status:404,
                type:"Data not found",
                
            })) 
        }
    } catch (error) {
        console.log(error)
        res.send(JSON.stringify({
            status:500,
            type:"error"
        }))
    }
})
module.exports = router;