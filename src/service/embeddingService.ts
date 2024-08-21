import { Ollama, EmbeddingsResponse } from "ollama";

class EmbeddingService {
  private ollamaEmbeddings: Ollama | null = null;
  private EMBEDDING_MODEL_PATH: string | null = null;
  private OLLAMA_EMBEDDING_MODEL: string | null = null;

  constructor() {
    this.EMBEDDING_MODEL_PATH = process.env.EMBEDDING_MODEL_PATH!;
    this.OLLAMA_EMBEDDING_MODEL = process.env.OLLAMA_EMBEDDING_MODEL!;

    if (!this.EMBEDDING_MODEL_PATH || !this.OLLAMA_EMBEDDING_MODEL) {
      throw new Error("Ollama embedding details missing in .env");
    }
    this.ollamaEmbeddings = new Ollama({
      host: this.EMBEDDING_MODEL_PATH,
    });
  }

  async createEmbeddings(input: string) {
    return (await this.ollamaEmbeddings?.embeddings({
      model: this.OLLAMA_EMBEDDING_MODEL!,
      prompt: input,
    })) as EmbeddingsResponse;
  }
}

const embeddingService = new EmbeddingService();
export default embeddingService;

// curl http://localhost:11435/api/embeddings -d '{
//     "model": "nomic-embed-text",
//     "prompt": "Llamas are members of the camelid family"
//   }' | jq
