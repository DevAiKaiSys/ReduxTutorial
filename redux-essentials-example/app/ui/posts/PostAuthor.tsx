import { useAppSelector } from "@/lib/redux/hooks";
import React from "react";

type Props = { userId?: string };

export const PostAuthor = ({ userId }: Props) => {
  const author = useAppSelector((state) =>
    state.users.find((user) => user.id === userId)
  );

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
