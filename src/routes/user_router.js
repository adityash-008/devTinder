const express = require('express')
const { getFeed } = require('../controllers/user_controller.js')
const { userAuth } = require('../middlewares/auth')

const userRouter = express.Router();

userRouter.get('/', userAuth, getFeed)

module.exports = userRouter;