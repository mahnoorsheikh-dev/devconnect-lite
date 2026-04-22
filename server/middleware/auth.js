const jwt = require('jsonwebtoken');

exports.authentication = (req, res, next) => {
   const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {

    
    return res.status(401).json({ message: 'No token provided' });
  } 

  let decoded;  

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.user = decoded;
  next();
}