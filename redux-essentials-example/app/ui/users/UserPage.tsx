"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  selectAllPosts,
  selectPostsByUser,
} from "@/lib/redux/slices/postsSlice/postsSlice";
import { selectUserById } from "@/lib/redux/slices/usersSlice/usersSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

export const UserPage = ({}: /* match */ Props) => {
  //   const { userId } = match.params;
  const { userId } = useParams<{ userId: string }>();

  const user = useAppSelector((state) => selectUserById(state, userId));

  // const postsForUser = useAppSelector((state) => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter((post) => post.user === userId);
  // });
  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, userId)
  );

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link href={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
};
