const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')

exports.commentPostController = (req, res) => {
    const comment = new Comment({
        post: req.params.postId,
        user: req.info._id,
        body: req.body.body
    })
    comment.save()
        .then(data => {
            Post.updateOne({ _id: req.params.postId }, { $push: { comments: data._id } })
                .then(data => {
                    if (data) res.status(200).send({ message: 'Comment posted. Please Reload to View' })
                })
                .catch(err => {
                    if (err) res.status(500).send({ message: 'Server error' })
                })
        })
        .catch(err => {
            if (err) res.status(500).send({ message: 'Server error' })
        })
}

exports.commentGetController =async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentId)
        res.status(200).send(comment)
    }catch{
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getCommentUser = async (req, res) => {
    if(req.params.userId != 'undefined'){
        const user = await User.findById(req.params.userId)
        res.status(200).send(user)
    }else{
        res.status(500).json({message:'Server Error'})
    }
    
}