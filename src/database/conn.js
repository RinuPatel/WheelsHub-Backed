const mongoose = require("mongoose");
const AppConfig=require("../config/AppConfig")
mongoose.connect(AppConfig.DATABASE_CONN,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`connection successfully`)
}).catch((e)=>{
    console.log(`not connect ${e}`)
})

