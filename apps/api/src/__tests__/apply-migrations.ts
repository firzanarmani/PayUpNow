import { applyD1Migrations, env } from "cloudflare:test";

async function main(): Promise<void> {
  await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
}

void main();
