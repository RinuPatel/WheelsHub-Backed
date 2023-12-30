const express = require('express');
const router = express.Router()
const carItem = require('../../model/listOfCar')

router.get("/", async (req, res) => {
    try {
        const reqParams = req.query;
        console.log("my reqParams", reqParams)
        if (reqParams && reqParams.item_id) {
            const data = await carItem.findById(reqParams.item_id, {
                _id: 1, carName: 1, schedule: 1, exteriorColor: 1, interiorColor: 1, makeYear
                    : 1, registerYear: 1, fuelType: 1, trasmission: 1, city: 1, admidName: 1, image: 1, cartype: 1, vehicalNo:1,phone:1,seats:1
            })
            res.send(data)
        } else if(reqParams && reqParams.city ) {
            const data = await carItem.find({ city: reqParams.city}, {
                _id: 1, carName: 1, schedule: 1, exteriorColor: 1, interiorColor: 1, trasmission: 1, image: 1, city: 1,phone:1,seats:1
            })
            res.send(data)
        }else if(reqParams && reqParams.car_categary){
            const data = await carItem.find({carName:{$regex:reqParams.car_categary,$options:"i"}}, {
                _id: 1, carName: 1, schedule: 1, exteriorColor: 1, interiorColor: 1, trasmission: 1, image: 1, city: 1,phone:1,seats:1
            }).exec();
            res.send(data);
        }else{
            const data = await carItem.find({}, {
                _id: 1, carName: 1, schedule: 1, exteriorColor: 1, interiorColor: 1, trasmission: 1, image: 1, city: 1,phone:1,seats:1
            })
            res.send(data) 
        }
    } catch (error) {
        console.log("My error ===>", error)
        res.status(400).send({
            error: "something went wrong"
        })
    }
})

module.exports = router