const {body} = require('express-validator')
const User = require('../models/user')

module.exports =  [
    body('email')
    .isEmail()
    .withMessage('Please Provide a valid Email')
    // .custom(async email => {
    //     let user = await User.findOne({email})
    //     if(user){
    //         return Promise.reject('Email already Used')
    //     }
    // }),
,
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
    
