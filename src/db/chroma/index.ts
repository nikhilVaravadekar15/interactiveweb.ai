import { ChromaClient, Collection } from "chromadb";

const CHROMA_DATABASE_PATH: string = process.env.CHROMA_DATABASE_PATH!;

if (!CHROMA_DATABASE_PATH) {
  throw new Error("chroma database credential missing in .env");
}

export const chromaClient = new ChromaClient({ path: CHROMA_DATABASE_PATH });

async function get_collection(collection: string) {
  return await chromaClient.getCollection({
    name: collection,
  });
}

async function create_collection(collection: string) {
  return await chromaClient.createCollection({
    name: collection,
  });
}

async function delete_collection(collection: string) {
  return await chromaClient.deleteCollection({
    name: collection,
  });
}
