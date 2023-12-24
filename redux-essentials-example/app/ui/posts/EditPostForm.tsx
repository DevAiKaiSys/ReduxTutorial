"use client";
import { postUpdated } from "@/lib/redux/posts/postsSlice";
import { ReduxState } from "@/lib/redux/store";
import { useParams, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const EditPostForm = () => {
  const { postId } = useParams();

  const post = useSelector((state: ReduxState) =>
    state.posts.find((post) => post.id === postId)
  );

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const dispatch = useDispatch();
  //   const history = useHistory();
  const router = useRouter();

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      //   history.push(`/posts/${postId}`);
      router.push(`/posts/${postId}`);
    }
  };

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
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  );
};
