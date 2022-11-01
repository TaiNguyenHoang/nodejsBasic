import express from "express";
import bodoParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebroutes from './route/web';
import connectDB from './config/connectDB'
import initApiRouter from "./route/APIroute";
// import cors from 'cors'


require("dotenv").config();

let app = express();
// app.use(cors({ origin: true}));


// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



// config app to user like req.body

// app.use(bodoParser.json());
// app.use(bodoParser.urlencoded({ extended: true }))



// tăng giới hạn limit file upload, vì express chỉ giới hạn 1mb nếu ta k cấu hình
app.use(bodoParser.json({ limit: '50mb'}));
app.use(bodoParser.urlencoded({  limit: '50mb',extended: true }))

viewEngine(app);
initWebroutes(app);

// API 
initApiRouter(app)

connectDB()

let port = process.env.PORT || 8999;
app.listen(port, () => {
    console.log('backend NODEJS is running on the port: ', + port)
})
