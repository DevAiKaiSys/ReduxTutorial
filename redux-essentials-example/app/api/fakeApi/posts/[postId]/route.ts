import { db, serializePost, ARTIFICIAL_DELAY_MS } from "../../server_data";

export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const postId = params.postId;

  try {
    const post = db.post.findFirst({
      where: { id: { equals: postId } },
    });

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found!" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const postId = params.postId;

  try {
    const { id, ...data } = await req.json();
    const updatedPost = db.post.update({
      where: { id: { equals: postId } },
      data,
    });

    if (!updatedPost) {
      return new Response(JSON.stringify({ error: "Post not found!" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));

    return new Response(JSON.stringify(serializePost(updatedPost)), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
