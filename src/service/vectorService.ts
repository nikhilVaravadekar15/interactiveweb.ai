import {
  MilvusClient,
  SearchResults,
  SearchResultData,
} from "@zilliz/milvus2-sdk-node";

class VectorService {
  private milvusClient: MilvusClient | null = null;
  private MILVUS_DATABASE_PATH: string | null = null;
  constructor() {
    this.MILVUS_DATABASE_PATH = process.env.MILVUS_DATABASE_PATH!;
    if (!this.MILVUS_DATABASE_PATH) {
      throw new Error("Milvus database path missing in .env");
    }

    this.milvusClient = new MilvusClient({
      address: this.MILVUS_DATABASE_PATH,
    });
  }

  async search(collection_name: string, embedding: number[]) {
    const res: SearchResults | undefined = await this.milvusClient?.search({
      collection_name: collection_name,
      data: embedding,
      limit: 3, // The number of results to return
      output_fields: ["document"],
    });
    return res;
  }
}

const vectorService = new VectorService();
export default vectorService;
