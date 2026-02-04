const express = require("express")
const dbConnect = require('./config/database')
const User = require("./models/user.js")
const bcrypt = require('bcrypt')
const validator = require('validator')
const {validateSignUpData} = require('./utils/validation.js')

const app = express();

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
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid) throw new Error("Invalid Credentials!")
        else{
            res.status(200).send("Successfully LoggedIn")
        }       

    }catch(err){
        res.status(400).send("ERROR: "+ err.message)
    }
})

// GET user by email
app.get('/user', async (req, res) => {
    const userEmail = req.body.email;

    try {
        const users = await User.find({ email: userEmail })

        if (users.length === 0) {
            res.status(400).send("User not FOUND")
        } else {
            res.send(users)
        }

    } catch (err) {
        res.status(400).send("Something went Wrong")
    }
})

//Feed API - GET/ feed - get all the users from the database
app.get('/feed',async (req,res) => {
    const allUsers = await User.find();

    try{
        res.send(allUsers)
    }catch(err){
        res.status(400).send("Something went wrong!")
    }
})

//Delete user API
app.delete('/user', async (req,res) => {
    const userId = req.body.userId;

    try{
       await User.findByIdAndDelete(userId)
        res.send("User deleted Successfully!")
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

//Update user API
app.patch('/user/:userId', async (req,res) => {
    const userId = req.params?.userId
    const dataToupdate = req.body

    const ALLOWED_UPDATES = ["photoUrl","about","skills"]
    const isUpdateAllowed = Object.keys(dataToupdate).every((k) =>
        ALLOWED_UPDATES.includes(k)
    )
    if(!isUpdateAllowed) res.status(400).send("Fields can't be Update!")

    try{
       await User.findByIdAndUpdate(userId,dataToupdate,{
        returnDocument: "after",
        runValidators: true,
       })
        res.send("User updated Successfully!")
    }catch(err){
        res.status(400).send("UPDATE FAILED!"+ err.message)
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

