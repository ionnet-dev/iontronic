/**
 * Size scale shared by every control (buttons, inputs, selects, segmented controls). Heights are 32, 40 and 48px.
 */
export type ControlSize = "sm" | "md" | "lg";

/**
 * Status tones. Each maps to `--io-color-<tone>`.
 */
export type StatusTone = "ok" | "warn" | "bad" | "info";

/**
 * Every tone a hue-driven component (`Badge`, `Chip`, `IconTile`, timeline dots…) accepts.  
 * `neutral` is muted text, `accent` is violet and `spark` is the orange used for unread and active items.
 */
export type Tone = "neutral" | "accent" | "spark" | StatusTone;

/**
 * Message priority, 1 (min) to 5 (urgent). Maps to `--io-color-priority-<n>`.
 */
export type Priority = 1 | 2 | 3 | 4 | 5;

/**
 * Categorical palette slot for topics, sources and tags. Maps to `--io-color-category-<n>`.
 */
export type Category = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/**
 * All priorities, highest first.
 */
export const PRIORITIES: readonly Priority[] = [5, 4, 3, 2, 1];

/**
 * All category slots in palette order.
 */
export const CATEGORIES: readonly Category[] = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * Default label for each priority, as shown by `Badge` when it has no children.
 */
export const PRIORITY_LABELS: Readonly<Record<Priority, string>> = {
  5: "Urgent",
  4: "High",
  3: "Default",
  2: "Low",
  1: "Min",
};

/**
 * Picks a stable category for a name (a topic, source or tag), so the same name always gets the same colour.
 */
export function categoryFor(name: string): Category {
  // FNV-1a, 32-bit
  let hash = 0x811c9dc5;
  for (let i = 0; i < name.length; i++) {
    hash ^= name.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return ((hash >>> 0) % CATEGORIES.length + 1) as Category;
}
