const express = require('express');
const router = express.Router()

const {signupUser, loginUser} = require('../controllers/user-controller')


//signup route
router.post('/signup',signupUser)

//login route
router.post('/login',loginUser)

module.exports = router