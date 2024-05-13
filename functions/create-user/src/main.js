import { Client, Databases } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const db = new Databases(client);

  if (req.method === "POST") {
    const data = req.body;
    const event = req.headers["x-appwrite-event"];
    const userId = data.$id;

    const evtArr = event.split(".");
    try {
      switch (evtArr.at(-1)) {
        case "create":
          await db.createDocument("drug-inventory", "user", userId, {
            userId,
            name: data.name,
            email: data.email,
          });
          break;

        case "update":
          await db.updateDocument("drug-inventory", "user", userId);
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
