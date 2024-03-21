const express = require("express")
const router = express.Router()
const auth = require("../../../middlewares/auth")
router.get("/",auth,async(req,res)=>{
    try {
        const user = req.user;
        console.log("my admin",user)
        if(user){
            req.user.tokens = []
            res.clearCookie("jsWebToken");
            await req.user.save()
            res.send(JSON.stringify({
                status:200,
                type:"success"
            }))
        }else{
            res.send(JSON.stringify({
                error: "token is not exists"
            }))  
        }
    } catch (error) {
        console.log(error)
        res.send("some error occur");

    }
})
module.exports = router;