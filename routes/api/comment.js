const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/commentController');
const jwtAuth = require('../../middleware/jwtAuth')

router.route('/')
.get(jwtAuth,commentController.getAllComment)
.post(commentController.createNewComment)

router.patch('/:postId', jwtAuth, commentController.updateCommentById)
router.delete('/:postId', jwtAuth, poscommentControllertController.deleteCommentById)

module.exports = router;