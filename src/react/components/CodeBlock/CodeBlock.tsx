import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cx } from "../../../cx";
import { useScrollable } from "../../utils/useScrollable";
import { Icon } from "../Icon/Icon";

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
  /**
   * Accessible name of the scrollable code region. Default is the title, then the language, then `"Code"`.
   */
  label?: string;
  /**
   * Accessible name of the copy button. Default is `"Copy code"`.
   */
  copyLabel?: string;
  /**
   * Accessible name of the copy button after copying. Default is `"Copied"`.
   */
  copiedLabel?: string;
  className?: string;
}

const COPIED_RESET_MS = 1600;

/**
 * A block of monospaced code with an optional header and copy button.
 *
 * @example <CodeBlock title="install.sh" language="bash" code={"npm install @ionnet/iontronic"} />
 */
export function CodeBlock(props: CodeBlockProps) {
  const { code, language, title, copyable = true, lineNumbers, wrap, maxHeight, label, copyLabel = "Copy code", copiedLabel = "Copied", className } = props;
  const [preRef, scrollable] = useScrollable<HTMLPreElement>();
  const regionLabel = label ?? (typeof title === "string" ? title : language ?? "Code");
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hasHeader = title != null || language != null || copyable;
  const lines = code.replace(/\n$/, "").split("\n");

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
  }

  return (
    <figure className={cx("io-code-block", className)} data-wrap={wrap || undefined} style={maxHeight ? ({ "--_max-height": maxHeight } as CSSProperties) : undefined}>
      {hasHeader && (
        <figcaption className="io-code-block-header">
          {title != null && <span className="io-code-block-title">{title}</span>}
          {language != null && <span className="io-code-block-language">{language}</span>}
          {copyable && (
            <button type="button" className="io-code-block-copy io-focus" data-copied={copied || undefined} aria-label={copied ? copiedLabel : copyLabel} onClick={copy}>
              <Icon icon={copied ? Check : Copy} size="md" />
            </button>
          )}
        </figcaption>
      )}
      <pre ref={preRef} className="io-code-block-pre io-focus" data-line-numbers={lineNumbers || undefined} tabIndex={scrollable ? 0 : undefined} role={scrollable ? "region" : undefined} aria-label={scrollable ? regionLabel : undefined}>
        <code className="io-code-block-code">
          {lines.map((line, index) => (
            <span key={index} className="io-code-block-line">{line}{lineNumbers ? "" : "\n"}</span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

export default CodeBlock;
