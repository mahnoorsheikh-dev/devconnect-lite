require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.send('API working');
});

// DB connection
mongoose.connect(process.env.MongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));