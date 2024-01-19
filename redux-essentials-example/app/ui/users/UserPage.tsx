"use client";
import { useGetPostsQuery } from "@/lib/redux/api/apiSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { Post } from "@/lib/redux/slices/postsSlice/postsSlice";
import { selectUserById } from "@/lib/redux/slices/usersSlice/usersSlice";
import { createSelector } from "@reduxjs/toolkit";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

type Props = {};

export const UserPage = ({}: /* match */ Props) => {
  //   const { userId } = match.params;
  const { userId } = useParams<{ userId: string }>();

  const user = useAppSelector((state) => selectUserById(state, userId));

  // const postsForUser = useAppSelector((state) => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter((post) => post.user === userId);
  // });
  // const postsForUser = useAppSelector((state) =>
  //   selectPostsByUser(state, userId)
  // );
  const selectPostsForUser = useMemo(() => {
    const emptyArray: Post[] = [];
    // Return a unique selector instance for this page so that
    // the filtered results are correctly memoized
    return createSelector(
      (res) => res.data,
      (res, userId: string) => userId,
      (data: Post[], userId: string) =>
        data?.filter((post) => post.user === userId) ?? emptyArray
    );
  }, []);

  // Use the same posts query, but extract only part of its data
  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      // We can optionally include the other metadata fields from the result here
      ...result,
      // Include a field called `postsForUser` in the hook result object,
      // which will be a filtered list of posts
      postsForUser: selectPostsForUser(result, userId),
    }),
  });

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
