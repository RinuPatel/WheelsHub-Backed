const express = require('express')
const router = express.Router()
const auth = require("../../../middlewares/auth")
router.get("",auth,async(req,res)=>{
    try {
        const user = req.user;
        const userdetail = {
            aadharNumber:user.aadharNumber,
            image:user.image,
            licenceNumber:user.licenceNumber,
            dob:user.dob,
            panNumber:user.panNumber,
            username:user.fname
        }
        if(userdetail){

            res.send(JSON.stringify({
                status:200,
                data:userdetail,
                suceess:true
                
            }))
        }else{
            res.send(JSON.stringify({
                status:401,
                 type:"unAuthrizing"   
                
            }))
        }
            console.log(user);    
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({
            status:500,
             type:"error"   
            
        }))
    }
    
})
module.exports = router