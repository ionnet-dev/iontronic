import { Bell, Check, Cloud, Database, Folder, HardDrive, Inbox, Search, Server, Settings, Trash2, Zap } from "@ionnet/iontronic/icons";
import { CATEGORIES, Grid, Icon, IconTile, PRIORITIES, Separator, Stack, vars, type Tone } from "@ionnet/iontronic/react";
import type { CSSProperties, ReactNode } from "react";
import { Example, Section } from "../docs/Demo";

const TONES: Tone[] = ["neutral", "accent", "spark", "ok", "warn", "bad", "info"];

const TYPE_SCALE = [
  { token: "5xl", size: "2xl" },
  { token: "4xl", size: "xl" },
  { token: "3xl", size: "lg" },
  { token: "2xl", size: "md" },
  { token: "xl", size: "sm" },
] as const;

const BODY_SCALE = [
  { token: "lg", note: "Lead paragraph" },
  { token: "base", note: "Body text, row titles" },
  { token: "md", note: "Controls, menus" },
  { token: "sm", note: "Meta, descriptions" },
  { token: "xs", note: "Chips, counts, timestamps" },
  { token: "2xs", note: "Uppercase labels" },
] as const;

const SURFACES = [
  ["bg", vars.color.bg],
  ["surface", vars.color.surface],
  ["surfaceSoft", vars.color.surfaceSoft],
  ["surfaceRaised", vars.color.surfaceRaised],
  ["inverse", vars.color.inverse],
  ["line", vars.color.line],
  ["lineStrong", vars.color.lineStrong],
  ["controlBorder", vars.color.controlBorder],
] as const;

const ACCENT = [
  ["accent", vars.color.accent],
  ["accentHover", vars.color.accentHover],
  ["accentSoft", vars.color.accentSoft],
  ["accentFillStart", vars.color.accentFillStart],
  ["accentFillEnd", vars.color.accentFillEnd],
  ["accentFill", vars.color.accentFill],
  ["spark", vars.color.spark],
  ["sparkMark", vars.color.sparkMark],
  ["sparkSoft", vars.color.sparkSoft],
] as const;

const STATUS = [
  ["ok", vars.color.ok],
  ["warn", vars.color.warn],
  ["bad", vars.color.bad],
  ["info", vars.color.info],
  ["hueText.ok", vars.color.hueText.ok],
  ["hueText.warn", vars.color.hueText.warn],
  ["hueText.bad", vars.color.hueText.bad],
  ["hueText.info", vars.color.hueText.info],
] as const;

const SIDEBAR = [
  ["bg", vars.color.sidebar.bg],
  ["fg", vars.color.sidebar.fg],
  ["muted", vars.color.sidebar.muted],
  ["hover", vars.color.sidebar.hover],
  ["active", vars.color.sidebar.active],
  ["line", vars.color.sidebar.line],
] as const;

const swatchStyle: CSSProperties = {
  width: "100%",
  aspectRatio: "3 / 2",
  borderRadius: vars.radius.item,
  boxShadow: `inset 0 0 0 1px ${vars.color.line}`,
};

function Swatch(props: { name: string; value: string; backdrop?: string }) {
  const { name, value, backdrop } = props;
  return (
    <Stack gap="6">
      <div style={{ ...swatchStyle, background: backdrop ? `linear-gradient(${value}, ${value}), ${backdrop}` : value }} />
      <span className="io-mono" style={{ fontSize: vars.text.xs, color: vars.color.textMuted }}>{name}</span>
    </Stack>
  );
}

function Swatches(props: { items: readonly (readonly [string, string])[]; backdrop?: string }) {
  return (
    <Grid minChildWidth="7.5rem" gap="12" style={{ width: "100%" }}>
      {props.items.map(([name, value]) => <Swatch key={name} name={name} value={value} backdrop={props.backdrop} />)}
    </Grid>
  );
}

function Box(props: { children?: ReactNode }) {
  return (
    <div style={{ padding: vars.space["10"], background: vars.color.accentSoft, color: vars.color.accent, borderRadius: vars.radius.item, textAlign: "center", fontSize: vars.text.sm, fontWeight: vars.weight.semibold }}>
      {props.children}
    </div>
  );
}

/**
 * Playground section for the core group: type scale, colour tokens, icons, icon tiles, layout and the popup surface.
 */
