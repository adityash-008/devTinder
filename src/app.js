const express = require("express")
const dbConnect = require('./config/database')
const app = express();
const User = require("./models/user.js")

app.use(express.json()) //JSON -> JS object

app.post('/signup', async (req, res) => {

    console.log(req.body)
    const user = new User(req.body)

    try {
        await user.save()
        res.send("user Added Successfully!")
    } catch (err) {
        res.status(404).send("Something went wrong")
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
app.patch('/user', async (req,res) => {
    const userId = req.body.userId
    const dataToupdate = req.body

    try{
       await User.findByIdAndUpdate(userId,dataToupdate)
        res.send("User updated Successfully!")
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})


dbConnect()
    .then(() => {
        console.log("Database Connected Successfully!");
        app.listen(7777, () => {
            console.log("listening on port No. 7777...")
        })
    })
    .catch(() => {
        console.log("Database Connection Failed")
    })

