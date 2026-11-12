import { toCss } from "../../src/tokens";
import type { TokenTarget } from "./types";

const HEADER = "/* Generated from src/tokens by scripts/build-tokens.ts. Do not edit. */\n\n";

/**
 * `tokens.css`: every token as a `--io-*` custom property, themed by `data-io-theme` with `prefers-color-scheme` as the fallback.
 * Imported by `src/styles/no-fonts.css`.
 */
export const cssTarget: TokenTarget = {
  name: "css",
  build(tokens) {
    return [{ path: "tokens.css", content: `${HEADER}${toCss(tokens)}\n` }];
  },
};

export default cssTarget;
