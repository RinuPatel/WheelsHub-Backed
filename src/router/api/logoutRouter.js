const router = require("express").Router();
const auth = require("../../middlewares/auth")

// router.use(auth);

router.get("/", auth, async (req, res) => {
    try {
        console.log("user id", req.user);
        
        //for logout single device
        // req.user.tokens = req.user.tokens.filter((currElement) => {
        //     return currElement.token !== req.token
        // })

        //multi of device
        if (req.user) {
            req.user.tokens = [];
        res.clearCookie("LTK")
        console.log("clear success");
        await req.user.save()
        res.send(JSON.stringify({
            status : 200,
            success: true
        })) 
        }else{
            res.send(JSON.stringify({
               error : "token is not exists"
            }))
        }
       
    } catch (error) {
        res.send("some error occur");
        console.log("some error here", error)
    }
})

module.exports = router;