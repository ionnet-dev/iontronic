/**
 * Joins class names, skipping falsy values.
 *
 * @example cx("io-button", isActive && "is-active", className)
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export default cx;
