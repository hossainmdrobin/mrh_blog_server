const { 
    commentPostController, commentGetController, getCommentUser 
} = require('../controller/commentController');
const isAuth = require('../controller/isAuth');

const router = require('express').Router()

router.post('/add/:postId',isAuth, commentPostController)
router.get('/get/:commentId', commentGetController)
router.get('/user/:userId', getCommentUser)

module.exports = router;