const express = require('express')

const app = express()

app.use('/user',
    (req,res,next) => {
    // res.send("Hello ji ")
    console.log("Route Handler 1")
    next()
},
 (req,res,next) =>{
    // res.send("Hello ji 2");
    console.log("Route Handler 2")
    next();
 }
 ,(req,res,next) =>{
    // res.send("Hello ji 3");
    next();
    console.log("Route Handler 3")
 });

app.listen(3000,()=>{
    console.log("Server is listening on Port 3000... ")
});