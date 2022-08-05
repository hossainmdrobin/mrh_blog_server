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
                        res.status(200).json({ message: 'Post Created Successfully' })
                    }
                })
                .catch((err) => {
                    res.status(500).json({ message: 'Server Error. Please Cheack your connections and try again' })
                })

        })
        .catch(err => res.status(500).json({ message: 'Server Error. Please Cheack your connections and try again' }))
}

exports.postGetController = async (req, res) => {
    const posts = await Post.find({ author: req.info._id })
    res.status(200).send(posts)
}

exports.getAllpostController = async (req, res) => {
    try {
        const posts = await Post.find()
        console.log(posts)
        if (posts) {
            res.status(200).send(posts)
        }
    } catch {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.AddBookmarkController = async (req, res,) => {
    try {
        const profile = await Profile.findOneAndUpdate({ user: req.info._id }, { $push: { bookmarks: req.params.postId } })
        if (profile) {
            res.status(200).send({ message: 'Added to bookmarks' })
        }
    } catch {
        res.status(500).json({ message: 'Server Error' })
    }
}

//The below middleware returns profile by taking user id as request
//It shouldn't be here but by mistake I kept.
exports.getBookmarkedPost = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.info._id })
        if (profile) {
            res.status(200).send(profile.bookmarks)
        }
    } catch {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.findPostByItsId = async (req, res) => {
    try {
        console.log(req.params.postId)
        const post = await Post.findById(req.params.postId)
        if (post) {
            res.status(200).send(post)
        }
    }
    catch {
        res.status(500).json({ message: 'server error' })
    }
}