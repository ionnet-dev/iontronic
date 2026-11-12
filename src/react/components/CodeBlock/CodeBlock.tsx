import type { ReactNode } from "react";
import { cx } from "../../../cx";

/**
 * Props for {@link CodeBlock}.
 */
export interface CodeBlockProps {
  /**
   * The source text. Rendered as-is (no syntax highlighting).
   */
  code: string;
  /**
   * Language label in the header (`"bash"`).
   */
  language?: string;
  /**
   * File name or caption in the header.
   */
  title?: ReactNode;
  /**
   * Shows a copy button. Default is `true`.
   */
  copyable?: boolean;
  /**
   * Shows line numbers.
   */
  lineNumbers?: boolean;
  /**
   * Wraps long lines instead of scrolling.
   */
  wrap?: boolean;
  /**
   * Scrolls vertically past this height (any CSS length).
   */
  maxHeight?: string;
  className?: string;
}

/**
 * A block of monospaced code with an optional header and copy button.
 *
 * @example <CodeBlock title="install.sh" language="bash" code={"npm install @ionnet/iontronic"} />
 */
export function CodeBlock(props: CodeBlockProps) {
  const { code, wrap, lineNumbers, className } = props;
  // TODO(builder D): header (title, language, copy with navigator.clipboard + data-copied), line spans, max height
  return (
    <figure className={cx("io-code-block", className)} data-wrap={wrap || undefined}>
      <pre className="io-code-block-pre" data-line-numbers={lineNumbers || undefined}><code className="io-code-block-code">{code}</code></pre>
    </figure>
  );
}

export default CodeBlock;
