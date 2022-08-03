const {body} = require('express-validator')
const User = require('../models/user')

module.exports = [
    body('user')
    .custom(async (user,{req})=> {
        const signedUpUser = await User.findById(user)
        if(!signedUpUser){
            console.log(signedUpUser)
            return Promise.reject('Please Fill up the signup form')
        }
        
    }),
    body('name')
    .isLength({min:2,max:30})
    .withMessage('Please Enter your full name')
    // .custom((name,{req})=> {
    //     console.log(req.body.name)
    //     if(!req.body.name){
    //         return Promise.reject('Please Enter your full name')
    //     }
    // })
    
]