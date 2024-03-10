const express = require('express')
const router = express.Router()
const auth = require("../../../middlewares/auth")
const driverRegister = require("../../../model/driverRegister")
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, path.join('public/ProfilePic'), function (error, success) {

            if (error) {
                throw error;
            }
        })
    },
    filename: function (req, file, cd) {
        const name = uuidv4();
        cd(null, name, function (error, success) {
            if (error) throw error;
        })
    }
})

const upload = multer({
    storage: storage
})

router.patch("/", upload.single('image'), auth, async (req, res) => {
    try {
        const user = req.user
        const id = req.user._id.toString();
        const updateInfo = req.body
        if(req.file){
            updateInfo.image = req.file.filename
        } else {
            // Remove the 'image' field from updateInfo so that it's not included in the update operation
            delete updateInfo.image;
        }
        
        
        const data = await driverRegister.findByIdAndUpdate(id, updateInfo, { new: true });
        console.log("my update response===>", data);
        // console.log("my body data ==>",updateInfo,req.file.filename);
        res.send(JSON.stringify({
            status:200,
            type:"Success"
        }))
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({
            status:500,
            type:"error"
        }));
    }
})
module.exports = router