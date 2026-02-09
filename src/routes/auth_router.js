const express = require('express')
const {userSignUp, userLogIn, userLogOut} = require('../controllers/auth_controller')

const authRouter = express.Router();

authRouter
.post('/signup',userSignUp)
.post('/login',userLogIn)
.post('/logout',userLogOut)

module.exports = authRouter;