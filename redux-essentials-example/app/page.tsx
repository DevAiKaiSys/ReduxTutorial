import { Navbar } from "./ui/Navbar";
import { AddPostForm } from "./ui/posts/AddPostForm";
import { PostsList } from "./ui/posts/PostsList";

export default function Home() {
  return (
    <>
      <Navbar />
      <AddPostForm />
      <PostsList />
    </>
  );
}
