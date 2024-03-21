const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppConfig = require("../config/AppConfig")

const registerSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,

    },
    email:{
        type:String,
        require:true,
        unique: true,
        trime: true,
    },
    password:{
        type:String,
        require:true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})

registerSchema.methods.genrateingAutoToken = async function(res){
    try {
        const tokenGen = await jwt.sign({
            _id:this._id.toString(),

        },AppConfig.SECRET_KEY)
        this.tokens = this.tokens.concat({token:tokenGen})
        await this.save()
        return tokenGen
    } catch (error) {
        console.log("ganrate token error ==>", error)

    }
}
registerSchema.pre("save",async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
})


const AdminRegister = new mongoose.model("AdminRegister",registerSchema);
module.exports = AdminRegister;