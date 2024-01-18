import { ARTIFICIAL_DELAY_MS, db, serializePost } from "../server_data";

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
