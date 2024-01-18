import { useAppSelector } from "@/lib/redux/hooks";
import { selectUserById } from "@/lib/redux/slices/usersSlice/usersSlice";
import React from "react";

type Props = { userId: string };

export const PostAuthor = ({ userId }: Props) => {
  // const author = useAppSelector((state) =>
  //   state.users.find((user) => user.id === userId)
  // );
  const author = useAppSelector((state) => selectUserById(state, userId));

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
