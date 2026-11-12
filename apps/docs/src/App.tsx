import { useEffect } from "react";
import { Button, Stack, useTheme, type ThemeMode } from "@ionnet/iontronic/react";
import Core from "./sections/Core";
import Display from "./sections/Display";
import Forms from "./sections/Forms";
import Overlays from "./sections/Overlays";
import PingInbox from "./sections/PingInbox";

// Frozen: builders add content inside their section file only.
const SECTIONS = [
  { id: "core", title: "Core", Component: Core },
  { id: "forms", title: "Actions & forms", Component: Forms },
  { id: "overlays", title: "Overlays & feedback", Component: Overlays },
  { id: "display", title: "Layout & display", Component: Display },
  { id: "ping", title: "Ping inbox", Component: PingInbox },
];

const MODES: ThemeMode[] = ["light", "system", "dark"];

// `?only=forms` renders a single section, so headless screenshots can target one group.
const ONLY = new URLSearchParams(location.search).get("only");
// `?theme=dark` forces a mode for the same reason (headless browsers start in "system").
const FORCED_THEME = new URLSearchParams(location.search).get("theme") as ThemeMode | null;

export default function App() {
  const { mode, setMode } = useTheme();
  useEffect(() => {
    if (FORCED_THEME && MODES.includes(FORCED_THEME)) setMode(FORCED_THEME);
  }, [setMode]);
  return (
    <div className="docs io-backdrop">
      <header className="docs-header">
        <Stack direction="row" gap="12" align="center" justify="between" wrap>
          <h1 className="io-display" data-size="md">Iontronic</h1>
          <Stack direction="row" gap="4" role="group" aria-label="Theme">
            {MODES.map((value) => (
              <Button key={value} size="sm" variant={mode === value ? "primary" : "ghost"} aria-pressed={mode === value} onClick={() => setMode(value)}>
                {value}
              </Button>
            ))}
          </Stack>
        </Stack>
        <nav className="docs-nav" aria-label="Sections">
          {SECTIONS.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
        </nav>
      </header>
      <main className="docs-main">
        {SECTIONS.filter(({ id }) => !ONLY || id === ONLY).map(({ id, Component }) => <Component key={id} />)}
      </main>
    </div>
  );
}
