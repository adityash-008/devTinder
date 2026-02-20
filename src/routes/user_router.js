const express = require('express')
const { getFeed,viewConnections,viewReceivedRequests } = require('../controllers/user_controller.js')
const { userAuth } = require('../middlewares/auth')

const userRouter = express.Router();

userRouter
.get('/feed', userAuth, getFeed)
.get('/connections',userAuth, viewConnections)
.get('/requests/received',userAuth, viewReceivedRequests)


module.exports = userRouter;