const Profile = require("../models/profile");
const User = require("../models/user");
const { success, fail } = require("../utils/resFormate");
const Post = require("./../models/post");

exports.postPostController = (req, res, next) => {
  const { title, body } = req.body;
  const post = new Post({
    title,
    body,
    author: req.info._id,
  });
  post
    .save()
    .then((data) => {
      Profile.findOneAndUpdate(
        { user: req.info._id },
        { $push: { posts: data._id } }
      )
        .then((data) => {
          if (data) {
            res.status(200).json({ message: "Post Created Successfully" });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message:
              "Server Error. Please Cheack your connections and try again",
          });
        });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Server Error. Please Cheack your connections and try again",
      })
    );
};

exports.postGetController = async (req, res) => {
  const posts = await Post.find({ author: req.info._id })
    .populate({ path: "comments", populate: "user" })
    .populate({ path: "author", populate: "profile" })
    .sort({ createdAt: "-1" });
  res.status(200).send(posts);
};

exports.getAllpostController = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: "comments", populate: {path:"user",populate:"profile"} })
      .populate({ path: "author", populate: "profile" })
      .sort({ createdAt: "-1" });
    if (posts) {
      res.status(200).send(posts);
    }
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.AddBookmarkController = async (req, res) => {
  try {
    const { postId } = req.params;
    if (req.user?.bookmarks?.includes(postId)) {
      await User.findByIdAndUpdate(req.info._id, {
        $pull: { bookmarks: req.params.postId },
      });
      return res
        .status(200)
        .json(success("Removed from bookmarks", { status: "removed" }));
    }
    const profile = await User.findByIdAndUpdate(req.info._id, {
      $push: { bookmarks: req.params.postId },
    });
    if (profile) {
      res.status(200).json(success("Added to bookmarks", { status: "added" }));
    }
  } catch (e) {
    res.status(500).json(fail(e.message));
  }
};

//The below middleware returns profile by taking user id as request
//It shouldn't be here but by mistake I kept.
exports.getBookmarkedPost = async (req, res) => {
  try {
    const posts = await Post.find({
      _id: { $in: req.user.bookmarks },
    })
      .populate({ path: "comments", populate: "user" })
      .populate({ path: "author", populate: "profile" });
    if (posts) {
      res.status(200).send(posts);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.findPostByItsId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate({ path: "comments", populate: "user" })
      .populate({ path: "author", populate: "profile" });
    if (post) {
      res.status(200).send(post);
    }
  } catch {
    res.status(500).json({ message: "server error" });
  }
};
