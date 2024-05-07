import { Account, Client, Databases } from "react-native-appwrite/src";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT_URL!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);
export const databases = new Databases(client);
