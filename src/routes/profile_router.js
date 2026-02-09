const express = require('express');
const {viewUserProfile, editUserProfile} = require('../controllers/profile_controller');
const {userAuth} = require('../middlewares/auth')

const profileRouter = express.Router();

profileRouter
.get('/view', userAuth, viewUserProfile)
.patch('/edit', userAuth, editUserProfile)

module.exports = profileRouter;