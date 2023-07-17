const Profile = require('../models/profile')
const Post = require('../models/post')

exports.deletePost = async (req, res) => {
    try {
        const updataResponse = await Profile.findOneAndUpdate({ user: req.info._id }, { $pull: { posts: req.params.postId } })
        const deleteResponse = await Post.findByIdAndDelete(req.params.postId)
        res.status(200).json({ message: 'Post Deleted' })
    } catch (e) {
        res.status(500).json({ message: 'Insernal Server Error' })
    }
}

exports.updatePost = async (req, res) => {
    try {
        // const {title, body} = req.body
        const post = await Post.findByIdAndUpdate(req.params.postId, req.body)
        if (post) {
            res.status(200).json({ message: 'Post Updated Sucessfully' })
        }
    } catch {
        res.status(500).json({ message: 'Server Error' })
    }

}