const {Schema, model} =require('mongoose')

const user = new Schema({
    username:{
        type:String,
        trim:true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },    
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Profile'
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]

},{timestamps: true})

const User = model('User', user)

module.exports = User