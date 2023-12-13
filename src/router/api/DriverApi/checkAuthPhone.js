const express = require('express');
const router = express.Router()
const auth = require("../../../middlewares/auth")
router.get("",auth,async(req,res)=>{
    try {
        let username = req.user.fname
        let userData = req.user.phone;

        console.log("user",username);
        if(userData){
            res.send(JSON.stringify({
                staus:200,
                success:"true",
                username:username
            })) 
        }else{
            res.send(JSON.stringify({
                staus:401,
                error:"unauthorized"
            }))
        }
        
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({
            status:501,
            error:"true"
        }))
    }
    
})
module.exports = router