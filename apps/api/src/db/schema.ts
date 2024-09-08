import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { currentTimestamp } from "../utils/sql-helpers";

export const namesTable = sqliteTable("names", {
  name: text("name").primaryKey(),
  createdAt: text("created_at").notNull().default(currentTimestamp),
});

export const selectNamesSchema = createSelectSchema(namesTable);
export const createNamesSchema = createInsertSchema(namesTable);
