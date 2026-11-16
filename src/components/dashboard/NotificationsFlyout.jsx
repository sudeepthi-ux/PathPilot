import React from 'react';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const NotificationsFlyout = ({ isOpen, onClose }) => {
  const { studentProfile, markNotificationAsRead, clearAllNotifications } = useAuth();
  const notifications = studentProfile.notifications || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div 
      className="absolute right-0 top-12 w-80 sm:w-96 bg-card rounded-3xl border border-ivory-300 shadow-float z-50 overflow-hidden animate-fadeIn"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between p-4 border-b border-ivory-200 bg-sand-50/60">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-forest-700" />
          <h4 className="font-bold text-sm text-charcoal-900">Notifications</h4>
          {unreadCount > 0 && (
            <span className="text-[10px] bg-accent text-on-accent font-bold px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="text-[11px] text-charcoal-400 hover:text-red-700 transition-colors"
              title="Clear all"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-700 hover:bg-ivory-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-ivory-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-charcoal-400 text-xs">
            No new notifications. You're completely up to date!
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-4 text-xs transition-colors cursor-pointer ${
                notif.read ? 'bg-card hover:bg-sand-50/50' : 'bg-forest-50/40 hover:bg-forest-50/70'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-bold text-charcoal-900 leading-snug">
                  {notif.title}
                </span>
                <span className="text-[10px] text-charcoal-400 shrink-0 font-mono">
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-charcoal-600 leading-relaxed text-[11px]">
                {notif.body}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
