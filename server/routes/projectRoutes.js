const express = require('express');
const router = express.Router();
const { authentication } = require('../middleware/auth');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  likeProject,
  getProjectsByUser,
} = require('../controllers/projectcontroller');

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.get('/user/:userId', getProjectsByUser);

router.post('/', authentication, createProject);
router.put('/:id', authentication, updateProject);
router.delete('/:id', authentication, deleteProject);
router.post('/:id/like', authentication, likeProject);

module.exports = router;
