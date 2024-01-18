"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectAllUsers } from "@/lib/redux/slices/usersSlice/usersSlice";
import Link from "next/link";
import React from "react";

export const UsersList = () => {
  const users = useAppSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link href={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  );
};
