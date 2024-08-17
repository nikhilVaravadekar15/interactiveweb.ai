import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

class ScrappingService {
  constructor() {}

  async getWebPageContent(url: string) {
    const loader = new CheerioWebBaseLoader(url);
    const docs = await loader.load();
    return docs;
  }
}

const scrappingService = new ScrappingService();
export default scrappingService;
