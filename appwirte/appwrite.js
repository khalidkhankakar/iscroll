import { Client, Account, Avatars, Storage, Databases } from "appwrite";

export const appwriteConfig = {
  APPWIRTE_PROJECT_ID: process.env.APPWIRTE_PROJECT_ID,
  APPWIRTE_PROJECT_ENDPOINT: "https://cloud.appwrite.io/v1",
  DATABASE_SCROLL_ID: process.env.DATABASE_SCROLL_ID,
  COLLECTION_USERS_ID: process.env.COLLECTION_USERS_ID,
  COLLECTION_SAVES_ID: process.env.COLLECTION_SAVES_ID,
  COLLECTION_POSTS_ID: process.env.COLLECTION_POSTS_ID,
  BUCKETS_MEDIA_ID: process.env.BUCKETS_MEDIA_ID,
};
export const client = new Client();
client.setEndpoint(appwriteConfig.APPWIRTE_PROJECT_ENDPOINT);
client.setProject(appwriteConfig.APPWIRTE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
