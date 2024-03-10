const mongoose = require('mongoose')
const driver = require('./driverRegister')

const incomedriver = new mongoose.Schema({
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'driver',
        sparse:true
    },
    month: Number,
    year: Number,
    totalIncome: Number
})

const income = new mongoose.model("income", incomedriver)
module.exports = income;