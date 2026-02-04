const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        await mongoose.connect(
            'mongodb://127.0.0.1:27017/namasteNodeJS'
        )
    } catch(err) {
        console.error("DB Connection Error:", err.message)
        throw err
    }
}

module.exports = dbConnect