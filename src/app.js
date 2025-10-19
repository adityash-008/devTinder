const express = require('express')

const app = express()

app.use("/",(err,req,res,next) =>{
    if(err){
        console.log("Checking error...")
        res.status(500).send("Something went wrong")
    }
})

app.get("/user",(req,res) =>{
    try{
        throw new Error("hifsdjfknivdbfiishsdfh")       
    }
    catch(err){
        res.send("Contact Support")
    }
})




app.listen(3000,()=>{
    console.log("Server is listening on Port 3000... ")
});