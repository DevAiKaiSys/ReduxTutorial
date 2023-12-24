"use client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { Post, selectAllPosts } from "@/lib/redux/posts/postsSlice";

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
  // const posts = useSelector((state: ReduxState) => state.posts);
  const posts = useSelector(selectAllPosts);

  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

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
  const renderedPosts = orderedPosts.map((post) => (
    <PostExcerpt key={post.id} post={post} />
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
