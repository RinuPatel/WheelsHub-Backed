const express = require("express")
const listOfCarsModel = require("../../model/listOfCar")
const router = express.Router()
const multer = require('multer')
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const auth = require("../../middlewares/auth")
const driverRegister = require("../../model/driverRegister")
// console.log("my path",pathname);

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        const pathname = path.join(__dirname,'..','..','..','public','carImage')
        console.log(pathname);
        cd(null, path.join(pathname), function (error, success) {
            if (error) {
                throw error;
            }
        })
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

router.post("/",auth, upload.array('image'), async (req, res) => {
    try {
        const bodyRes = req.body;
        const driverFind = req.user
        const driverId = driverFind._id
        console.log("my req === >",req.body);
     
        const carName = bodyRes.carName;
        
        const files = req.files;
        if (carName) {
            const imageArray = files.map(file => file.filename)
            const carData = new listOfCarsModel({
                carName: carName,
                schedule: bodyRes.schedule,
                exteriorColor: bodyRes.exteriorColor,
                interiorColor: bodyRes.interiorColor,
                makeYear: bodyRes.makeYear,
                registerYear: bodyRes.registerYear,
                fuelType: bodyRes.fuelType,
                trasmission: bodyRes.trasmission,
                city: bodyRes.city,
                image: imageArray?imageArray:"",
                vehicalNo: bodyRes.vehicalNo,
                phone: bodyRes.phone,
                seats: bodyRes.seats,
                admidName: driverFind.fname,
                driverId:driverId
            })
            console.log("my cars data == >", carData);
            await carData.save();
            res.send(JSON.stringify({
                status: 200,
                success: "true"
            }));
        } else {
            res.status(400).send({ error: "something went wrong" });

        }
    } catch (error) {
        res.status(400).send({ error: "something went wrong" });
        console.log("my error here ===>", error);
    }

})
module.exports = router;