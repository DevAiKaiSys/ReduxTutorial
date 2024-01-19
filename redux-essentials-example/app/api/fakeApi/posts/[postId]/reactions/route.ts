import {
  ARTIFICIAL_DELAY_MS,
  Post,
  Reaction,
  db,
  serializePost,
} from "../../../server_data";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    const { reaction } = await req.json();
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

    const updatedPost = db.post.update({
      where: { id: { equals: postId } },
      data: {
        reactions: {
          ...post.reactions,
          [reaction as keyof Reaction]:
            (post.reactions[reaction as keyof Reaction] as number) + 1,
        },
      },
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
    console.error("Error processing POST request:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
