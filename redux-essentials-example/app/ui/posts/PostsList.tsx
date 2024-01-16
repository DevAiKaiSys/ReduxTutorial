"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";
import React from "react";
import { PostAuthor } from "./PostAuthor";

export const PostsList = () => {
  const posts = useAppSelector((state) => state.posts);

  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user} />
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
