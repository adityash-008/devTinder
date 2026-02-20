const express = require('express')
const {sendRequest, reviewRequest} = require('../controllers/request_controller')
const {userAuth} = require('../middlewares/auth')
const requestRouter = express.Router();

requestRouter
.post('/send/:status/:toUserId',userAuth,sendRequest)
.post('/review/:status/:requestId',userAuth,reviewRequest)

module.exports = requestRouter