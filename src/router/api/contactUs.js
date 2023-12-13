const express = require('express')
const router = express.Router()
const contact = require("../../model/contactUs")
const emailVal = require("../../utils/validetors/emailValidation")

router.post("",async(req,res)=>{
    try {
        const bodyRes = req.body;
        const fname = bodyRes.fname;
        const lname = bodyRes.lname;
        const email = bodyRes.email;
        const message = bodyRes.message;
        
        if(bodyRes && fname && lname && emailVal(email) && message){
            const contactUs = new contact({
                
                fname:bodyRes.fname,
                lname:bodyRes.lname,
                email:bodyRes.email,
                need:bodyRes.need?bodyRes.need:"",
                message:bodyRes.message
            })
            console.log("my res data ==>",contactUs);
            await contactUs.save()
            res.send(JSON.stringify({
                status:200,
                type:"success"
            }));
        }else{
            res.send(JSON.stringify({
                status:403,
                type:"something went wrong..!"
            }));
        }
       
    } catch (error) {
        console.log("contact us error===>",error);
        res.send(JSON.stringify({
            status:404,
            type:"error"
        }))
    }
})

module.exports = router;