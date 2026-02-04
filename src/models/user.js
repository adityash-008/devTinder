const mongoose = require('mongoose')
const validator = require('validator')

const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        
        trim: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Invalid E-mail Address!"+err)
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["Male","Female","Others"].includes(value)){
                throw new Error("Invalid field!")              
            }
        }
    },
    photoURL: {
        type: String,
        validate(value){
            if(!validator.isURL(value)) throw new Error("Invalid URL!"+err)
        }
    },
    about: {
        type: String,
        default: "This is about user",
    },
    skills: {
        type: [String],
        maxlength: 6,
    }
},{timestamps: true})

module.exports = mongoose.model("User",userschema)