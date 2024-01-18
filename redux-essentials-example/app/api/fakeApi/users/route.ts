import { ARTIFICIAL_DELAY_MS, db, serializePost } from "../server_data";

export async function GET(request: Request) {
  try {
    const users = db.user.getAll();

    await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
