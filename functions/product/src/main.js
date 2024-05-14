import { Client, Databases, ID, Query } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const db = new Databases(client);

  const runAction = async (product) => {
    if (product.quantity === 0) {
      await db.createDocument("drug-inventory", "notification", ID.unique(), {
        type: "out-of-stock",
        isAdmin: true,
        quantity: product.quantity,
        product: product.$id,
      });
    } else if (product.quantity < product.minStockLevel) {
      await db.createDocument("drug-inventory", "notification", ID.unique(), {
        type: "low-stock",
        isAdmin: true,
        quantity: product.quantity,
        product: product.$id,
      });
    }
  };

  if (req.method === "POST") {
    const { body: product, headers } = req;
    const event = headers["x-appwrite-event"];
    const trigger = headers["x-appwrite-trigger"];

    log(JSON.stringify({ event, trigger, product }));

    if (trigger === "schedule") {
      const offset = 0;
      try {
        // get all products and check if they have expired
        const products = await db.listDocuments("drug-inventory", "products", [
          Query.limit(50),
          Query.offset(offset),
        ]);

        while (products.total > 0) {
          log(products.total);
          // for (const product of products.documents) {
          //   if (new Date(product.expiryDate) < new Date()) {
          //     await db.createDocument("drug-inventory", "notification", ID.unique(), {
          //       type: "expired-drug",
          //       isAdmin: false,
          //       product: product.$id,
          //       expiredDate: product.expiryDate,
          //     });
          //   }
          // }
          // offset += 50;
          // products = await db.listDocuments("drug-inventory", "products", [
          //   Query.limit(50),
          //   Query.offset(offset),
          // ]);
        }

        log("expired products check done");
        return res.json({ success: true });
      } catch (e) {
        error(e);
        return res.empty();
      }
    }

    const evtArr = event.split(".");

    try {
      switch (evtArr.at(-1)) {
        case "create":
          runAction(product);
          break;

        case "update":
          runAction(product);
          break;

        case "delete":
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
