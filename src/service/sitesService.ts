import { db } from "@/db/mysql";
import { sites } from "@/db/mysql/schema";
import { TInputFormSchema } from "@/types";
import { eq } from "drizzle-orm";

class SitesService {
  async create({ url }: TInputFormSchema) {
    return (
      await db
        .insert(sites)
        .values({
          url: url,
        })
        .$returningId()
    )[0];
  }

  async delete(id: string) {
    return (await db.delete(sites).where(eq(sites.id, id)))[0];
  }

  async getUrlById(id: string) {
    return (await db.select().from(sites).where(eq(sites.id, id)))[0];
  }

  async getAll() {
    return await db.select().from(sites);
  }
}

const sitesService = new SitesService();
export default sitesService;
