const express = require("express");
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/usercontroller");
const {authentication} = require("../middleware/auth");

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', authentication, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed', user: req.token });
});

module.exports = router;