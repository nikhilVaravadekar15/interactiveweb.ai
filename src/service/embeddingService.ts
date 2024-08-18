// import { ulid } from "ulidx";
import { AddParams } from "chromadb";
import { Ollama, EmbeddingsResponse } from "ollama";
import { Document } from "@langchain/core/documents";

class EmbeddingService {
  private ollamaEmbeddings: Ollama | null = null;
  constructor() {
    this.ollamaEmbeddings = new Ollama({
      host: "http://localhost:11434",
    });
  }

  async createEmbeddings(input: string) {
    return (await this.ollamaEmbeddings?.embeddings({
      model: "nomic-embed-text",
      prompt: input,
    })) as EmbeddingsResponse;
  }

  async embeddedDocument(documents: Document[]) {
    return Promise.all(
      documents.map(async (document: Document) => {
        return {
          ids: "ulid()",
          embeddings: await this.createEmbeddings(document.pageContent!),
          metadatas: document.metadata,
          document: document.pageContent,
        } as unknown as AddParams;
      }),
    );
  }
}

const embeddingService = new EmbeddingService();
export default embeddingService;

// curl http://localhost:11434/api/embeddings -d '{
//     "model": "nomic-embed-text",
//     "prompt": "Llamas are members of the camelid family"
//   }' | jq
