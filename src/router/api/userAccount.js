const router = require('express').Router()
const auth = require('../../middlewares/auth')
const register = require("../../model/registration")

router.get("/",auth,async(req,res)=>{
    // console.log("my user data",req.user);
    try {
        const id = req.user._id
        if(req.user){
            const data = await register.find({_id:id},{
                _id:1,fname:1,gender:1,email:1,phoneNo:1,country:1
            })
            
            res.send(JSON.stringify({
                status:200,
                data
            }))
            console.log("user",data);
        }else{
            console.log("some error occur..!");
            
        }
    } catch (error) {
        res.send(JSON.stringify({
            status:404,
            type:"error"
        }))
    }
   
})

module.exports = router;