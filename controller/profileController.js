const Profile = require('../models/profile')
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
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

exports.profileGetController = async (req, res) => {
    const profile = await Profile.findOne({ user: req.info._id })
    res.status(200).send(profile)

}
