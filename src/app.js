const express = require('express')
const {adminAuth} = require('./middlewares/auth.js')
const app = express()

app.use('/admin',adminAuth)

app.get('/user',(req,res) => {
    res.send("User Login");
})

app.get('/admin/getUserData',(req,res) => {
    res.send("All Data sent");
})


app.listen(3000,()=>{
    console.log("Server is listening on Port 3000... ")
});