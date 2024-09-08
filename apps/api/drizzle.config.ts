import { type Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: "",
    databaseId: "",
    token: "",
  },
  verbose: true,
  strict: true,
} satisfies Config;
