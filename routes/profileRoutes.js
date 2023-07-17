const router = require("express").Router();
const profilePostValidator = require("./../validator/profilePostValidator");
const multer = require("multer");
const isAuth = require("../controller/isAuth");
const path = require("path");
const {
  profilePostController,
  addFriendController,
  profileGetController,
  getUnAddedProfile,
  updateProfilePic,
  updateDetailController,
  getProfileById,
  getFriendsProfileById,
  deleteFriendController,
  getProfileByUserId,
} = require("./../controller/profileController");
const { getProfile } = require("../controller/controllerMiddleware");
const upload = require("../middleware/multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, `${path.__dirname}/../uploads`);
//   },
//   filename: (req, file, cb) => {
//     const fileExt = path.extname(file.originalname);
//     const fileName =
//       file.originalname
//         .replace(fileExt, "")
//         .toLowerCase()
//         .split(" ")
//         .join("-") +
//       "-" +
//       Date.now();
//     cb(null, fileName + fileExt);
//   },
// });
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5000000,
//   },
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only .jepg, .pnj or jpeg allowed !"));
//     }
//   },
// });

router.post(
  "/",
  upload("photos").fields([{ name: "image", maxCount: 3, quality: 60 }]),
  profilePostController
);
// router.post(
//   "/updateProfilePic",
//   isAuth,
//   upload.single("profilePic"),
//   updateProfilePic
// );
router.post("/updateDetail", isAuth, updateDetailController);

router.get("/getProfileById", isAuth, getProfileById);
router.get("/deleteFriend/:profileId", isAuth, deleteFriendController);
router.get("/getFriendsProfileById/:profileId", getFriendsProfileById);
router.get("/", isAuth, profileGetController);
router.get("/getUnaddedProfile", isAuth, getProfile, getUnAddedProfile);
router.get("/addFriend/:profileId", isAuth, addFriendController);
router.get("/getProfileByUserId/:userId", getProfileByUserId);

module.exports = router;
