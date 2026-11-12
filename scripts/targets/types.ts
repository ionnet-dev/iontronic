import type { Tokens } from "../../src/tokens";

/**
 * One generated file, relative to `src/generated/` (copied to `dist/platforms/` by the build).
 */
export interface OutputFile {
  path: string;
  content: string;
}

/**
 * A platform output. Add a new platform by writing a target file and registering it in `targets/index.ts`.
 */
export interface TokenTarget {
  /**
   * Short name shown in the build log.
   */
  name: string;
  /**
   * Builds this target's files from the token tree. Throw a readable `Error` if a token can't be represented.
   */
  build(tokens: Tokens): OutputFile[];
}
