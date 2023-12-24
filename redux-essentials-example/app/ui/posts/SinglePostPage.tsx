"use client";
import { ReduxState } from "@/lib/redux/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { PostAuthor } from "./PostAuthor";

export const SinglePostPage = (/* { match } */) => {
  //   const { postId } = match.params;
  const { postId } = useParams();

  const post = useSelector((state: ReduxState) =>
    state.posts.find((post) => post.id === postId)
  );

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
        </div>
        <p className="post-content">{post.content}</p>
        <Link href={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};
