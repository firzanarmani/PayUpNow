import { type CfBindings } from "../types/cloudflare";

declare module "cloudflare:test" {
  interface ProvidedEnv extends Env, CfBindings {
    TEST_MIGRATIONS: D1Migration[];
  }
}
