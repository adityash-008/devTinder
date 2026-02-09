const express = require("express");
const dbConnect = require('./config/database');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth_router.js')
const profileRouter = require('./routes/profile_router.js')
const {userAuth} = require('./middlewares/auth.js')

const app = express();
app.use(cookieParser()) // Parse the req.cookies -> readable format
app.use(express.json()) //JSON -> JS object

//Handle /signUp, /logIn, /logOut Routes
app.use('/',authRouter)

//Handle all /profile routes
app.use('/profile',profileRouter)

//Send connection Request API -> work only if user is Authenticated
app.post('/sendConnectionRequest',userAuth, (req,res,next) =>{
   try{
    const user = req.user
    res.status(200).send(user.firstName + " sent the friend request")
   }catch(err){
      res.send("ERROR: " + err.message)
   }
})

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

