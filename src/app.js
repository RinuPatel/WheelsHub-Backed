require("./database/conn");
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
// const cookieParser = require("cookie-parser");
const path = require("path");
const app = express()
const port = process.env.PORT || 8001;
app.use(bodyParser.json());//this is configration middlewer this is resposible to incoming  parse json  data 
// app.use(bodyParser.urlencoded({ extended: true }));//this is work to parse html form data into js object data
// app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ["http://localhost:3000","http://localhost:3001"],
    optionsSuccessStatus:200
}))
app.use(require('./router'))
app.use(express.static('public'));
app.post("/", (req, res) => {
    try {
        console.log("my req data ==>" ,req.body)
        res.send("hello world")
    } catch (error) {
        console.log("some error occur", error);
    }
})

app.use(express.json())
// app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {

    console.log("server is runing", port)
})
