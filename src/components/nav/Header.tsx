import { Music2, Bell } from "lucide-react";
import { ModeToggle } from "../layout/ModeToggle";
import { Button } from "../ui/button";
import Card3D from "../ui/Card3d";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

// Define a type for notifications
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const Header = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Artist Added",
      message: "Taylor Swift has been added to your artist list",
      time: "2 mins ago",
      isRead: false,
    },
    {
      id: "2",
      title: "Revenue Update",
      message: "Monthly revenue report is now available",
      time: "1 hour ago",
      isRead: false,
    },
    {
      id: "3",
      title: "System Update",
      message: "Streamify dashboard has been updated to v2.1",
      time: "2 hours ago",
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  return (
    <Card3D className="mb-6">
      <div className="p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div
              className="relative w-10 h-10 rounded-xl 
                bg-gradient-to-br from-sky-100 to-teal-100 
                dark:from-sky-900/30 dark:to-teal-900/30 
                flex items-center justify-center transform hover:scale-110 transition-transform duration-200
                before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/40 before:to-transparent before:rounded-xl"
            >
              <Music2 className="h-5 w-5 text-sky-600 dark:text-sky-400 relative z-10" />
            </div>
            <h1
              className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 
                dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              Streamify Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4 w-full lg:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="relative bg-white/50 dark:bg-slate-900/50 border-sky-100 
                    dark:border-sky-900/50 hover:border-sky-200 dark:hover:border-sky-800 rounded-xl"
                >
                  <Bell className="h-5 w-5 text-sky-500/60" />
                  {unreadCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 h-5 w-5 bg-teal-500 rounded-full 
                      flex items-center justify-center text-xs text-white font-medium"
                    >
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 p-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-sky-100 
                  dark:border-sky-900/50"
              >
                <div className="flex items-center justify-between p-4 border-b border-sky-100 dark:border-sky-900/50">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300"
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-sky-100 dark:border-sky-900/50 last:border-0
                          ${
                            !notification.isRead
                              ? "bg-sky-50/50 dark:bg-sky-900/20"
                              : ""
                          }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-white">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                              {notification.message}
                            </p>
                            <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 block">
                              {notification.time}
                            </span>
                          </div>
                          {!notification.isRead && (
                            <span className="h-2 w-2 bg-teal-500 rounded-full flex-shrink-0 mt-2" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                      No notifications
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <ModeToggle />
          </div>
        </div>
      </div>
    </Card3D>
  );
};

export default Header;
