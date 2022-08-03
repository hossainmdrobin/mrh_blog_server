const router = require('express').Router()
const isAuth = require('../controller/isAuth')
const { postPostController, postGetController, getAllpostController } = require('../controller/postController')

router.post('/', isAuth, postPostController)
router.get('/', isAuth, postGetController)
router.get('/getAllPost', getAllpostController)

module.exports = router