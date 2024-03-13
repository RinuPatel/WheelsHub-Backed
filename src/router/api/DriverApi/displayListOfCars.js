const express = require('express');
const router = express.Router()
const carItem = require('../../../model/listOfCar')
const carBooking = require('../../../model/carBooking')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;


router.get("/", async (req, res) => {
    try {
        const reqParams = req.query;
        const reqBody = req.body;
        console.log("my reqParams", req)
        if (reqParams && reqParams.item_id) {
            const data = await carItem.findById(reqParams.item_id, {
                _id: 1, carName: 1, schedule: 1, exteriorColor: 1, interiorColor: 1, makeYear
                    : 1, registerYear: 1, fuelType: 1, trasmission: 1, city: 1, schedule: 1, image: 1, cartype: 1, vehicalNo: 1, phone: 1, seats: 1, onStatus: 1
            })
            res.send(data)
        } else if (reqBody && reqBody.city) {
            const { city,seats } = reqBody;
            // If 'city' is a single string, convert it to an array
            const cities = city && Array.isArray(city) ? city : [];
            console.log("my multi ===>", cities);
            const data = await carItem.find({ city: { $in: cities } }, {
                _id: 1, carName: 1, schedule: 1, exteriorColor: 1, interiorColor: 1, trasmission: 1, image: 1, city: 1, phone: 1, seats: 1, onStatus: 1
            })
            res.send(data)
        } else if (reqParams && reqParams.car_categary) {
            const data = await carItem.find({ carName: { $regex: reqParams.car_categary, $options: "i" } }, {
                _id: 1, carName: 1, schedule: 1, exteriorColor: 1, interiorColor: 1, trasmission: 1, image: 1, city: 1, phone: 1, seats: 1, onStatus: 1
            }).exec();
            res.send(data);
        } else {

            const currentDate = new Date();

            const hours = currentDate.getHours(); // Gets the current hour (0-23)
            const minutes = currentDate.getMinutes(); // Gets the current minutes (0-59)
            // const seconds = currentDate.getSeconds(); // Gets the current seconds (0-59)
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            const time24 = convertTo24Hour(formattedTime)
            // console.log("current date and Time", currentDate, time24);


            function getDateDiff(startDateISO, startTime, endDateISO, endTime) {
                // Parse the ISO 8601 date strings
                const startDateTime = new Date(startDateISO);
                const endDateTime = new Date(endDateISO);

                // Parse the time strings
                const [startHour, startMinute] = startTime.split(':').map(Number);
                const [endHour, endMinute] = endTime.split(':').map(Number);

                // Set the time portion to the parsed values
                startDateTime.setUTCHours(startHour, startMinute, 0, 0);
                endDateTime.setUTCHours(endHour, endMinute, 0, 0);

                console.log(startDateTime, endDateTime);

                if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
                    // Handle error: Invalid date or time format
                    console.error("Invalid date or time format");
                    return null;
                }

                const timeDifference = endDateTime - startDateTime;

                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                return { days, hours, minutes, seconds };
            }

            function convertTo24Hour(time) {
                time = time.toUpperCase();
                var hours = parseInt(time.substr(0, 2));
                if (time.indexOf('AM') != -1 && hours == 12) {
                    time = time.replace('12', '0');
                }
                if (time.indexOf('PM') != -1 && hours < 12) {
                    time = time.replace(hours, (hours + 12));
                }
                return time.replace(/(AM|PM)/, '');
            }
            const data = await carItem.find({}, {
                _id: 1, carName: 1, schedule: 1, exteriorColor: 1, interiorColor: 1, trasmission: 1, image: 1, city: 1, phone: 1, seats: 1, onStatus: 1
            })

            //   data[index].booking_  
            const carsWithBookingStatus = await Promise.all(data.map(async (car) => {
                const carId = car._id
                const bookingData = await carBooking.find({ bookId: carId }).sort({ DropDate: -1 }).limit(1)
                //  const bookingData = await carBooking.find({  bookId :carId})

                if (bookingData && bookingData.length > 0 && bookingData[0].status === "Accepted") {
                    // console.log("car data", bookingData);
                    const presentBooking = bookingData[0];
                    const endDate = new Date(presentBooking.DropDate)
                    const isBooked = currentDate < new Date(presentBooking.DropDate)
                    const timeDiffrent = presentBooking.DropDate - currentDate
                    const dayDiffrent = timeDiffrent / (1000 * 60 * 60 * 24)
                    const onAbl = getDateDiff(currentDate, time24, endDate, presentBooking.dropTime)

                    // console.log("car booking data", onAbl)
                    car.isBooked = isBooked
                    car.onAvailble = onAbl
                    await car.save()
                    return car
                } else {
                    car.isBooked = false
                    return car

                }
            }));
            // console.log("my data", carsWithBookingStatus);

            res.send(carsWithBookingStatus)

        }
    } catch (error) {
        console.log("My error ===>", error)
        res.status(400).send({
            error: error
        })
    }
})

module.exports = router