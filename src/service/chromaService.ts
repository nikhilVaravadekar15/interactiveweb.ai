import { AddParams, Collection } from "chromadb";

class ChromaService {
  private chromaCollection: Collection | undefined;
  constructor(rescollection: Collection) {
    this.chromaCollection = rescollection;
  }

  async addDocument({ ids, embeddings, metadatas, documents }: AddParams) {
    const collection = await this.chromaCollection?.add({
      ids: ["test-id"],
      embeddings: [1, 2, 3, 4, 5],
      documents: ["test"],
    });
  }
}

export default ChromaService;
