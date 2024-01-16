import { AddPostForm } from "./ui/posts/AddPostForm";
import { PostsList } from "./ui/posts/PostsList";

export default function Home() {
  return (
    <>
      <AddPostForm />
      <PostsList />
    </>
  );
}
