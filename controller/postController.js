const Profile = require('../models/profile')
const Post = require('./../models/post')


exports.postPostController = (req, res, next) => {
    const { title, body } = req.body
    const post = new Post({
        title,
        body,
        author: req.info._id
    })
    post.save()
        .then(data => {
            Profile.findOneAndUpdate(
                { user: req.info._id },
                { $push: { posts: data._id } })
                .then(data => {
                    if (data) {
                        res.status(200).json({ message: 'Post Created Successfully'})
                    }
                })
                .catch((err) => {
                    res.status(500).json({ message: 'Server Error. Please Cheack your connections and try again' })
                })

        })
        .catch(err => res.status(500).json({ message: 'Server Error. Please Cheack your connections and try again' }))
}

exports.postGetController =async (req, res) => {
    const posts = await Post.find({author:req.info._id})
    res.status(200).send(posts)
}

exports.getAllpostController = async (req, res)=> {
    try{
        const posts = await Post.find()
        console.log(posts)
        if(posts){
            res.status(200).send(posts)
        }
    }catch{
        res.status(500).json({message: 'Server Error'})
    }
}