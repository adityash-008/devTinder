const express = require("express")
const dbConnect = require('./config/database')
const User = require("./models/user.js")
const bcrypt = require('bcrypt')
const validator = require('validator')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const {validateSignUpData} = require('./utils/validation.js')
const {userAuth} = require('./middlewares/auth.js')

const app = express();
app.use(cookieParser()) // Parse the req.cookies -> readable format
app.use(express.json()) //JSON -> JS object

//Create a new User in DB
app.post('/signup', async (req, res) => {

    try {
        validateSignUpData(req)
    // console.log(req.body)
    const {firstName,
        lastName,
        email,
        password,
        age,
        gender,
        about,
        skills} = req.body

        const hashPassword = await bcrypt.hash(password,10)
        // console.log(hashPassword) Prints hashPassword 

        const user = new User({
        firstName,
        lastName,
        email,
        password : hashPassword,
        age,
        gender,
        about,
        skills
        })
    
        await user.save()
        res.send("user Added Successfully!")
    } catch (err) {
        res.status(404).send("Error: "+ err.message)
    }
})

//Login API -> Takes email and password
app.post('/login',async (req,res) =>{
    try{
        const {email, password} = req.body
        if(!validator.isEmail(email)) throw new Error("Enter a valid E-mail Address!")
        
        const user = await User.findOne({email:email})
        if(!user){
            throw new Error("Invalid Credentials!")
        } 
               
        const isPasswordValid = await user.validatePassword(password) //User input pass

        if(!isPasswordValid) throw new Error("Invalid Credentials!")
        else{
            //Creating a JWT 
            const token = await user.getJWT()
            const expiryDate = new Date(Date.now() + 1000*60*60*24*7) //7 days
            res.cookie("token",token,{expires: expiryDate})
                        
            res.status(200).send("Successfully LoggedIn")
        }       

    }catch(err){
        res.status(400).send("ERROR: "+ err.message)
    }
})

//Profile API -> Takes cookie, verify JWT and return user profile/info.
app.get('/profile',userAuth,async (req,res,next) =>{
    try{
        const user = req.user
        res.status(200).send(user)
    }catch(err){
        res.status(404).send("ERROR: "+err.message)
    }
})

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

