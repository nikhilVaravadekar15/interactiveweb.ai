import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

class SegmentService {
  private textSplitter: RecursiveCharacterTextSplitter | null = null;
  constructor() {
    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 768,
      chunkOverlap: 256,
    });
  }

  async splitText(documents: Document[]) {
    return await this.textSplitter?.splitDocuments(documents);
  }
}

const segmentService = new SegmentService();
export default segmentService;
