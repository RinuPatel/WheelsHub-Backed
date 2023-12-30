const express = require('express')
const router = express.Router()
const auth = require("../../../middlewares/auth")
const multer = require('multer')
const path = require('path');
const { v4: uuidv4 } = require('uuid')
const driverRegister = require("../../../model/driverRegister");
const { userInfo } = require('os');

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, path.join('/home/rp/Documents/Final_Project/car-rantals-backed/CarZone-Backed/public/ProfilePic'), function (error, success) {
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
router.patch("", auth, upload.single('image'), async (req, res) => {
    try {
        const id = req.user._id.toString();
        const updateData = req.body;
        const file = req.file;
        const userData = {};
        if(updateData.email){
            userData.email=updateData.email;
        }
        if(updateData.city){
            userData.city=updateData.city;
        }

        if(file){
            userData.image=file?.filename;
        }
        if(updateData.aadharNumber){
            userData.aadharNumber=updateData.aadharNumber;
        }
        if(updateData.licenceNumber){
            userData.licenceNumber=updateData.licenceNumber;
        }
        if(updateData.dob){
            userData.dob=updateData.dob;
        }
        if(updateData.panNumber){
            userData.panNumber=updateData.panNumber;
        }  
        if(updateData.screenType){
            userData.screenType=updateData.screenType
        }
        console.log("user id==>", userData);
        if (Object.keys(userData).length !== 0) {
            await driverRegister.findByIdAndUpdate(id, {$set:userData}, { new: true })
            res.send(JSON.stringify({
                status: 200,
                success: "true"
            }));
        } else {
            res.send(JSON.stringify({
                status: 400,
                type: "bad request",
                message: "Update details are empty",
            }))
        }
    } catch (error) {
        res.send(JSON.stringify({
            status: 500,
            type: "server error",

        }))
        console.log(error);
    }
})
module.exports = router