const {body} = require('express-validator')
const User = require('../models/user')

module.exports = [
    body('user')
    .custom(async (user,{req})=> {
        const signedUpUser = await User.findById(user)
        if(!signedUpUser){
            return Promise.reject('Please Fill up the signup form')
        }
        const profile = await Profile.findOne({user: req.user})
        if(profile){
            return Promise.reject('Profile Already Exists')
        }
        
    }),
    body('name')
    .isLength({min:2,max:30})
    .withMessage('Please Enter your full name')
    
]