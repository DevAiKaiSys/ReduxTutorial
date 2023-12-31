"use client";
import { ReduxState } from "@/lib/redux/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { selectPostById } from "@/lib/redux/posts/postsSlice";

export const SinglePostPage = (/* { match } */) => {
  //   const { postId } = match.params;
  const { postId }: { postId: string } = useParams();

  // const post = useSelector((state: ReduxState) =>
  //   state.posts.find((post) => post.id === postId)
  // );
  const post = useSelector((state: ReduxState) =>
    selectPostById(state, postId)
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
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link href={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};
