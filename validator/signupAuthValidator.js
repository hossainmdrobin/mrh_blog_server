const {body} = require('express-validator')
const User = require('../models/user')

module.exports =  [
    body('username')
    .isLength({min:2,max:15})
    .withMessage('Username must be greater than 2 and less than 16 character')
    .custom(async username => {
        let user = await User.findOne({username})
        if(user){
            return Promise.reject('Username Already Used')
        }
    }),
    body('email')
    .isEmail()
    .withMessage('Please Provide a valid Email')
    .custom(async email => {
        let user = await User.findOne({email})
        if(user){
            return Promise.reject('Email already Used')
        }
    }),

    body('password')
    .isLength({min:6})
    .withMessage('Password must be at least 6 character'),

    body('confirmPassword').custom((confirmPassword, {req}) => {
        if(confirmPassword != req.body.password){
            throw new Error('Password doesn\'t match')
        }
        return true
    })
]
    
