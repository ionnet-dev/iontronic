import { androidTarget } from "./android";
import { cssTarget } from "./css";
import { dtcgTarget } from "./dtcg";
import { tailwindTarget } from "./tailwind";
import { terminalTarget } from "./terminal";
import type { TokenTarget } from "./types";

/**
 * Every platform output, in build order. Register new targets here.
 */
export const TARGETS: readonly TokenTarget[] = [
  cssTarget,
  dtcgTarget,
  tailwindTarget,
  androidTarget,
  terminalTarget,
];

export type { OutputFile, TokenTarget } from "./types";
