const { Schema, model } = require('mongoose')

const profile = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500
    },
    profilePic: String,
    website: String,
    facebook: String,
    twitter: String,
    github: String,
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]

}, { timeseries: true })

const Profile = model('Profile', profile)

module.exports = Profile