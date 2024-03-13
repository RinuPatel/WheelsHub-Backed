const express = require('express')
const route = express.Router()
const auth = require("../../../middlewares/auth")
const multer = require('multer')
const path = require('path');
const listOfCar = require("../../../model/listOfCar")
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        // const pathname = path.join('/home/rp/Documents/Final_Project/car-rantals-backed/CarZone-Backed/public/carImage')
        const pathname = path.join(__dirname, "..", "..", "..", "..", "public", "carImage")
        console.log("my path", pathname);
        // cd(null, path.join(pathname), function (error, success) {
        //     if (error) {
        //         throw error;
        //     }
        // })
        cd(null, pathname);
    },

    filename: function (req, file, cb) {
        const name = uuidv4();
        // console.log("my image name ==>",file)
        cb(null, name, function (error, success) {
            if (error) throw error;
        });
    }
});
const checkFileType = function (file, cd) {
    const fileTypes = /jpeg|jpg|png|gif|svg|webp/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // console.log("my extension name ===>", extName)
    // console.log("my files ===>", file)

    const mimeType = fileTypes.test(file.mimeType);
    // console.log("my extension file ===>", mimeType)

    if (extName || mimeType) {
        return cd(null, true);
    } else {
        cd("Error: You can only upload images")
    }
}
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cd) => {
        checkFileType(file, cd)
    }
})



route.patch("/", auth, upload.array('image'), async (req, res) => {
    try {
        const user = req.user;
        const updateData = req.body
        const files = req.files;
        let carId;
        // const carObjectId = new ObjectId(carId)
        if(ObjectId.isValid(req.query.carId)){
            carId = new ObjectId(req.query.carId)
        }
        let imageURL = [];
        if (files && files.length > 0) {
            imageURL = req.files.map(file => {
                return `${file.filename}`
            })
        } else {
            const existingCar = await listOfCar.findById(carId)
            if (existingCar) {
                imageURL = existingCar.images; // Use existing image URLs
            }
        }

        const result = await listOfCar.updateOne(
            { _id: carId },
            { $set: { ...updateData, image: imageURL } }
        )


        console.log("car id==>", carId,result);
        res.send(JSON.stringify({
            status:200,
            type:"Success"
        }))
    } catch (error) {
        console.log("error ==>", error);
        res.send(JSON.stringify({
            status:500,
            type:"error"
        }))
    }
})

module.exports = route;