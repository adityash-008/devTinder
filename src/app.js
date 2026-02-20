const express = require("express");
const dbConnect = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

//All Routes
const authRouter = require('./routes/auth_router.js')
const profileRouter = require('./routes/profile_router.js')
const requestRouter = require('./routes/request_router.js')
const userRouter = require('./routes/user_router.js');


//Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser()) // Parse the req.cookies -> readable format
app.use(express.json()) //JSON -> JS object

//Handle /signUp, /logIn, /logOut Routes
app.use('/',authRouter)

//Handle all /profile routes
app.use('/profile',profileRouter)

//Handle all /request routes
app.use('/request',requestRouter)

//Handle user feed
app.use('/feed',userRouter)

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

