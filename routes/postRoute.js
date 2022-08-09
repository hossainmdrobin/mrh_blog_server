const router = require('express').Router()
const isAuth = require('../controller/isAuth')
const {
    getProfile
} = require('../controller/controllerMiddleware')
const { 
    postPostController, 
    postGetController, 
    getAllpostController, 
    AddBookmarkController,
    getBookmarkedPost,
    findPostByItsId
} = require('../controller/postController')
const { deletePost, updatePost } = require('../controller/postControllerUD')

router.post('/', isAuth, postPostController)
router.get('/', isAuth, postGetController)
router.get('/getAllPost', getAllpostController)
router.get('/getBookmarkedPost',isAuth,getBookmarkedPost)
router.get('/bookmark/:postId',isAuth ,AddBookmarkController)
router.get('/findPostByItsId/:postId' ,findPostByItsId)

//  SEPERATE CONTROLLER FOR UPDATE AND DELETE
router.get('/delete/:postId', isAuth, deletePost)
router.post('/update/:postId',isAuth, updatePost)


module.exports = router