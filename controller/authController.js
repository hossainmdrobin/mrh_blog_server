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
            console.log(errors.mapped())
            return res.status(400).json(errors.mapped())
        }

        hash = await bcrypt.hash(password, 11)
        const user = new User({ username, email, password: hash })
        const signedUpUser = await user.save()
        if (signedUpUser) {
            let token = await jwt.sign({ _id: signedUpUser._id, username: signedUpUser.username }, 'shhhhh');
            console.log(signedUpUser._id, token)
            res.status(200).send({ userId: signedUpUser._id, accessToken: token })
        }

    } catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
}


exports.loginAuthController = async (req, res, next) => {
    console.log(req.body)

    const errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty) {
        console.log(errors.mapped())
        res.status(500).json(errors.mapped())
    } else {
        const { email } = req.body
        const loggedInUser = await User.findOne({ email })
        if (loggedInUser) {
            let token = await jwt.sign({ _id: loggedInUser._id, username: loggedInUser.username }, 'shhhhh');
            res.status(200).send({ userId: loggedInUser._id, accessToken: token })
        }
    }
}

