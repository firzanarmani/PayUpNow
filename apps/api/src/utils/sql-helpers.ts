import { sql } from "drizzle-orm";

export const currentTimestamp = sql`(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW'))`;
