import { useState } from "react";
import { Archive, BellOff, Check, Clock, Copy, Link, MoreHorizontal, Server, Trash2, TriangleAlert, VolumeX, X } from "@ionnet/iontronic/icons";
import {
  AlertDialog, Avatar, Badge, Button, CATEGORIES, Chip, Dialog, Icon, Kbd, Menu, Meter, PRIORITIES, Popover, Progress, Select, Spinner, Stack,
  Tooltip, categoryFor, useToast, type Tone,
} from "@ionnet/iontronic/react";
import { Example, Section } from "../docs/Demo";

const TONES: Tone[] = ["neutral", "accent", "spark", "ok", "warn", "bad", "info"];
const TOPICS = ["grid.alerts", "ping.deploys", "backups", "web-01.cpu", "billing", "security"];

/**
 * A static, always-open copy of the dialog markup, so the look can be reviewed without opening anything.
 */
function DialogPreview(props: { sheet?: boolean }) {
  return (
    <div className="io-dialog" data-size="md" style={{ boxShadow: "var(--io-shadow-overlay)", maxWidth: "none", borderRadius: props.sheet ? "var(--io-radius-sheet) var(--io-radius-sheet) 0 0" : undefined }}>
      <div className="io-dialog-header">
        <div className="io-dialog-heading">
          <h2 className="io-dialog-title io-display" data-size="sm">Disk usage high on web-01</h2>
          <p className="io-dialog-description">grid.alerts · received 14:47</p>
        </div>
        <Button variant="ghost" size="sm" iconOnly icon={X} className="io-dialog-close" aria-label="Close" />
      </div>
      <div className="io-dialog-body">
        <Stack gap="12">
          <Stack direction="row" gap="8" align="center">
            <Badge priority={4} />
            <Chip category={categoryFor("grid.alerts")}>grid.alerts</Chip>
          </Stack>
          <span>/var/lib/docker is at 91% (182 GB of 200 GB). Pruning unused images frees about 24 GB.</span>
        </Stack>
      </div>
      <div className="io-dialog-footer">
        <Button>Snooze</Button>
        <Button variant="primary" icon={Check}>Acknowledge</Button>
      </div>
    </div>
  );
}

/**
 * Buttons that raise one toast per tone, plus the Undo and promise forms.
 */
function ToastDemo() {
  const toast = useToast();
  return (
    <>
      <Button onClick={() => toast.add({ title: "Message archived" })}>Neutral</Button>
      <Button onClick={() => toast.add({ title: "Token revoked", description: "Source ci-runner stopped sending.", tone: "ok" })}>Success</Button>
      <Button onClick={() => toast.add({ title: "Delivery is slow", description: "Retrying in 30 seconds.", tone: "warn" })}>Warning</Button>
      <Button onClick={() => toast.add({ title: "Could not reach web-01", tone: "bad" })}>Error</Button>
      <Button onClick={() => toast.add({ title: "3 new messages in grid.alerts", tone: "info" })}>Info</Button>
      <Button variant="primary" onClick={() => toast.add({ title: "Silenced web-01 for 1 hour", tone: "ok", action: { label: "Undo", onClick: () => toast.add({ title: "Silence undone" }) } })}>
        With Undo
      </Button>
      <Button onClick={() => {
        toast.add({ id: "sync", title: "Syncing inbox", description: "Fetching 12 messages", tone: "info", timeout: 0 });
        setTimeout(() => toast.update("sync", { tone: "ok", description: "Done", timeout: 3000 }), 1200);
      }}>
        Update in place
      </Button>
      <Button onClick={() => toast.promise(new Promise((resolve) => setTimeout(resolve, 1800)), { loading: "Sending test message", success: "Test message delivered", error: "Delivery failed" })}>
        Promise
      </Button>
    </>
  );
}

/**
 * A controlled progress bar that can be stepped.
 */
function ProgressDemo() {
  const [value, setValue] = useState(40);
  return (
    <Stack gap="12" style={{ width: "100%" }}>
      <Progress label="Uploading attachment" value={value} showValue />
      <Stack direction="row" gap="8">
        <Button size="sm" onClick={() => setValue((current) => Math.max(0, current - 20))}>-20</Button>
        <Button size="sm" onClick={() => setValue((current) => Math.min(100, current + 20))}>+20</Button>
      </Stack>
    </Stack>
  );
}

