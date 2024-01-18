"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";
import React, { useEffect } from "react";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import {
  fetchPosts,
  selectAllPosts,
} from "@/lib/redux/slices/postsSlice/postsSlice";
import type { Post } from "@/lib/redux/slices/postsSlice/postsSlice";
import { Spinner } from "../Spinner";

// const PostExcerpt = ({ post }: { post: Post }) => {
let PostExcerpt: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link href={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

PostExcerpt = React.memo(PostExcerpt);

export const PostsList = () => {
  const dispatch = useAppDispatch();

  // const posts = useAppSelector((state) => state.posts);
  const posts = useAppSelector(selectAllPosts);

  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  // const renderedPosts = posts.map((post) => (
  // Sort posts in reverse chronological order by datetime string
  // const orderedPosts = posts
  //   .slice()
  //   .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  // const renderedPosts = orderedPosts.map((post) => {
  //   return (
  //     <article className="post-excerpt" key={post.id}>
  //       <h3>{post.title}</h3>
  //       <div>
  //         <PostAuthor userId={post.user} />
  //         <TimeAgo timestamp={post.date} />
  //       </div>
  //       <p className="post-content">{post.content.substring(0, 100)}</p>
  //       <ReactionButtons post={post} />
  //       <Link href={`/posts/${post.id}`} className="button muted-button">
  //         View Post
  //       </Link>
  //     </article>
  //   );
  // });

  let content;

  if (postStatus === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (postStatus === "succeeded") {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {/* {renderedPosts} */}
      {content}
    </section>
  );
};
