const express = require('express')
const router = express.Router()
const auth = require("../../../middlewares/auth")

router.post("/",auth,async(req,res)=>{
    try {
        
        res.send("hello")
    } catch (error) {
        console.log("my income side api error",error);
    }
})

module.exports = router;