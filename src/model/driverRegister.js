const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const AppConfig = require("../config/AppConfig")


const registerSchema = mongoose.Schema({
    fname:{
       type:String,
       require:true 
    },
    lname:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true,
        unique:true,
        sparse:true
    },
    email:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    aadharNumber:{
        type:String,
        require:true
    },
    licenceNumber:{
        type:String,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
    panNumber:{
        type:String,
        require:true
    },
    screenType:{
        type:Number,
        require:true
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }],
    
    


})

registerSchema.methods.genrateingAutoToken = async function(){
    console.log("my result",this);
    try {
        const tokenGen = await jwt.sign({
            _id:this._id.toString(),

        },AppConfig.SECRET_KEY);
        console.log("token",tokenGen);
        this.tokens = this.tokens.concat({token:tokenGen})
        await this.save()
        return tokenGen
    
    } catch (error) {
        console.log("ganrate token error ===>",error);
    }
}



const driverRegister = new mongoose.model("driverRegister",registerSchema);
module.exports = driverRegister