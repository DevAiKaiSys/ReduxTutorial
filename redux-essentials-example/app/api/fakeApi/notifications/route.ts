import {
  ARTIFICIAL_DELAY_MS,
  db,
  generateRandomNotifications,
  getRandomInt,
} from "../server_data";

export async function GET(request: Request) {
  try {
    const numNotifications = getRandomInt(1, 5);

    let notifications = generateRandomNotifications(
      undefined,
      numNotifications,
      db
    );

    await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));

    return new Response(JSON.stringify(notifications), {
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
