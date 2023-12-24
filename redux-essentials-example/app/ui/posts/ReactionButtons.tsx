import { PostReactions, PostSliceState } from "@/lib/redux/posts/postsSlice";
import React from "react";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButtons = ({ post }: { post: PostSliceState }) => {
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type="button" className="muted-button reaction-button">
        {emoji} {post.reactions[name as keyof PostReactions]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
