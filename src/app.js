const express = require('express')

const app = express()

//This will only match the GET call to the "/user"
app.get(`/user`,(req,res) => {
    res.send({name:"Aditya Sharma",age:21})
})

app.post('/user',(req,res) => {
    //Saving data to the database
    res.send("Data Saved Successfully...")
})

app.delete('/user',(req,res)=> {
    res.send("Deleted Successfully")
})

//This will match all the http method API calls to the "/test" route
app.use("/test",(req,res) => {   
    res.send("This is the test route")
})

app.listen(3000,()=>{
    console.log("Server is listening on Port 3000... ")
});