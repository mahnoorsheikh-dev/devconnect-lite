const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUsers, getUserById, followUser } = require("../controllers/usercontroller");
const { authentication } = require("../middleware/auth");

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', authentication, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      location: user.location,
      workProgress: user.workProgress,
      skills: user.skills,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', getUsers);

router.put('/profile', authentication, async (req, res) => {
  try {
    const allowedFields = ['avatar', 'bio', 'role', 'location', 'workProgress', 'skills'];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (updates.workProgress !== undefined) {
      updates.workProgress = Math.min(100, Math.max(0, Number(updates.workProgress) || 0));
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      location: user.location,
      workProgress: user.workProgress,
      skills: user.skills,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/follow', authentication, followUser);

router.get('/:id', getUserById);

module.exports = router;