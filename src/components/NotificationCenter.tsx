
import { useState } from 'react';
import { Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Define notification types
type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string; // Change from Date to string to fix type error
  read: boolean;
}

const NotificationCenter = () => {
  // Sample notifications (in a real app, these would come from an API)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'info',
      title: 'System Update',
      message: 'System has been successfully updated to the new version',
      timestamp: new Date().toISOString(), // Convert Date to string
      read: false,
    },
    {
      id: '2',
      type: 'success',
      title: 'Booking Confirmed',
      message: 'Your booking for Riyadh Festival has been confirmed',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // Convert Date to string
      read: false,
    },
    {
      id: '3',
      type: 'warning',
      title: 'Event Schedule Changed',
      message: 'The schedule for Jeddah Season has changed, please check details',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // Convert Date to string
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true,
    })));
  };

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return 'bg-blue-500';
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b p-3 flex justify-between items-center">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              className="text-xs text-tourism-primary hover:text-tourism-primary/80"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-3 border-b flex gap-3 ${notification.read ? 'bg-white' : 'bg-gray-50'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className={`${getIconForType(notification.type)} h-2 w-2 mt-2 rounded-full`} />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    {!notification.read && (
                      <span className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-0.5">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">No notifications</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
