const express = require("express")
const res = require("express/lib/response")
const router = express.Router()
const auth = require("../../middlewares/auth")

router.get("/" ,auth,async = (req,res)=>{
try {
    const userName = req.user.fname
    console.log("user id",req.user.fname);

    if (req.token) {
        res.send(JSON.stringify({
            status:"ok",
            sucess:"true",
            fname : userName
        }));
        return true
    }else{
      res.send("token is not match");
    }
} catch (error) {
    console.log("user login or not error",error)
    res.status(400).send({
        error: "something went wrong"
    })
}
})

module.exports = router