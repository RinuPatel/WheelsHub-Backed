const express = require('express')
const router = express.Router()
const contectus = require("../../../model/contactUs")
router.get("/",async (req,res)=>{
    try {
        const data = await contectus.find()
        if(data){
        res.send(JSON.stringify({
            status:200,
            type:"Success",
            data:data
        }))}else{
            res.send(JSON.stringify({
                status:404,
                type:"Data Not Found"
            }))
        }
    } catch (error) {
        console.log(error)
        res.send(JSON.stringify({
            status:500,
            type:"Error"
        }))
    }
})
module.exports = router;