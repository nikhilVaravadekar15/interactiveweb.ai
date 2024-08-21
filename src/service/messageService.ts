import { db } from "@/db/mysql";
import { messages } from "@/db/mysql/schema";
import { TInputFormSchema, TMessage } from "@/types";
import { asc, desc, eq } from "drizzle-orm";

class MessageService {
  async insert(sid: string, messagesList: TMessage[]) {
    const tempMessages = messagesList.map((message) => {
      return {
        sid: sid,
        content: message.content,
        role: message.role,
      };
    });
    return await db.insert(messages).values(tempMessages).$returningId();
  }

  // async getAll() {
  //   return await db.select().from(sites).orderBy(desc(sites.created_at));
  // }
}

const messageService = new MessageService();
export default messageService;
