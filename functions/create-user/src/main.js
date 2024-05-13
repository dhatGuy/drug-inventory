import { Client, Databases } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const db = new Databases(client);

  if (req.method === "POST") {
    const { body, headers } = req;
    const event = headers["x-appwrite-event"];
    const userId = body.$id;

    const evtArr = event.split(".");
    try {
      switch (evtArr.at(-1)) {
        case "create":
          await db.createDocument("drug-inventory", "user", userId, {
            userId,
            name: body.name,
            email: body.email,
          });
          break;

        case "update":
          await db.updateDocument("drug-inventory", "user", userId, {
            name: body.name,
            email: body.email,
          });
          break;

        case "delete":
          await db.deleteDocument("drug-inventory", "user", userId);
          break;
        default:
          log("Unknown event type");
          break;
      }

      return res.json({ success: true });
    } catch (e) {
      error(e);
      return res.empty();
    }
  }
};
