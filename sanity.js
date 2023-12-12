import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

export const client = createClient({
  projectId: "v7jeqaa5",
  dataset: "production",
  useCdn: true,
  apiVersion: currentDate, // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

// RUN THIS to add exception for localhost 3000 CORS policy
// sanity cors add http://localhost:3000

export default client;
