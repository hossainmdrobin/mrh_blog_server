const Profile = require('../models/profile')
const User = require('../models/user')
const { validationResult } = require('express-validator')
const errorFormatter = require('./../utils/authValidationErrorFarmatter')

exports.profilePostController = (req, res, next) => {
    const reqObjKeyArr = Object.keys(req.body);

    const error = validationResult(req).formatWith(errorFormatter)
    if (!error.isEmpty) {
        return res.status(500).json(error.mapped())
    }

    let profileDetail = {}

    reqObjKeyArr.map(reqObjKey => {
        profileDetail[reqObjKey] = req.body[reqObjKey]
    })
    profileDetail.profilePic = req.file.filename;

    const profile = new Profile(profileDetail)
    profile.save()
        .then(data => res.status(200).send(data))
        .catch(err => console.log(err))
}

exports.profileGetController = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.info._id })
        res.status(200).send(profile)
    } catch {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getUnAddedProfile = async (req, res) => {
    const profiles = await Profile.find()
    console.log(profiles[0]._id)
    console.log(req.profile.friends)
    if (req.profile.friends.length == 0) {
        return res.status(200).send(profiles)
    }
}

exports.addFriendController = async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate({ user: req.info._id }, { $push: { friends: req.params.profileId } })
        if (profile) {
            res.status(200).send({ message: 'Added to friendlist' })
        }
    }catch{
        res.status(500).json({message:"Server Error"})
    }
}
