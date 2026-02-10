const express = require('express');
const {viewUserProfile, editUserProfile, changeUserPassword} = require('../controllers/profile_controller');
const {userAuth} = require('../middlewares/auth')

const profileRouter = express.Router();

profileRouter
.get('/view', userAuth, viewUserProfile)
.patch('/edit', userAuth, editUserProfile)
.patch('/password',userAuth,changeUserPassword)

module.exports = profileRouter;