const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');
const jwtAuth = require('../../middleware/jwtAuth')

router.route('/')
.get(jwtAuth,postController.getAllPost)
.post(postController.createNewPost)

router.patch('/:postId', jwtAuth, postController.updatePostById)
router.delete('/:postId', jwtAuth, postController.deletePostById)

module.exports = router;