const jwt = require('jsonwebtoken')
const User = require('../models/user')
const mongoose = require('mongoose')

const userAuth = async (req,res,next) =>{
    try{ 
    //Read the token from the client
    const cookies = req.cookies
    const {token} = cookies
    if(!token) throw new Error("Please Login Again!")

    //Validate the token 
    const decodedMessage = await jwt.verify(token,"privateKey")
    const {_id} = decodedMessage
    //Search the user
    const user = await User.findById(_id)
    if(!user) throw new Error("User not Found!")

    req.user = user; //Sending back the user fn. to the handler
    next()
    }catch(err){
        res.status(400).send("Error: "+err.message)
    }
    
}

module.exports = {
    userAuth,
}