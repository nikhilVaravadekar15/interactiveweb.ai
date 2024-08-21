import { Message } from "ai";
import sitesService from "@/service/sitesService";
import vectorService from "@/service/vectorService";
import embeddingService from "@/service/embeddingService";
import ollamaChatService from "@/service/ollamaChatService";
import cacheManagerService from "@/service/cacheManagerService";
import { generatePrompt } from "@/lib/utils";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, id } = await req.json();

  const lastMessage: Message = messages[messages.length - 1];

  // check in cache
  let siteDetails = await cacheManagerService.get(id);
  if (!siteDetails) {
    // cache miss
    // check in database
    siteDetails = await sitesService.getUrlById(id);
    // set cache
    await cacheManagerService.set(siteDetails);
  }

  // create embeddings of user query
  const embeddings = await embeddingService.createEmbeddings(
    lastMessage.content,
  );

  // perform similarity search
  const res = await vectorService.search(
    siteDetails.collection_name,
    embeddings.embedding,
  );
  let context = res?.results.reduce(
    (accumulator, currentValue) => `${accumulator} ${currentValue?.document}`,
    "",
  )!;

  // generate prompt
  const prompt: string = generatePrompt(lastMessage.content, context);

  const result = await ollamaChatService.chatCompletionResult(
    id,
    prompt,
    messages,
  );
  return result.toDataStreamResponse();
}

// curl http://10.254.4.245:11434/api/generate -d '{
//   "model": "llama3.1:8b",
//   "prompt": "hi"
// }'
// ---- OR ----
// curl http://localhost:11434/v1/chat/completions \
//   -H "Content-Type: application/json" \
//   -d '{
//       "model": "llama3.1:8b",
//       "messages": [
//           {
//               "role": "system",
//               "content": "You are a helpful assistant."
//           },
//           {
//               "role": "user",
//               "content": "Hello!"
//           }
//       ]
//   }'
