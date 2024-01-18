"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  fetchNotifications,
  selectAllNotifications,
} from "@/lib/redux/slices/notificationsSlice/notificationsSlice";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectAllNotifications);
  const numUnreadNotifications = notifications.filter((n) => !n.read).length;

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  let unreadNotificationsBadge;

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    );
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link href="/">Posts</Link>
            <Link href="/users">Users</Link>
            {/* <Link href="/notifications">Notifications</Link> */}
            <Link href="/notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  );
};
