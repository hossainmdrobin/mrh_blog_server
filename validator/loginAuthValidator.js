const { body } = require('express-validator')
const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = [
    body('email').normalizeEmail().custom(async (email, {req}) => {
        const user = await User.findOne({email})

        if(!user){
            return Promise.reject('You do not have an account. Please Create one')            
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        
        if(!isMatch){
            return Promise.reject('Password is Incorrect')
        }
    })

]