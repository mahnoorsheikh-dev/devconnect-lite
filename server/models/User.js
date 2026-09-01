const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    default: "Full-Stack Developer"
  },
  location: {
    type: String,
    default: "Remote"
  },
  workProgress: {
    type: Number,
    default: 72,
    min: 0,
    max: 100
  },
  skills: {
    type: [String],
    default: ["React", "Node.js", "MongoDB", "UI Design"]
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
