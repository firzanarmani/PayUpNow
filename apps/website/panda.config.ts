import { defineConfig } from "@pandacss/dev";
import { preset } from "@payupnow/design-system/preset";

export default defineConfig({
  preflight: true,
  jsxFramework: "react",

  presets: ["@pandacss/dev/presets", preset],

  include: ["../../packages/design-system/src/**/*.tsx", "./src/**/*.{ts,tsx}"],
  importMap: "@payupnow/styled-system",
  outdir: "../../packages/styled-system",
});
