const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .populate('actor', 'name avatar')
      .populate('subject')
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      recipient: req.user.id,
      read: false,
    });

    res.status(200).json({
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid notification ID' });
    }

    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    )
      .populate('actor', 'name avatar')
      .populate('subject');

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, read: false },
      { read: true }
    );

    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid notification ID' });
    }

    await Notification.findByIdAndDelete(id);

    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createNotification = async (recipientId, actorId, type, subject, subjectModel, message) => {
  try {
    // Don't notify user about their own actions
    if (recipientId.toString() === actorId.toString()) {
      return null;
    }

    // Check if notification already exists (for follows, likes)
    if (['follow', 'like_project', 'like_post'].includes(type)) {
      const existing = await Notification.findOne({
        recipient: recipientId,
        actor: actorId,
        type,
        subject,
      });

      if (existing && !existing.read) {
        return existing;
      }
    }

    const notification = await Notification.create({
      recipient: recipientId,
      actor: actorId,
      type,
      subject,
      subjectModel,
      message,
    });

    return await notification.populate('actor', 'name avatar');
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};
