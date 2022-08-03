const router = require('express').Router()
const signupAuthValidator = require('../validator/signupAuthValidator')
const loginAuthValidator = require('../validator/loginAuthValidator')
const {
    signupAuthController,
    loginAuthController
} = require('../controller/authController')


// ROUTE FOR SIGNUP
router.post('/signup',signupAuthValidator, signupAuthController)

// ROUTE FOR LOGIN
router.post('/login',loginAuthValidator, loginAuthController)

module.exports = router