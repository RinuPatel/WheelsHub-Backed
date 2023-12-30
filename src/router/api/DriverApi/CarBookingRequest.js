const express = require("express")
const router = express.Router()
const carBooking = require("../../../model/carBooking")
const listOfCar = require("../../../model/listOfCar")
const auth = require("../../../middlewares/auth")
router.get("/", auth, async (req, res) => {
    try {
        const user = req.user.phone
        let bookId = ""
        console.log("user driver number",user)
        const carBookDetail = await carBooking.find()
        carBookDetail.forEach(element => {
            bookId = element.bookId;
            console.log("first", bookId)
            
        });
        const findDriver = await listOfCar.find({_id:bookId})
        let phone = ""
        let id = ""
        console.log("car book detail", findDriver)
        findDriver.forEach(element =>{
            phone = element.phone
            id = element._id
            console.log("driver phone==>",phone)
           
        })
        if(user === phone){
          const data =   await carBooking.find({bookId:id})
          console.log("my booking data",data)
          res.send(JSON.stringify({
            status:200,
            data:data
          }))
        }else{
            res.send(JSON.stringify({
                status:401,
                type:"not fond"
            }))
        }
        
        // console.log("car driver details",findDriver)
        // if(user){
        //     findDriver.map((car)=>{
        //         console.log("car data",car)
        //     })
        // }

       
    } catch (error) {
        console.log(error)
        res.send(JSON.stringify({
            status:500,
            type:"Something went wrong"
        }))
    }
})
module.exports = router