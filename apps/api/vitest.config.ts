import path from "node:path";
import {
  defineWorkersConfig,
  readD1Migrations,
} from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig(async () => {
  const migrationsPath = path.join(__dirname, "drizzle");
  const migrations = await readD1Migrations(migrationsPath);

  return {
    test: {
      include: ["./**/*.test.{ts,tsx}"],
      environment: "node",
      setupFiles: ["./src/__tests__/apply-migrations.ts"],
      poolOptions: {
        workers: {
          singleWorker: true,
          wrangler: { configPath: "./wrangler.toml" },
          miniflare: {
            bindings: {
              TEST_MIGRATIONS: migrations,
            },
          },
        },
      },
    },
  };
});
