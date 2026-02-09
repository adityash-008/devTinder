const express = require('express')
const {userSignUp,userLogIn} = require('../controllers/auth_controller')

const authRouter = express.Router();

authRouter
.post('/signup',userSignUp)
.post('/login',userLogIn)

module.exports = authRouter;