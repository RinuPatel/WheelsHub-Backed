const router = require('express').Router()
const userRegister = require("../../model/registration")
const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
    try {
        const reqBody = req.body
        console.log("my login data =>", reqBody)
        const loginEmail = reqBody.email;
        const loginPassword = reqBody.password;
        const userLogin = await userRegister.findOne({ email: loginEmail })
        console.log("My user login dat", userLogin)
        const isPass = await bcrypt.compare(loginPassword, userLogin.password)
        console.log("my password", isPass);
        const token = await userLogin.genrateingAutoToken();
        // console.log("my token here ", token)
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 30000),
            httpOnly: true
        })
        if (isPass) {
            res.send(JSON.stringify({
                status: 200,
                token
            }))
            return token;
        } else {
            res.status(400).send("not found");
        }
    } catch (error) {
        console.log("My response ===>", error)
        res.status(500).send("some error curror");
    }
})

module.exports = router


