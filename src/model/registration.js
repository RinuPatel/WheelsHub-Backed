const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const AppConfig = require("../config/AppConfig");

const regisSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true, 
       
    },
    email: {
        type: String,
        require: 'Please enter your email',
        trime: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    gender: {
        type: String,
        department: String
    },
    country:{
        type:String,
      
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})
// const object={
//     tokens:["asdasd"]
// }

// object.tokens=[object.tokens, "asdasdasd"]

regisSchema.methods.genrateingAutoToken = async function (res) {
    console.log("My res ===>",res)
    try {
        const tokenGen = await jwt.sign({
            _id: this._id.toString(),
        }, AppConfig.SECRET_KEY);
        // this.tokens = [...this.tokens,...[{ token: tokenGen }]] 
        this.tokens =  this.tokens.concat({ token: tokenGen })
        await this.save()
        console.log("my secrate key",AppConfig.SECRET_KEY)
        return tokenGen;
        
    } catch (error) {
        console.log("ganrate token error ==>", error)
    }
}



regisSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        console.log(`tha pasword is a ${this.password}`)
    }
})

const Registration = new mongoose.model("Registration", regisSchema);
module.exports = Registration;