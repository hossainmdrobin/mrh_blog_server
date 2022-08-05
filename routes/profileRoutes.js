const router = require('express').Router()
const profilePostValidator = require('./../validator/profilePostValidator')
const path = require('path')
const multer = require('multer')
const isAuth =require('../controller/isAuth')
const {
    profilePostController,
    addFriendController,
    profileGetController,
    getUnAddedProfile
} = require('./../controller/profileController')
const { getProfile } = require('../controller/controllerMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './uploads')
    },
    filename: (req, file, cb)=> {
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") + "-" + Date.now();
        cb(null, fileName + fileExt)
    }
})
const upload = multer({
    storage:storage,
    limits: {
        fileSize: 5000000
    },
    fileFilter:(req, file, cb )=> {
        if(
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg' 
        ){
            cb(null, true)
        }else{
            cb(new Error('Only .jepg, .pnj or jpeg allowed !'))
        }
    }
})

router.post('/', upload.single("profilePic"),profilePostValidator,profilePostController)
   
router.get('/',isAuth, profileGetController)
router.get('/getUnaddedProfile', isAuth ,getProfile , getUnAddedProfile)
router.get('/addFriend/:profileId', isAuth, addFriendController)




module.exports = router;