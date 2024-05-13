import { Client, Databases } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const db = new Databases(client);

  // when a new user is created
  if (req.method === "POST") {
    const data = req.body;

    log(JSON.stringify(data));
    // log the event headers
    log(JSON.stringify(req.headers));
    // const user = await db.createDocument("drug-inventory", "user", ID.unique(), data);
    // return res.json(user);
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};
