"use client";
import { useAppDispatch } from "@/lib/redux/hooks";
import { fetchNotifications } from "@/lib/redux/slices/notificationsSlice/notificationsSlice";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const dispatch = useAppDispatch();

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link href="/">Posts</Link>
            <Link href="/users">Users</Link>
            <Link href="/notifications">Notifications</Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  );
};
