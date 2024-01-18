import { ARTIFICIAL_DELAY_MS, Post, db, serializePost } from "../server_data";

export async function GET(request: Request) {
  try {
    const posts = db.post.getAll().map(serializePost);

    await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));

    return new Response(JSON.stringify(posts), {
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

type PostRequestData = {
  title: string;
  content: string;
  user: string;
};

export async function POST(request: Request) {
  try {
    const requestData: PostRequestData = await request.json();

    if (requestData.content === "error") {
      await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));

      return new Response(JSON.stringify("Server error saving this post!"), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const data: Omit<Post, "id" | "comments"> = {
      ...requestData,
      date: new Date().toISOString(),
      user: db.user.findFirst({ where: { id: { equals: requestData.user } } }),
      reactions: db.reaction.create(),
    };

    data.reactions = db.reaction.create();

    const post = db.post.create(data);

    await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));

    return new Response(JSON.stringify(serializePost(post)), {
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
