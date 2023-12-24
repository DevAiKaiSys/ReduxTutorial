"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { Post, fetchPosts, selectAllPosts } from "@/lib/redux/posts/postsSlice";
import { ReduxState, reduxStore } from "@/lib/redux/store";
import { Spinner } from "../Spinner";

const PostExcerpt = ({ post }: { post: Post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
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

export const PostsList = () => {
  const dispatch = useDispatch();
  // const posts = useSelector((state: ReduxState) => state.posts);
  const posts = useSelector(selectAllPosts);

  // Sort posts in reverse chronological order by datetime string
  // const orderedPosts = posts
  //   .slice()
  //   .sort((a, b) => b.date.localeCompare(a.date));
  const postStatus = useSelector((state: ReduxState) => state.posts.status);
  const error = useSelector((state: ReduxState) => state.posts.error);

  // const renderedPosts = orderedPosts.map((post) => (
  //   <article className="post-excerpt" key={post.id}>
  //     <h3>{post.title}</h3>
  //     <div>
  //       <PostAuthor userId={post.user} />
  //       <TimeAgo timestamp={post.date} />
  //     </div>
  //     <p className="post-content">{post.content.substring(0, 100)}</p>
  //     <ReactionButtons post={post} />
  //     <Link href={`/posts/${post.id}`} className="button muted-button">
  //       View Post
  //     </Link>
  //   </article>
  // ));
  // const renderedPosts = orderedPosts.map((post) => (
  //   <PostExcerpt key={post.id} post={post} />
  // ));

  useEffect(() => {
    if (postStatus === "idle") {
      // dispatch(fetchPosts());
      reduxStore.dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (postStatus === "succeeded") {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

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
