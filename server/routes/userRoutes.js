const User = require("../models/User");
const express = require("express");
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/usercontroller");
const {authentication} = require("../middleware/auth");

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', authentication, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password') ;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ 
       id: user._id,
       name: user.name,
       email: user.email,
       createdAt: user.createdAt
       });
       
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;