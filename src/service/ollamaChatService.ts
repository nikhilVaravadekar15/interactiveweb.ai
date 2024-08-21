import { TMessage } from "@/types";
import { createOpenAI, OpenAIProvider } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, Message } from "ai";
import messageService from "./messageService";

class OllamaChatService {
  private aiProvider: OpenAIProvider | null = null;

  private OLLAMA_API_KEY: string | null = process.env.OLLAMA_API_KEY!;
  private OLLAMA_API_BASEURL: string | null = process.env.OLLAMA_API_BASEURL!;
  private OLLAMA_CHAT_COMPLETIONS_MODEL: string | null =
    process.env.OLLAMA_CHAT_COMPLETIONS_MODEL!;

  constructor() {
    this.OLLAMA_API_KEY = process.env.OLLAMA_API_KEY!;
    this.OLLAMA_API_BASEURL = process.env.OLLAMA_API_BASEURL!;
    this.OLLAMA_CHAT_COMPLETIONS_MODEL =
      process.env.OLLAMA_CHAT_COMPLETIONS_MODEL!;

    if (
      !this.OLLAMA_API_KEY ||
      !this.OLLAMA_API_BASEURL ||
      !this.OLLAMA_CHAT_COMPLETIONS_MODEL
    ) {
      throw new Error("Chat completion model details missing in .env");
    }

    this.aiProvider = createOpenAI({
      baseURL: this.OLLAMA_API_BASEURL,
      apiKey: this.OLLAMA_API_KEY,
    });
  }

  async chatCompletionResult(
    sid: string,
    prompt: string,
    messages: TMessage[],
  ) {
    return await streamText({
      model: this.aiProvider?.chat("llama3.1:8b")!,
      system: prompt,
      messages: convertToCoreMessages(messages),
      async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
        // await saveChat({ text, toolCalls, toolResults });
        await messageService.insert(sid, [
          messages[messages.length - 1],
          { role: "assistant", content: text },
        ]);
      },
    });
  }
}

const ollamaChatService = new OllamaChatService();
export default ollamaChatService;
