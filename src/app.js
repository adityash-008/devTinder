const express = require("express")
const dbConnect = require('./config/database')
const app = express();
const User = require("./models/user.js")

app.post('/signup',async (req,res) => {
    const user = new User({
        firstName: "Virat",
        lastName: "Kohli",
        email: "virat@kohli.com",
        password: "Nothing",
        age: 21,
        gender: "Male"
    })

    try{
        await user.save()
    res.send("user Added Successfully!")
    }catch(err){
        res.send("Something went wrong")
    }
})




dbConnect()
.then(() =>{
    console.log("Database Connected Successfully!");
    app.listen(7777,() => {
    console.log("listening on port No. 7777...")
})
})
.catch(() =>{
    console.log("Database Connection Failed")
})

