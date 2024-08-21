import {
  timestamp,
  mysqlTable,
  varchar,
  longtext,
} from "drizzle-orm/mysql-core";

export const sites = mysqlTable("sites", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  url: varchar("url", { length: 2048 }).notNull(),
  collection_name: varchar("collection_name", { length: 256 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const messages = mysqlTable("messages", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  sid: varchar("sid", { length: 255 })
    .notNull()
    .references(() => sites.id),
  role: varchar("role", { length: 32 }).notNull(),
  content: longtext("content").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
