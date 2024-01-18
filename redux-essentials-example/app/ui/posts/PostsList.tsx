"use client";
import Link from "next/link";
import React, { useMemo } from "react";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import type { Post } from "@/lib/redux/slices/postsSlice/postsSlice";
import { Spinner } from "../Spinner";
import { useGetPostsQuery } from "@/lib/redux/api/apiSlice";
import classnames from "classnames";

// const PostExcerpt = ({ post }: { post: Post }) => {
// let PostExcerpt: React.FC<{ postId: string }> = ({ postId }) => {
// const post = useAppSelector((state) => selectPostById(state, postId));
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
  // const dispatch = useAppDispatch();

  // // const posts = useAppSelector((state) => state.posts);
  // // const posts = useAppSelector(selectAllPosts);
  // const orderedPostIds = useAppSelector(selectPostIds);

  // const postStatus = useAppSelector((state) => state.posts.status);
  // const error = useAppSelector((state) => state.posts.error);

  // useEffect(() => {
  //   if (postStatus === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [postStatus, dispatch]);
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery();

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);

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

  // if (postStatus === "loading") {
  //   content = <Spinner text="Loading..." />;
  // } else if (postStatus === "succeeded") {
  //   // Sort posts in reverse chronological order by datetime string
  //   // const orderedPosts = posts
  //   //   .slice()
  //   //   .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  //   // content = orderedPosts.map((post) => (
  //   //   <PostExcerpt key={post.id} post={post} />
  //   // ));
  //   content = orderedPostIds.map((postId) => (
  //     <PostExcerpt key={postId} postId={postId} />
  //   ));
  // } else if (postStatus === "failed") {
  //   content = <div>{error}</div>;
  // }
  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    // content = posts.map((post) => <PostExcerpt key={post.id} post={post} />);
    // content = sortedPosts.map((post) => (
    //   <PostExcerpt key={post.id} post={post} />
    // ));
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));

    const containerClassname = classnames("posts-container", {
      disabled: isFetching,
    });

    content = <div className={containerClassname}>{renderedPosts}</div>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {/* {renderedPosts} */}
      {content}
    </section>
  );
};
