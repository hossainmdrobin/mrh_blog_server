const Profile = require('../models/profile')
const Post = require('../models/post')

exports.deletePost = async (req, res) => {
    try {
        console.log(req.params, req.info)
        const updataResponse = await Profile.findOneAndUpdate({ user: req.info._id }, { $pull: { posts: req.params.postId } })
        const deleteResponse = await Post.findByIdAndDelete(req.params.postId)
        console.log(updataResponse, deleteResponse)
        res.status(200).json({message:'Post Deleted'})
    }catch(e){
        console.log(e)
        res.status(500).json({message:'Insernal Server Error'})
    }
}