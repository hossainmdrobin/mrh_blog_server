const Profile = require('../models/profile')

exports.getProfile =async (req,res,next) => {
    try {
        const profile = await Profile.findOne({ user: req.info._id })
        if(profile){
            req.profile = profile;
            next()
        }
    }catch{
        res.status(500).json({message:'Server Error'})
    }
}