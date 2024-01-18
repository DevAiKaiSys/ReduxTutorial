"use client";
import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectAllNotifications } from "@/lib/redux/slices/notificationsSlice/notificationsSlice";
import { selectAllUsers } from "@/lib/redux/slices/usersSlice/usersSlice";

export const NotificationsList = () => {
  const notifications = useAppSelector(selectAllNotifications);
  const users = useAppSelector(selectAllUsers);

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find((user) => user.id === notification.user) || {
      name: "Unknown User",
    };

    return (
      <div key={notification.id} className="notification">
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};
