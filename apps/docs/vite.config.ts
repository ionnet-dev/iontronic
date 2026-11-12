import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Aliases point at the package source (not dist) so edits hot-reload. React, Base UI and Lucide resolve from the
// repo root's node_modules, which keeps a single React copy.
const root = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@ionnet\/iontronic\/react$/, replacement: `${root}src/react/index.ts` },
      { find: /^@ionnet\/iontronic\/icons$/, replacement: `${root}src/react/icons.ts` },
      { find: /^@ionnet\/iontronic\/styles\.css$/, replacement: `${root}src/styles/index.css` },
      { find: /^@ionnet\/iontronic\/styles-no-fonts\.css$/, replacement: `${root}src/styles/no-fonts.css` },
      { find: /^@ionnet\/iontronic$/, replacement: `${root}src/index.ts` },
    ],
    dedupe: ["react", "react-dom"],
  },
  server: { port: 5299, strictPort: true, fs: { allow: [root] } },
});
