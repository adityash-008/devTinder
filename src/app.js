const express = require('express')

const app = express()

app.use("/test",(req,res) => {   //Request Handler
    res.send("Hello from the test route!")
})

app.use("/",(req,res) => {   
    res.send("Hello from the Dashboard")
})
app.use("/test",(req,res) => {   
    res.send("Hello from the test route!")
})

app.use("/hello",(req,res) => {   
    res.send("Hello from the hello route!")
})

app.listen(3000,()=>{
    console.log("Server is listening on Port 3000... ")
});