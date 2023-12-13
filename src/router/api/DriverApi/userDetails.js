const { error } = require('console');
const express = require('express')
const router = express.Router();
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const driverRegister = require("../../../model/driverRegister")
const jwt = require("jsonwebtoken")
const auth = require("../../../middlewares/auth")

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, path.join('//home/rp/Documents/Final_Project/car-rantals-backed/public/ProfilePic'), function (error, success) {

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
router.post("/", upload.single('image'), async (req, res) => {
    try {
        const reqBody = req.body;
        const files = req.file;
        const phone = reqBody.phone
        // console.log(files);
        // console.log(phone);
        if (phone) {

            const driverDetails = new driverRegister({
                phone: phone,
                fname: reqBody.fname ? reqBody.fname : "",
                lname: reqBody.lname ? reqBody.lname : "",
                email: reqBody.email ? reqBody.email : "",
                city: reqBody.city ? reqBody.city : "",
                image: files?.filename || "",
                aadharNumber: reqBody.aadharNumber ? reqBody.aadharNumber : "",
                licenceNumber: reqBody.licenceNumber ? reqBody.licenceNumber : "",
                dob: reqBody.dob ? reqBody.dob : "",
                panNumber: reqBody.panNumber ? reqBody.panNumber : ""
            });
            console.log("driver profile==>", driverDetails);
            const token = await driverDetails.genrateingAutoToken();
            console.log("my token", token);
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 6000),
                httpOnly: true
            })

            res.send(JSON.stringify({
                status:200,
                success: true,
                token: token
            }));
            const data = await driverDetails.save()
        }

    } catch (error) {
        console.log("error of driver Register", error);
    }


})
module.exports = router;