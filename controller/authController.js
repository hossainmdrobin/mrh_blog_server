const User = require('../models/user')
const { validationResult } = require('express-validator')
const errorFormatter = require('../utils/authValidationErrorFarmatter')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.signupAuthController = async (req, res, next) => {
    const { username, email, password } = req.body

    try {
        const errors = validationResult(req).formatWith(errorFormatter)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.mapped())
        }

        hash = await bcrypt.hash(password, 11)
        const user = new User({ username, email, password: hash })
        await user.save().then(data => res.send(data))

    } catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
}


exports.loginAuthController = async (req, res, next) => {
    console.log(req.body)

    const errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty) {
        console.log(errors.mapped())
        res.status(400).json(errors.mapped())
    } else {
        const { email } = req.body
        const loggedInUser = await User.findOne({ email })
        console.log(loggedInUser)
        if (loggedInUser) {
            let token = await jwt.sign({ _id:loggedInUser._id, username:loggedInUser.username }, 'shhhhh');
            console.log(token)
            res.status(200).send({ userId: loggedInUser._id, accessToken:token })
        }
    }
}

