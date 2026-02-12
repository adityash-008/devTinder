const express = require('express')
const {sendRequest} = require('../controllers/request_controller')
const {userAuth} = require('../middlewares/auth')
const requestRouter = express.Router();

requestRouter
.post('/send/:status/:toUserId',userAuth,sendRequest)

module.exports = requestRouter