const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Please provide content' });
    }

    const post = new Post({ content, user: req.user.id });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}