"use client";
import { ReduxState } from "@/lib/redux/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export const PostsList = () => {
  const posts = useSelector((state: ReduxState) => state.posts);

  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link href={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
