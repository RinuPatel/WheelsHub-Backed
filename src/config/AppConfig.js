require('dotenv').config();

const AppConfig = {
    DATABASE_CONN: "mongodb://localhost:27017/car-rantals",
    SECRET_KEY: process.env.SECRET_KEY
}

module.exports = AppConfig;