import { type Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: "affe358d09faf0cadfa28e7e5f6d650a",
    databaseId: "a67b942e-b48b-4483-bb4b-6c78c510c53c",
    token: process.env.CLOUDFLARE_TOKEN ?? "",
  },
  verbose: true,
  strict: true,
} satisfies Config;
