"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  postUpdated,
  selectPostById,
} from "@/lib/redux/slices/postsSlice/postsSlice";
import { useGetPostQuery, useEditPostMutation } from "@/lib/redux/api/apiSlice";
import { Spinner } from "../Spinner";

type Props = {};

export const EditPostForm = ({}: /* match */ Props) => {
  //   const { postId } = match.params;
  const { postId } = useParams<{ postId: string }>();

  // const post = useAppSelector((state) =>
  //   state.posts.find((post) => post.id === postId)
  // );
  // const post = useAppSelector((state) => selectPostById(state, postId));
  const { data: post } = useGetPostQuery(postId);
  const [updatePost, { isLoading }] = useEditPostMutation();

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const dispatch = useAppDispatch();
  //   const history = useHistory();
  const router = useRouter();

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  // const onSavePostClicked = () => {
  //   if (title && content) {
  //     dispatch(postUpdated({ id: postId, title, content }));
  //     //   history.push(`/posts/${postId}`);
  //     router.push(`/posts/${postId}`);
  //   }
  // };
  const onSavePostClicked = async () => {
    if (title && content) {
      await updatePost({ id: postId, title, content });
      router.push(`/posts/${postId}`);
    }
  };

  const spinner = isLoading ? <Spinner text="Saving..." /> : null;

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
          disabled={isLoading}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
          disabled={isLoading}
        />
      </form>
      <button type="button" onClick={onSavePostClicked} disabled={isLoading}>
        Save Post
      </button>
      {spinner}
    </section>
  );
};
