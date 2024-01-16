"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import { useParams } from "next/navigation";
import React from "react";

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
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  );
};
