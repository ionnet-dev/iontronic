import { defineConfig } from "tsdown";

// Two builds so only the React entries carry the "use client" directive; `.` stays usable from servers and RSC.
export default defineConfig([
  {
    entry: { index: "src/index.ts" },
    format: "esm",
    platform: "neutral",
    fixedExtension: false,
    dts: true,
    clean: false,
  },
  {
    entry: { react: "src/react/index.ts", icons: "src/react/icons.ts" },
    format: "esm",
    platform: "neutral",
    fixedExtension: false,
    dts: true,
    clean: false,
    banner: { js: "\"use client\";" },
  },
]);
