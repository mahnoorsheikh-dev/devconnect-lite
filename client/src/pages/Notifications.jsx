import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import * as api from '../api/client';

export default function Notifications() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const result = await api.getNotifications(token);
        setNotifications(result.notifications || []);
        setUnreadCount(result.unreadCount || 0);
      } catch (err) {
        setError(err.message || 'Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token, navigate]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await api.markNotificationAsRead(notificationId, token);
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
      );
      if (unreadCount > 0) {
        setUnreadCount(unreadCount - 1);
      }
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.markAllNotificationsAsRead(token);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await api.deleteNotification(notificationId, token);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'follow':
        return '👤';
      case 'like_project':
        return '❤️';
      case 'like_post':
        return '❤️';
      case 'comment_post':
        return '💬';
      case 'comment_project':
        return '💬';
      default:
        return '🔔';
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification._id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar user={user} />
        <div className="mx-auto max-w-4xl px-4 py-10 text-slate-300">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar user={user} />
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Updates</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Notifications</h1>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:border-indigo-500"
            >
              Mark all read
            </button>
          )}
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-950/40 p-4 text-red-200">{error}</div>
        ) : notifications.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-slate-300">No notifications yet. Follow developers or like projects to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <button
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className={`w-full rounded-2xl border p-4 transition ${
                  notification.read
                    ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-900/70'
                    : 'border-indigo-500/30 bg-indigo-500/10 hover:border-indigo-500/50 hover:bg-indigo-500/15'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      {notification.actor?.avatar && (
                        <img
                          src={notification.actor.avatar}
                          alt={notification.actor.name}
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">{notification.actor?.name}</p>
                        <p className="text-xs text-slate-400">{notification.message}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                      {new Date(notification.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {!notification.read && <div className="h-2.5 w-2.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1" />}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
