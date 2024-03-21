const express = require('express')
const router = express.Router()
const registerdriver = require("../../../model/driverRegister")

router.get("/",async(req,res)=>{
    try {
        const respons = await registerdriver.find().select("-tokens")
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