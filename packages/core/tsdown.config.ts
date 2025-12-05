import { defineConfig } from "tsdown";

export default defineConfig({
  platform: "neutral",
  dts: true,
  copy: [{ from: "src/assets", to: "dist/assets" }],
});
