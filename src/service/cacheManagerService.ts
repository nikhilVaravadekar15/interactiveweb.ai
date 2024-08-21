import { TSite } from "@/types";
import { caching, MemoryCache } from "cache-manager";

class CacheManagerService {
  private memoryCache: MemoryCache | null = null;
  constructor() {
    caching("memory", {
      max: 100,
      ttl: 1000 * 60 * 10 /* 10 mins */,
    })
      .then((cache) => {
        this.memoryCache = cache;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async set({ id, url, collection_name, created_at }: TSite) {
    return await this.memoryCache?.set(id, {
      id,
      url,
      collection_name,
      created_at,
    });
  }

  async get(id: string) {
    return (await this.memoryCache?.get(id)) as TSite | undefined;
  }

  async delete(id: string) {
    return await this.memoryCache?.del(id);
  }
}

const cacheManagerService = new CacheManagerService();
export default cacheManagerService;
