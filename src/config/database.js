const mongoose = require('mongoose')

const dbConnect = async () =>{
await mongoose.connect(
    'mongodb+srv://admin:admin7505@cluster0.hl08pbw.mongodb.net/devTinder'
)
}

module.exports = dbConnect