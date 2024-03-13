const { route } = require('./contactUs');

const router = require('express').Router()

router.use('/user-register',require('./registerRouter'));

router.use('/user-login',require('./loginRouter'));

router.use('/user-logout',require("./logoutRouter"));

router.use('/car-list',require('./listOfCarRouter'));

router.use('/display-carlist',require('./DriverApi/displayListOfCars'));

router.use('/check-login',require('./checkUserLogin'));

router.use('/car-booking' ,require('./carBooking'));

router.use('/car-booking-status',require('./carBookingStatus'));

router.use('/user-profile',require('./userAccount'));

router.use('/update-profile',require('./userUpdateAccount'));

router.use('/update-pass',require("./updatePassword"));

router.use('/getuser-name',require("./getAuthUserName"));

router.use('/conatct-us',require('./contactUs'));

//driver api

router.use('/driver-register',require("./DriverApi/userDetails"));

router.use('/demo',require('./demo'));

router.use("/check-auth-phone",require('./DriverApi/checkAuthPhone'));

router.use("/update-user",require("./DriverApi/updateUser"));

router.use("/login-user",require("./DriverApi/loginAuth"));

router.use("/get-userdetail",require("./DriverApi/getUserDetails"));

router.use("/nisha",require("./DriverApi/nisha"));

router.use("/get-usercar",require("./DriverApi/getUserCar"))

router.use("/car-booking-request",require('./DriverApi/CarBookingRequest'))

router.use("/logout-driver",require("./DriverApi/logoutDriver"))

router.use("/car-booking-status",require("./DriverApi/carBookingStatus"))

router.use('/getBooking-details',require("./DriverApi/getCarBookingDetails"))

router.use('/driver-req-status',require("./DriverApi/driverReqStatus"))

router.use("/driver-income",require("./DriverApi/driverIncome"))

router.use("/get-income",require("./DriverApi/getIncome"))

router.use("/online-offline-car",require("./DriverApi/onlineOffline"));

router.use("/get-statuscar",require("./DriverApi/getCarStatus"))

router.use("/user-couter",require("./DriverApi/CountUser"))

router.use("/recetly-booking",require("./DriverApi/recentlyBooking"));

router.use("/driver-account",require("./DriverApi/DriverAccount"));

router.use("/driver-account-update",require("./DriverApi/updateAccount"))

router.use("/get-driver-car",require("./DriverApi/getDriverCars"))

router.use("/update-car-data",require("./DriverApi/upatesCarData"))

module.exports = router;

