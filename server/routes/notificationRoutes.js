const express = require('express');
const router = express.Router();
const { authentication } = require('../middleware/auth');
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require('../controllers/notificationcontroller');

router.get('/', authentication, getNotifications);
router.post('/:id/read', authentication, markAsRead);
router.post('/read-all', authentication, markAllAsRead);
router.delete('/:id', authentication, deleteNotification);

module.exports = router;
