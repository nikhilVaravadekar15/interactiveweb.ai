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

  async getAllMessageBySid(sid: string) {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.sid, sid))
      .orderBy(desc(messages.created_at));
  }
}

const messageService = new MessageService();
export default messageService;
