const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create ({
       name,
       email,
       password: hashedPassword
       });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};