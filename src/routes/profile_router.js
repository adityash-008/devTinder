const express = require('express');
const {viewUserProfile} = require('../controllers/profile_controller');
const {userAuth} = require('../middlewares/auth')

const profileRouter = express.Router();

profileRouter
.get('/view',userAuth,viewUserProfile)

module.exports = profileRouter;