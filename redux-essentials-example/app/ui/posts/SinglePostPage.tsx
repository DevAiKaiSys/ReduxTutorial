"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { PostAuthor } from "./PostAuthor";

type Props = {};

export const SinglePostPage = ({}: /* match */ Props) => {
  //   const { postId } = match.params;
  const { postId } = useParams<{ postId: string }>();

  const post = useAppSelector((state) =>
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
        <PostAuthor userId={post.user} />
        <p className="post-content">{post.content}</p>
        <Link href={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};
