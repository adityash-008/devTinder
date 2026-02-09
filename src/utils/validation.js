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



module.exports = {
    validateSignUpData,
}