export default function Core() {
  return (
    <Section id="core" title="Core" description="Tokens, typography, icons, icon tiles, Stack, Grid, Separator and the popup surface.">
      <Example title="Display scale (Bricolage Grotesque, 750)" wide>
        <Stack gap="8" style={{ width: "100%" }}>
          {TYPE_SCALE.map(({ token, size }) => (
            <Stack key={token} direction="row" gap="16" align="baseline">
              <span className="io-label" style={{ width: "2.5rem" }}>{token}</span>
              <span className="io-display" data-size={size}>Pings, quietly delivered</span>
            </Stack>
          ))}
        </Stack>
      </Example>

      <Example title="Interface scale (Figtree)">
        <Stack gap="8" style={{ width: "100%" }}>
          {BODY_SCALE.map(({ token, note }) => (
            <Stack key={token} direction="row" gap="12" align="baseline">
              <span className="io-label" style={{ width: "2rem" }}>{token}</span>
              <span style={{ fontSize: vars.text[token] }}>{note}</span>
            </Stack>
          ))}
        </Stack>
      </Example>

      <Example title="Mono and utilities">
        <Stack gap="10" style={{ width: "100%" }}>
          <span className="io-label">Section label</span>
          <span className="io-mono">deploy.prod/ledger · 14:47:20</span>
          <span className="io-tnum">0123456789 tabular figures</span>
          <span className="io-text-muted">Muted secondary text</span>
          <span className="io-text-muted" style={{ color: vars.color.textSubtle }}>Subtle placeholder text</span>
          <div style={{ width: "12rem" }}><div className="io-truncate">A long title that is cut off with an ellipsis at the edge</div></div>
        </Stack>
      </Example>

      <Example title="Colour: surfaces and lines" wide>
        <Swatches items={SURFACES} />
      </Example>

      <Example title="Colour: accent and spark" wide>
        <Swatches items={ACCENT} />
        <Swatches items={[["accentFill", vars.gradient.accentFill], ["logoFill", vars.gradient.logoFill], ["backdrop", vars.gradient.backdrop]]} />
      </Example>

      <Example title="Colour: status">
        <Swatches items={STATUS} />
      </Example>

      <Example title="Colour: sidebar (indigo in both themes)">
        <Swatches items={SIDEBAR} backdrop={vars.color.sidebar.bg} />
      </Example>

      <Example title="Colour: priority 1–5" wide>
        <Swatches items={PRIORITIES.slice().reverse().map((p) => [`priority ${p}`, vars.color.priority[`${p}`]] as const)} />
      </Example>

      <Example title="Colour: category 1–8" wide>
        <Swatches items={CATEGORIES.map((c) => [`category ${c}`, vars.color.category[`${c}`]] as const)} />
      </Example>

      <Example title="Icon sizes">
        {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
          <Stack key={size} gap="6" align="center">
            <Icon icon={Search} size={size} />
            <span className="io-label">{size}</span>
          </Stack>
        ))}
        <Stack gap="6" align="center">
          <Icon icon={Bell} size={32} strokeWidth={1.5} />
          <span className="io-label">32 / 1.5</span>
        </Stack>
      </Example>

      <Example title="Icon colours">
        <Icon icon={Check} size="lg" style={{ color: vars.color.ok }} />
        <Icon icon={Zap} size="lg" style={{ color: vars.color.spark }} />
        <Icon icon={Trash2} size="lg" style={{ color: vars.color.bad }} />
        <Icon icon={Settings} size="lg" label="Settings" />
      </Example>

      <Example title="IconTile sizes">
        <IconTile icon={Server} size="sm" tone="accent" />
        <IconTile icon={Server} size="md" tone="accent" />
        <IconTile icon={Server} size="lg" tone="accent" />
        <IconTile size="md" tone="spark">AB</IconTile>
      </Example>

      <Example title="IconTile tones">
        {TONES.map((tone) => <IconTile key={tone} icon={Inbox} tone={tone} />)}
      </Example>

      <Example title="IconTile categories" wide>
        {CATEGORIES.map((category) => <IconTile key={category} icon={[Server, Cloud, Database, HardDrive, Folder, Bell, Zap, Search][category - 1]} category={category} />)}
      </Example>

      <Example title="IconTile priorities and custom colour">
        {PRIORITIES.slice().reverse().map((priority) => <IconTile key={priority} icon={Bell} priority={priority} />)}
        <IconTile icon={Zap} color="#19a39a" />
      </Example>

      <Example title="Stack">
        <Stack gap="8" style={{ width: "100%" }}>
          <Stack direction="row" gap="8" align="center" justify="between">
            <Box>row</Box><Box>justify between</Box><Box>align center</Box>
          </Stack>
          <Stack direction="row" gap="4" wrap>
            {Array.from({ length: 9 }, (_, i) => <Box key={i}>{`wrap ${i + 1}`}</Box>)}
          </Stack>
          <Stack gap="4"><Box>column</Box><Box>gap 4</Box></Stack>
        </Stack>
      </Example>

      <Example title="Grid">
        <Stack gap="10" style={{ width: "100%" }}>
          <Grid columns={4} gap="8">{Array.from({ length: 4 }, (_, i) => <Box key={i}>{`4 cols ${i + 1}`}</Box>)}</Grid>
          <Grid columns="5rem minmax(0, 1fr)" gap="8"><Box>fixed</Box><Box>template</Box></Grid>
          <Grid minChildWidth="7rem" gap="8">{Array.from({ length: 5 }, (_, i) => <Box key={i}>{`auto ${i + 1}`}</Box>)}</Grid>
        </Stack>
      </Example>

      <Example title="Separator">
        <Stack gap="12" style={{ width: "100%" }}>
          <span>Above</span>
          <Separator />
          <span>Between</span>
          <Separator inset />
          <span>Inset</span>
          <Stack direction="row" gap="12" align="center" style={{ height: "1.5rem" }}>
            <span>Left</span><Separator orientation="vertical" /><span>Middle</span><Separator orientation="vertical" /><span>Right</span>
          </Stack>
        </Stack>
      </Example>

      <Example title="Popup surface (static preview)">
        <div className="io-popup" style={{ width: "100%", maxWidth: "18rem" }}>
          <div className="io-popup-label">Actions</div>
          <div className="io-popup-item" data-highlighted>
            <Icon className="io-popup-item-icon" icon={Folder} />
            Open folder
            <span className="io-popup-item-shortcut">Ctrl O</span>
          </div>
          <div className="io-popup-item" data-checked>
            <span className="io-popup-item-indicator"><Icon icon={Check} size="sm" /></span>
            Selected item
          </div>
          <div className="io-popup-item" data-disabled>
            <Icon className="io-popup-item-icon" icon={Settings} />
            Disabled
          </div>
          <div className="io-popup-separator" />
          <div className="io-popup-item" data-tone="bad">
            <Icon className="io-popup-item-icon" icon={Trash2} />
            Delete
            <span className="io-popup-item-shortcut">Del</span>
          </div>
        </div>
        <div className="io-popup" style={{ width: "100%", maxWidth: "18rem" }}>
          <div className="io-popup-empty">No results</div>
        </div>
      </Example>
    </Section>
  );
}
