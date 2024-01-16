import { useAppDispatch } from "@/lib/redux/hooks";
import {
  Post,
  PostReactions,
  reactionAdded,
} from "@/lib/redux/slices/postsSlice/postsSlice";
import React from "react";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

type Props = { post: Post };

export const ReactionButtons = ({ post }: Props) => {
  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(
            reactionAdded({
              postId: post.id,
              reaction: name as keyof PostReactions,
            })
          )
        }
      >
        {emoji} {post.reactions[name as keyof PostReactions]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
