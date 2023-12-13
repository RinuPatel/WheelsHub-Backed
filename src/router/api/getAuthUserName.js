const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

router.get("",auth,async(req,res)=>{
    try {
        const username = req.user.fname
        res.send(JSON.stringify({
            status:200,
            username
        }))
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;