const express = require("express");
const router = express.Router();
const { createPost, getPosts, getPostById, updatePost, deletePost } = require("../controllers/postController");
const { authentication } = require("../middleware/auth");

router.post('/', authentication, createPost)
router.get('/', getPosts)
router.get('/:id', getPostById)

module.exports = router;