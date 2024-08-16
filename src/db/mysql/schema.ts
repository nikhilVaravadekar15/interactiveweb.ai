import { timestamp, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const sites = mysqlTable("sites", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  url: varchar("url", { length: 2048 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
