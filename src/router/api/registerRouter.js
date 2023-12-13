const router = require('express').Router()
const regisModel = require("../../model/registration")
const jwt = require("jsonwebtoken")
const emailVal = require("../../utils/validetors/emailValidation")
const nameVal = require("../../utils/validetors/nameValidation")

router.post("/", async (req, res) => {
    try {
        let bodyRes = req.body;
        let password = bodyRes.password;
        let fname = bodyRes.fname
        let email = bodyRes.email;
        let gender =bodyRes.gender?bodyRes.gender:""
        let country = bodyRes.country?bodyRes.country:"";
       
        console.log("my req data ==>", password);
        if (nameVal(fname) && emailVal(email) ) {
            
            const registUser = new regisModel({
                fname: fname,
                email: email,
                password: password,
                phoneNo:bodyRes.phoneNo,
                gender:gender?gender:"",
                country:country?country:"",
            });
            console.log(`my registration data ${registUser}`);
            const token = await registUser.genrateingAutoToken();
            console.log("my token ===>", token)
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 6000),
                httpOnly: true
            })
            const saveData = await registUser.save();
            res.send(JSON.stringify({
                status:200,
                success: true,
                token: token
            }))
        }else{
            res.send("Something went worng");
            console.log("object");
        }

    } catch (error) {
        if (error.code === 11000) {
            res.send(JSON.stringify({
                status: 301,
                error: "email is already exsits"

            }));
        }
        console.log("my error in ====>", error);

        res.status(404).send("not found");
    }
});

router.options("/",(req,res)=>{
    res.status(200).send("ok")
})

module.exports = router;