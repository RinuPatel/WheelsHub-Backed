const express = require('express')
const router = express.Router()
const auth = require("../../../middlewares/auth")
router.get("/", auth, async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            req.user.tokens = []
            res.clearCookie('jwt')
            await req.user.save()
            res.send(JSON.stringify({
                status: 200,
                success: true
            }))
        } else {
            res.send(JSON.stringify({
                error: "token is not exists"
            }))
        }
    
    } catch (error) {
        console.log(error);
    }
})
module.exports = router