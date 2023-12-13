const express = require('express');
const router = express.Router();
router.post("",async (req,res)=>{
    try {
        const data = req.body;
        console.log(data);
        res.send("hello");
    } catch (error) {
        console.log("my car error",error);
    }
})
module.exports = router