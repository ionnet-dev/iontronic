import type { ReactNode } from "react";

/**
 * Props for {@link Section}.
 */
export interface SectionProps {
  /**
   * Anchor ID, matching the nav in `App.tsx`.
   */
  id: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}

/**
 * Props for {@link Example}.
 */
export interface ExampleProps {
  /**
   * Component name or variant shown above the demo.
   */
  title: ReactNode;
  children?: ReactNode;
  /**
   * Lets the demo span the full row.
   */
  wide?: boolean;
}

/**
 * A playground section (one per ownership group).
 */
export function Section(props: SectionProps) {
  const { id, title, description, children } = props;
  return (
    <section id={id} className="docs-section">
      <div className="docs-section-head">
        <h2 className="io-display" data-size="lg">{title}</h2>
        {description != null && <p className="io-text-muted">{description}</p>}
      </div>
      <div className="docs-grid">{children}</div>
    </section>
  );
}

/**
 * One labelled demo cell inside a {@link Section}.
 */
export function Example(props: ExampleProps) {
  const { title, children, wide } = props;
  return (
    <div className="docs-example" data-wide={wide || undefined}>
      <h3 className="io-label">{title}</h3>
      <div className="docs-example-body">{children}</div>
    </div>
  );
}

export default Section;
