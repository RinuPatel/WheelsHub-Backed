const express = require("express")
const router = express.Router()
const carBooking = require("../../../model/carBooking")
const listOfCar = require("../../../model/listOfCar")
const auth = require("../../../middlewares/auth")
const driverBokingStatus = require("../../../model/driverBookingStatus")
const income = require("../../../model/Income")



router.get("/", auth, async (req, res) => {
    try {
        const user = req.user
        const _id = user._id

        console.log("user driver number", _id)

        const findDriver = await listOfCar.find({ driverId: _id })
        let phone = ""
        let idArray = [];

        console.log("car book detail", findDriver)
        findDriver.forEach(element => {
            phone = element.phone
            const _id = element._id
            idArray.push(_id)

        })
        console.log("driver phone==>", idArray)

        let pendingStatusCounter = 0;
        let cancelStatusCounter = 0;
        let acceptStatusCounter = 0;
        const driverId = _id;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed, so we add 1
        const currentYear = currentDate.getFullYear();
        console.log("user phone number===>",user.phone,phone);
        if (user.phone === phone) {
            const data = await carBooking.find({ bookId: { $in: idArray } })
                console.log("user number==>",data);
            const monthlyIncomeDate = data.reduce((acc, booking) => {
                console.log("object", booking);
                if (booking.status !== "Cancel") {

                    const month = booking.pickupDate.getMonth() + 1;
                    const year = booking.pickupDate.getFullYear()
                    const key = `${month}-${year}`;
                    
                    acc[key] = acc[key] || { month, year, totalIncome: 0, driverId };
                    acc[key].totalIncome += booking.totalPrice;
                    console.log("key value===>",acc[key]);



                }
                return acc;
            }, {})
            const monthlyIncomeArray = Object.values(monthlyIncomeDate);
            // console.log("object,=======>", monthlyIncomeArray);
            const existingDriver = await income.find({ driverId: _id })
            const existingMonths = existingDriver.map(item => item.month);

            if (existingDriver.length > 0) {
                for (const monthlyIncome of monthlyIncomeArray) {

                    const { month, totalIncome } = monthlyIncome;
                    if (existingMonths.includes(month)) {
                        console.log("my month",month,existingMonths,currentMonth);
                        console.log("totalIncome", monthlyIncome.totalIncome);
                       const data =  await income.updateOne(
                            { driverId: _id, month: month },
                            { $set: { totalIncome: monthlyIncome.totalIncome } }
                        );
                        console.log("my update income",data);
                    }else{
                        await income.create({
                            driverId: _id,
                            month,
                            totalIncome
                        });
                    }
                }
            } else {

                await income.insertMany(monthlyIncomeArray)
            }
            // console.log("my all booking", existingDriver);





            data.forEach(async (ele) => {
                try {
                    //    console.log("my booking data", ele.pickupDate)



                    if (ele.status === 'pending') {
                        pendingStatusCounter++;
                    }
                    if (ele.status === 'Cancel') {
                        cancelStatusCounter++;
                    }
                    if (ele.status === 'Accepted') {
                        acceptStatusCounter++;
                    }
                    return pendingStatusCounter, cancelStatusCounter, acceptStatusCounter;
                } catch (error) {
                    console.log(error);
                }


            })
            // console.log("pending " + pendingStatusCounter + " cancel " + cancelStatusCounter + " accept  " + acceptStatusCounter);
            const driverBookingStatusIdExist = await driverBokingStatus.findOne({ driverId: _id })
            if (driverBookingStatusIdExist) {
                driverBookingStatusIdExist.pending = pendingStatusCounter;
                driverBookingStatusIdExist.cancel = cancelStatusCounter;
                driverBookingStatusIdExist.accepted = acceptStatusCounter;

                await driverBookingStatusIdExist.save()
            } else {

                const driverStatusCouter = new driverBokingStatus({
                    pending: pendingStatusCounter,
                    accepted: acceptStatusCounter,
                    cancel: cancelStatusCounter,
                    driverId: _id
                })
                // console.log("my driverid also exist", driverBookingStatusIdExist);
                await driverStatusCouter.save()
            }
            res.send(JSON.stringify({
                status: 200,
                data: data,
            }))
        } else {
            res.send(JSON.stringify({
                status: 401,
                type: "not fond"
            }))
        }


    } catch (error) {
        console.log(error)
        res.send(JSON.stringify({
            status: 500,
            type: "Something went wrong"
        }))
    }
})
module.exports = router