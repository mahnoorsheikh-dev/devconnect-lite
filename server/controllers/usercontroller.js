const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create ({
       name,
       email,
       password: hashedPassword
       });
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {

     if (error.code === 11000) {
    return res.status(400).json({ message: "Email already exists" });
  }
  
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};



exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }     
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}