/**
 * Overlays and feedback: dialogs, menus, popovers, tooltips, toasts, progress, meters, spinners, badges, chips, avatars and keys.
 */
export default function Overlays() {
  const [showRead, setShowRead] = useState(true);
  const [sort, setSort] = useState("newest");

  return (
    <Section id="overlays" title="Overlays &amp; feedback" description="Dialog, AlertDialog, Menu, Popover, Tooltip, Toast, Progress, Meter, Spinner, Badge, Chip, Avatar, Kbd.">
      <Example title="AlertDialog">
        <AlertDialog.Root>
          <AlertDialog.Trigger variant="danger" icon={Trash2}>Revoke token</AlertDialog.Trigger>
          <AlertDialog.Content title="Revoke source token?" description="ci-runner stops sending messages immediately. Anything already delivered stays in your inbox.">
            <AlertDialog.Footer>
              <AlertDialog.Close>Cancel</AlertDialog.Close>
              <AlertDialog.Close variant="danger">Revoke</AlertDialog.Close>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Example>

      <Example title="Dialog (Ping message detail)">
        <Dialog.Root>
          <Dialog.Trigger variant="primary">Open message</Dialog.Trigger>
          <Dialog.Content title="Disk usage high on web-01" description="grid.alerts · received 14:47">
            <Dialog.Body>
              <Stack gap="12">
                <Stack direction="row" gap="8" align="center">
                  <Badge priority={4} />
                  <Chip category={categoryFor("grid.alerts")}>grid.alerts</Chip>
                  <Chip tone="info">machine:web-01</Chip>
                </Stack>
                <span>/var/lib/docker is at 91% (182 GB of 200 GB). Pruning unused images frees about 24 GB.</span>
                <Select label="Snooze for" defaultValue="1h" options={[{ value: "15m", label: "15 minutes" }, { value: "1h", label: "1 hour" }, { value: "1d", label: "1 day" }]} />
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close>Snooze</Dialog.Close>
              <Dialog.Close variant="primary" icon={Check}>Acknowledge</Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger>Small, no close</Dialog.Trigger>
          <Dialog.Content size="sm" showClose={false} title="Silence web-01?" description="Alerts still arrive, without sound.">
            <Dialog.Footer>
              <Dialog.Close>Cancel</Dialog.Close>
              <Dialog.Close variant="primary">Silence 1h</Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger>Large</Dialog.Trigger>
          <Dialog.Content size="lg" title="Delivery log" description="The last attempts for this message.">
            <Dialog.Body>
              <Stack gap="8">
                {["14:47:02 delivered to Ion's phone", "14:47:01 delivered to Desktop", "14:46:58 accepted from web-01"].map((line) => (
                  <span key={line} className="io-mono">{line}</span>
                ))}
              </Stack>
            </Dialog.Body>
            <Dialog.Footer><Dialog.Close variant="primary">Done</Dialog.Close></Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </Example>

      <Example title="Dialog preview (always open)" wide>
        <div style={{ width: "100%", display: "grid", gap: "var(--io-space-16)", gridTemplateColumns: "repeat(auto-fit, minmax(min(26rem, 100%), 1fr))" }}>
          <DialogPreview />
          <DialogPreview sheet />
        </div>
      </Example>

      <Example title="Menu on a message">
        <Menu.Root>
          <Menu.Trigger variant="secondary" iconOnly icon={MoreHorizontal} aria-label="Message actions" />
          <Menu.Content>
            <Menu.Item icon={Check} shortcut="A">Acknowledge</Menu.Item>
            <Menu.Item icon={Clock} shortcut="S">Snooze</Menu.Item>
            <Menu.Item icon={BellOff}>Mute topic</Menu.Item>
            <Menu.Separator />
            <Menu.Item tone="bad" icon={Trash2}>Delete</Menu.Item>
          </Menu.Content>
        </Menu.Root>
        <Menu.Root>
          <Menu.Trigger>View options</Menu.Trigger>
          <Menu.Content>
            <Menu.CheckboxItem checked={showRead} onCheckedChange={setShowRead}>Show read messages</Menu.CheckboxItem>
            <Menu.Separator />
            <Menu.Group>
              <Menu.Label>Sort by</Menu.Label>
              <Menu.RadioGroup value={sort} onValueChange={setSort}>
                <Menu.RadioItem value="newest">Newest first</Menu.RadioItem>
                <Menu.RadioItem value="priority">Priority</Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Group>
          </Menu.Content>
        </Menu.Root>
      </Example>

      <Example title="Menu / Popover surface (static)">
        <div className="io-popup io-menu" style={{ boxShadow: "var(--io-shadow-overlay)" }}>
          <div className="io-popup-label">Message</div>
          <div className="io-popup-item" data-highlighted=""><Icon icon={Check} className="io-popup-item-icon" />Acknowledge<span className="io-popup-item-shortcut">A</span></div>
          <div className="io-popup-item"><Icon icon={Clock} className="io-popup-item-icon" />Snooze</div>
          <div className="io-popup-item" data-disabled=""><Icon icon={BellOff} className="io-popup-item-icon" />Mute topic</div>
          <div className="io-popup-separator" />
          <div className="io-popup-item" data-tone="bad"><Icon icon={Trash2} className="io-popup-item-icon" />Delete</div>
        </div>
        <div className="io-popover" style={{ boxShadow: "var(--io-shadow-overlay)" }}>
          <h3 className="io-popover-title">Delivery</h3>
          <p className="io-popover-description">Sent to 2 of 3 devices. The tablet was offline.</p>
        </div>
      </Example>

      <Example title="Popover">
        <Popover.Root>
          <Popover.Trigger icon={Server}>web-01</Popover.Trigger>
          <Popover.Content title="web-01" description="Last seen 2 minutes ago on 10.0.4.12." showArrow>
            <Stack direction="row" gap="8">
              <Popover.Close size="sm">Close</Popover.Close>
              <Button size="sm" variant="primary" icon={VolumeX}>Silence</Button>
            </Stack>
          </Popover.Content>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger variant="ghost">No arrow, right</Popover.Trigger>
          <Popover.Content side="right" align="start" title="Topic rules">
            <Stack gap="8"><Chip category={2}>ping.deploys</Chip><Chip category={5}>backups</Chip></Stack>
          </Popover.Content>
        </Popover.Root>
      </Example>

      <Example title="Tooltip">
        <Tooltip content="Copy link" shortcut="⌘C">
          <Button iconOnly icon={Link} aria-label="Copy link" />
        </Tooltip>
        <Tooltip content="Archive" side="bottom">
          <Button iconOnly icon={Archive} aria-label="Archive" />
        </Tooltip>
        <Tooltip content="Copy ID" side="right" defaultOpen>
          <Button iconOnly icon={Copy} aria-label="Copy ID" />
        </Tooltip>
      </Example>

      <Example title="Toast (live)">
        <ToastDemo />
      </Example>

      <Example title="Toast (static)">
        <Stack gap="10" style={{ width: "100%" }}>
          <div className="io-toast">
            <div className="io-toast-content"><div className="io-toast-title">Silenced web-01 for 1 hour</div></div>
            <button className="io-toast-action" type="button">Undo</button>
            <button className="io-toast-close" type="button" aria-label="Dismiss"><Icon icon={X} size="sm" /></button>
          </div>
          {(["ok", "warn", "bad", "info"] as const).map((tone) => (
            <div key={tone} className="io-toast" data-tone={tone}>
              <span className="io-toast-icon io-hue" data-tone={tone}><Icon icon={tone === "ok" ? Check : TriangleAlert} size="lg" /></span>
              <div className="io-toast-content">
                <div className="io-toast-title">{tone === "ok" ? "Token revoked" : `Heads up (${tone})`}</div>
                <div className="io-toast-description">Source ci-runner stopped sending.</div>
              </div>
              <button className="io-toast-close" type="button" aria-label="Dismiss"><Icon icon={X} size="sm" /></button>
            </div>
          ))}
          <div className="io-toast" data-type="loading">
            <span className="io-toast-icon io-hue"><Spinner size="lg" /></span>
            <div className="io-toast-content"><div className="io-toast-title">Sending test message</div></div>
          </div>
        </Stack>
      </Example>

      <Example title="Badge: priority">
        {PRIORITIES.map((priority) => <Badge key={priority} priority={priority} />)}
      </Example>

      <Example title="Badge: appearance and tone">
        <Stack gap="10">
          {(["soft", "solid", "outline"] as const).map((appearance) => (
            <Stack key={appearance} direction="row" gap="8" wrap>
              {TONES.map((tone) => <Badge key={tone} tone={tone} appearance={appearance}>{tone}</Badge>)}
            </Stack>
          ))}
          <Stack direction="row" gap="8" wrap align="center">
            <Badge tone="ok" appearance="solid" icon={Check}>Healthy</Badge>
            <Badge tone="warn" icon={TriangleAlert} size="sm">Degraded</Badge>
            <Badge priority={5} appearance="solid" size="sm" />
            <Badge category={3} appearance="outline">grid</Badge>
            <Badge color="#ec4899">custom</Badge>
          </Stack>
        </Stack>
      </Example>

      <Example title="Chip">
        <Stack gap="10">
          <Stack direction="row" gap="8" wrap>
            {TOPICS.map((topic) => <Chip key={topic} category={categoryFor(topic)}>{topic}</Chip>)}
          </Stack>
          <Stack direction="row" gap="8" wrap>
            {CATEGORIES.map((category) => <Chip key={category} category={category}>category.{category}</Chip>)}
          </Stack>
          <Stack direction="row" gap="8" wrap>
            <Chip>plain</Chip>
            <Chip tone="ok">ok</Chip>
            <Chip icon={Server}>with icon</Chip>
            <Chip onRemove={() => undefined}>machine:web-01</Chip>
            <Chip category={4} onRemove={() => undefined}>removable</Chip>
            <Chip disabled>disabled</Chip>
          </Stack>
          <ChipFilters />
        </Stack>
      </Example>

      <Example title="Avatar">
        <Avatar name="Ion" size="sm" />
        <Avatar name="Ion" />
        <Avatar name="Ion Net" size="lg" />
        <Avatar name="Grid" tone="accent" />
        <Avatar category={3} name="web-01" />
        <Avatar src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Crect width='8' height='8' fill='%236c5ce7'/%3E%3Ccircle cx='4' cy='4' r='2.5' fill='%23fdcb6e'/%3E%3C/svg%3E" name="Photo" size="lg" />
      </Example>

      <Example title="Kbd">
        <Kbd>Esc</Kbd>
        <Kbd keys={["⌘", "K"]} />
        <Kbd keys={["Ctrl", "Shift", "P"]} size="sm" />
      </Example>

      <Example title="Progress">
        <ProgressDemo />
        <Stack gap="12" style={{ width: "100%" }}>
          <Progress label="Syncing" value={null} />
          <Progress value={72} size="sm" aria-label="Small" />
          <Progress label="Backup" value={100} tone="ok" showValue />
          <Progress label="Quota" value={86} tone="warn" showValue format={(value, max) => `${value} / ${max} GB`} />
        </Stack>
      </Example>

      <Example title="Meter">
        <Stack gap="14" style={{ width: "100%" }}>
          <Meter label="Disk" value={61} showValue tone="ok" />
          <Meter label="Memory" value={88} showValue tone="warn" size="sm" />
          <Meter value={30} aria-label="CPU" />
        </Stack>
      </Example>

      <Example title="Meter: Timesheet split">
        <Stack gap="14" style={{ width: "100%" }}>
          <Meter segments={[
            { value: 300, label: "Grid", display: "5h00", category: 1 },
            { value: 160, label: "Ping", display: "2h40", category: 2 },
          ]} />
          <Meter size="sm" segments={[
            { value: 3, label: "Build", display: "3h", category: 1 },
            { value: 2, label: "Review", display: "2h", category: 4 },
            { value: 1, label: "Admin", display: "1h", category: 6 },
          ]} legend={false} aria-label="Build 3h, Review 2h, Admin 1h" />
        </Stack>
      </Example>

      <Example title="Spinner">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
        <span style={{ color: "var(--io-color-accent)" }}><Spinner size="lg" /></span>
      </Example>
    </Section>
  );
}

/**
 * Toggle chips acting as a topic filter.
 */
function ChipFilters() {
  const [active, setActive] = useState<string[]>(["grid.alerts"]);
  const toggle = (topic: string) => setActive((current) => current.includes(topic) ? current.filter((entry) => entry !== topic) : [...current, topic]);
  return (
    <Stack direction="row" gap="8" wrap>
      {TOPICS.slice(0, 4).map((topic) => (
        <Chip key={topic} category={categoryFor(topic)} selected={active.includes(topic)} onClick={() => toggle(topic)}>{topic}</Chip>
      ))}
    </Stack>
  );
}
