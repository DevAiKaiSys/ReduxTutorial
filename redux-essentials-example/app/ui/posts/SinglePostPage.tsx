"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { useGetPostQuery } from "@/lib/redux/api/apiSlice";
import { Spinner } from "../Spinner";

type Props = {};

export const SinglePostPage = ({}: /* match */ Props) => {
  //   const { postId } = match.params;
  const { postId } = useParams<{ postId: string }>();

  // const post = useAppSelector((state) =>
  //   state.posts.find((post) => post.id === postId)
  // );
  // const post = useAppSelector((state) => selectPostById(state, postId));

  // if (!post) {
  //   return (
  //     <section>
  //       <h2>Post not found!</h2>
  //     </section>
  //   );
  // }

  // return (
  //   <section>
  //     <article className="post">
  //       <h2>{post.title}</h2>
  //       <div>
  //         <PostAuthor userId={post.user} />
  //         <TimeAgo timestamp={post.date} />
  //       </div>
  //       <p className="post-content">{post.content}</p>
  //       <ReactionButtons post={post} />
  //       <Link href={`/editPost/${post.id}`} className="button">
  //         Edit Post
  //       </Link>
  //     </article>
  //   </section>
  // );
  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPostQuery(postId);
  let content;
  if (isFetching) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = (
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
    );
  } else if (isError) {
    if (error instanceof Object && "data" in error) {
      const errorData = error.data as { error: string };
      const errorMessage = errorData.error;
      content = <div>{errorMessage}</div>;
    } else {
      content = <div>{error.toString()}</div>;
    }
  }

  return <section>{content}</section>;
};
