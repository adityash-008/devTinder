const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
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
    },
    password: {
        type: String,
        required: true,
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
    },
    about: {
        type: String,
        default: "This is about user",
    },
    skills: {
        type: [String],
    }
},{timestamps: true})

module.exports = mongoose.model("User",userschema)