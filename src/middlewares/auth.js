const jwt = require('jsonwebtoken')
const register = require("../model/registration")
const driverRegister = require("../model/driverRegister")
const AppConfig = require("../config/AppConfig")

const auth = async (req,res,next)=>{
    try {
        const token = req.headers['token']
        // const token = req.cookies.jwt;

        // console.log("my token === > ",token)
        const verifyUser = jwt.verify(token,AppConfig.SECRET_KEY);//it is verify the token with my secrate key
        // console.log("my verifyUSer",verifyUser)
        const user = await register.findOne({_id:verifyUser._id}) || await driverRegister.findOne({_id:verifyUser._id})
        // console.log(user)
        req.token = token;
        req.user = user;
        req.user_id = verifyUser._id;
        next();

        // const token = req.header("token")
        // if (!token) {
        //     return res.status(401).json({message:"auth error"})
        // }
        // try {
        //     const decoded =jwt.verify(token,AppConfig.SECRET_KEY);
        //     req.user = decoded.user;
        //     next();
        // } catch (error) {
        //     res.status(500).send({message:"invalid token"})
        // }
    } catch (error) {
        res.status(401).send(error)
    }
}
module.exports = auth