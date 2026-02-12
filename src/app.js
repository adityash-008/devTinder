const express = require("express");
const dbConnect = require('./config/database');
const cookieParser = require('cookie-parser');

//All Routes
const authRouter = require('./routes/auth_router.js')
const profileRouter = require('./routes/profile_router.js')
const requestRouter = require('./routes/request_router.js')


const app = express();
app.use(cookieParser()) // Parse the req.cookies -> readable format
app.use(express.json()) //JSON -> JS object

//Handle /signUp, /logIn, /logOut Routes
app.use('/',authRouter)

//Handle all /profile routes
app.use('/profile',profileRouter)

//Handle all /request routes
app.use('/request',requestRouter)

dbConnect()
    .then(() => {
        console.log("Database Connected Successfully!");
        app.listen(7777, () => {
            console.log("listening on port No. 7777...")
        })
    })
    .catch((err) => {
        console.log("Database Connection Failed",err)
    })

