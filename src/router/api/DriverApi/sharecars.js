const express = require('express');
const router = express.Router();
router.post("",async (req,res)=>{
    try {
        res.send("hello");
        
    } catch (error) {
        console.log("my car error",error);
    }
})
module.exports = router;