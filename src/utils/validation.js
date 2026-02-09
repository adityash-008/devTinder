const validator = require('validator')

const validateSignUpData = (req) =>{
    const {firstName, lastName, email, password} = req.body

    if(!firstName || !lastName){
        throw new Error("Enter required fields!");       
    }
    else if(!validator.isEmail(email)){
        throw new Error("Invalid Email Address!")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a Strong Password!")
    }
    
}

const validateEditProfileData = (req) =>{
    const {email, password} = req.body;
    if(email != undefined || password != undefined) throw new Error("Entered fields can't be updated!")
    else return true;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}