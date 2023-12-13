const express = require('express')
const router = express.Router()
const auth = require("../../middlewares/auth")
const bcrypt = require('bcrypt');
const regiter = require("../../model/registration")

router.post("/",auth,async (req,res)=>{
    const user = req.user
    const username = req.user.fname
    const id = user._id;
    console.log("my current user===>",username);
    const oldPassword = req.body.password;
    const newPassword = req.body.newPassword;
    const matchPass = await bcrypt.compare(oldPassword,user.password)//compare my old password
    if(matchPass){
        const myNewPassword = await bcrypt.hash(newPassword,10);
        console.log("my new password",myNewPassword);
        const saveDb = await regiter.updateOne(
            {_id:id},
            {$set:{password:myNewPassword}}
        )
        // user.password = myNewPassword;
        console.log("user new password",saveDb);
        res.send(JSON.stringify({
            status:200,
            username:username,
            type:"success"
        }));
    }else{

        res.send("something went wrong")
    }

})
module.exports = router;