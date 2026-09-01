const express = require("express");
const router = express.Router();
const { createPost, getPosts, getPostById, updatePost, deletePost, likePost, commentPost, updateCommentPost, deleteCommentPost } = require("../controllers/postController");
const { authentication } = require("../middleware/auth");

router.post('/', authentication, createPost)
router.get('/', getPosts)
router.get('/:id', getPostById)
router.put('/:id', authentication, updatePost)
router.delete('/:id', authentication, deletePost)
router.post('/:id/like', authentication, likePost)
router.post('/:id/comment', authentication, commentPost)
router.put('/:postId/comment/:commentId', authentication, updateCommentPost)
router.delete('/:postId/comment/:commentId', authentication, deleteCommentPost)
module.exports = router;