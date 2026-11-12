import type { ReactNode } from "react";
import { useRender } from "@base-ui/react/use-render";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import type { HueProps } from "../../utils/hue";
import { IconTile } from "../IconTile/IconTile";

/**
 * Props for {@link Tile}. Renders a `<button>`; pass `render={<a href="…" />}` for a link.
 */
export interface TileProps extends Omit<useRender.ComponentProps<"button">, "color">, HueProps {
  icon: LucideIcon;
  label: ReactNode;
  /**
   * Highlighted state (accent-soft background), for toggles such as Lights.
   */
  active?: boolean;
}

/**
 * A square quick-action button: tinted icon tile over a short label. Lay them out with `<Grid columns={4} gap="8">`.
 *
 * @example <Tile icon={Lightbulb} label="Lights" category={3} onClick={toggleLights} />
 */
export function Tile(props: TileProps) {
  const { render, icon, label, active, tone, priority, category, color, className, ...rest } = props;
  return useRender({
    render,
    defaultTagName: "button",
    props: {
      type: render ? undefined : "button",
      ...rest,
      className: cx("io-tile io-focus", className),
      "data-active": active || undefined,
      children: (
        <>
          <IconTile icon={icon} size="sm" tone={tone} priority={priority} category={category} color={color} />
          <span className="io-tile-label">{label}</span>
        </>
      ),
    },
  });
}

export default Tile;
