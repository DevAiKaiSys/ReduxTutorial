import {
  Post,
  PostReactions,
  PostSliceState,
  reactionAdded,
} from "@/lib/redux/posts/postsSlice";
import React from "react";
import { useDispatch } from "react-redux";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButtons = ({ post }: { post: Post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name as keyof PostReactions]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
