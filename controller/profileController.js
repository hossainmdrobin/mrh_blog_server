const Profile = require("../models/profile");
const { validationResult } = require("express-validator");
const errorFormatter = require("./../utils/authValidationErrorFarmatter");
const fs = require("fs");
const User = require("../models/user");
const { fail, success } = require("../utils/resFormate");

exports.profilePostController = async (req, res, next) => {
  try {
    req.body.profilePic = req.files?.image[0].path;    
    const profile = new Profile(req.body);
    const createdProfile = await profile.save();
    await User.findByIdAndUpdate(req.body?.user, {
      profile: createdProfile._id,
    });
    res.status(200).json(success("Profile created", createdProfile));
  } catch (e) {
    res.status(500).json(fail(e.message));
  }
};

exports.profileGetController = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.info._id });
    res.status(200).send(profile);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUnAddedProfile = async (req, res) => {
  try {
    const profiles = await Profile.find();
    const friendlist = req.profile.friends;
    if (friendlist.length == 0) {
      return res.status(200).send(profiles);
    } else {
      for (let i = 0; i < friendlist.length; i++) {
        for (let j = 0; j < profiles.length; j++) {
          if (friendlist[i] === profiles[j]._id) {
            for (let k = j; k < profiles.length; k++) {
              profiles[k] = profiles[k + 1];
            }
          }
        }
      }
      res.status(200).send(profiles);
    }
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addFriendController = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.info._id },
      { $push: { friends: req.params.profileId } }
    );
    if (profile) {
      res.status(200).send({ message: "Added to friendlist" });
    }
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateProfilePic = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.info._id });
    if (profile) {
      const path = `./uploads/${profile.profilePic}`;
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.info._id },
      { $set: { profilePic: req.file.filename } }
    );
    if (updatedProfile) {
      res.status(200).json({ message: "Profile pic Saved" });
    }
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateDetailController = async (req, res) => {
  try {
    const obj = req.body;
    const profile = await Profile.findOneAndUpdate(
      { user: req.info._id },
      { $set: obj }
    );
    if (profile) {
      res.status(200).json({ message: "Profile Updated Successfully" });
    }
  } catch {
    res.status(500).json({ message: "server Error" });
  }
};

exports.getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.info._id });
    if (profile) {
      res.status(200).send(profile);
    }
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getFriendsProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId);
    if (profile) {
      res.status(200).send(profile);
    }
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteFriendController = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.info._id },
      { $pull: { friends: req.params.profileId } }
    );
    if (profile) {
      res.status(200).json({ message: "Removed from Friendlist" });
    }
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId });
    if (profile) {
      res.status(200).send(profile);
    }
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};
