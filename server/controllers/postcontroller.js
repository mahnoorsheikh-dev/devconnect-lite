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



exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('user', 'name email');
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}


exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    const post = await Post.findById(postId).populate('user', 'name email');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Server error" });
  }
}


exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Please provide content' });
    }
    post.content = content;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });  
  }
}


exports.deletePost = async (req, res) => {
  try {
    const postId  = req.params.id;
    if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    } 
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }   
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}


exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const userId = req.user.id;
    if (post.likes.some(id => id.toString() === userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);     
    }
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}


exports.commentPost = async ( req, res) => {
  try {
    const postId = req.params.id;
    if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    const post = await Post.findById(postId);
    if(!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Please provide content' });
    }
    const userId = req.user.id;
    post.comments.push({ content, user: userId });
    const updatedPost = await post.save();
    res.status(201).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });

  }
}


exports.deleteCommentPost = async (req, res) => {
  try {
    const {postId, commentId} = req.params;
    if (!postId.match(/^[0-9a-fA-F]{24}$/) || !commentId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid post or comment ID' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const comment = post.comments.find(c => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    post.comments = post.comments.filter(c => c._id.toString() !== commentId);

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}