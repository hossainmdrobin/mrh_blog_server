const {Schema, model} =require('mongoose')

const user = new Schema({
    username:{
        type:String,
        required: true,
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
    }

},{timestamps: true})

const User = model('User', user)

module.exports = User