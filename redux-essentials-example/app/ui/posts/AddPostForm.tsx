"use client";
import { useAddNewPostMutation } from "@/lib/redux/api/apiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addNewPost } from "@/lib/redux/slices/postsSlice/postsSlice";
import { selectAllUsers } from "@/lib/redux/slices/usersSlice/usersSlice";
import React, { useState } from "react";
import { Spinner } from "../Spinner";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  // const [addRequestStatus, setAddRequestStatus] = useState("idle");

  // const dispatch = useAppDispatch();
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  // const users = useAppSelector((state) => state.users);
  const users = useAppSelector(selectAllUsers);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  // const onSavePostClicked = () => {
  //   if (title && content) {
  //     // dispatch(
  //     //   postAdded({
  //     //     id: nanoid(),
  //     //     title,
  //     //     content,
  //     //   })
  //     // );
  //     dispatch(postAdded(title, content, userId));

  //     setTitle("");
  //     setContent("");
  //   }
  // };

  // const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  // const canSave =
  //   [title, content, userId].every(Boolean) && addRequestStatus === "idle";
  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        // setAddRequestStatus("pending");
        // await dispatch(addNewPost({ title, content, user: userId })).unwrap();
        await addNewPost({ title, content, user: userId }).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
        // } finally {
        //   setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const spinner = isLoading ? <Spinner size="30px" /> : null;

  return (
    <section>
      <h2>Add a New Post</h2>
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
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        {/* <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            Save Post
          </button>
          {spinner}
        </div>
      </form>
    </section>
  );
};
