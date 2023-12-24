import { ReduxState } from "@/lib/redux/store";
import React from "react";
import { useSelector } from "react-redux";

export const PostAuthor = ({ userId }: { userId?: string }) => {
  const author = useSelector((state: ReduxState) =>
    state.users.find((user) => user.id === userId)
  );

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
