import { useState } from "react";
import { Bell, Download, Mail, Moon, Plus, RotateCw, Search, Trash2 } from "@ionnet/iontronic/icons";
import {
  Button,
  Checkbox,
  Combobox,
  Field,
  Icon,
  Input,
  Radio,
  RadioGroup,
  SegmentedControl,
  Select,
  Stack,
  Slider,
  Switch,
  Textarea,
  type ButtonVariant,
  type ControlSize,
} from "@ionnet/iontronic/react";
import { Example, Section } from "../docs/Demo";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "ghost", "danger"];
const SIZES: ControlSize[] = ["sm", "md", "lg"];

const TOPICS = ["grid.alerts", "grid.backups", "deploy.hostion", "deploy.ionserver", "media.requests", "home.doorbell"];
const TOPIC_OPTIONS = TOPICS.map((topic) => ({ value: topic, label: topic }));

const PRIORITY_LABELS: Record<number, string> = { 1: "Min", 2: "Low", 3: "Default", 4: "High", 5: "Urgent" };

const FIELD_WIDTH = { width: "100%" } as const;

function PingSettingsForm() {
  const [topic, setTopic] = useState<string | null>("grid.alerts");
  const [delivery, setDelivery] = useState("instant");
  const [quiet, setQuiet] = useState(true);
  const [minimum, setMinimum] = useState(3);
  const [saved, setSaved] = useState(false);

  return (
    <form
      style={{ width: "100%", maxWidth: "28rem" }}
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
      }}
      onChange={() => setSaved(false)}
    >
      <Stack gap="20">
        <Select
          label="Topic"
          description="Notifications below apply to this topic only."
          value={topic}
          onValueChange={(next) => { setTopic(next); setSaved(false); }}
          options={[
            { label: "Grid", options: [{ value: "grid.alerts", label: "grid.alerts" }, { value: "grid.backups", label: "grid.backups" }] },
            { label: "Deploys", options: [{ value: "deploy.hostion", label: "deploy.hostion" }, { value: "deploy.ionserver", label: "deploy.ionserver" }] },
          ]}
        />
        <Stack gap="6">
          <span className="io-field-label">Delivery</span>
          <SegmentedControl
            aria-label="Delivery"
            fullWidth
            value={delivery}
            onValueChange={(next) => { setDelivery(next); setSaved(false); }}
            options={[
              { value: "instant", label: "Instant" },
              { value: "digest", label: "Digest" },
              { value: "silent", label: "Silent" },
            ]}
          />
        </Stack>
        <Switch
          label="Quiet hours 23:00–07:30"
          description="Silences everything below priority 4."
          placement="end"
          checked={quiet}
          onCheckedChange={(next) => { setQuiet(next); setSaved(false); }}
        />
        <Slider
          label="Minimum priority"
          description={`Only messages of ${PRIORITY_LABELS[minimum]} or higher will notify you.`}
          min={1}
          max={5}
          step={1}
          showValue
          format={(value) => `${value} · ${PRIORITY_LABELS[value]}`}
          value={minimum}
          onValueChange={(next) => { setMinimum(next as number); setSaved(false); }}
        />
        <Stack direction="row" gap="8" align="center" justify="end">
          {saved && <span className="io-text-muted" role="status">Saved</span>}
          <Button type="reset" variant="ghost" onClick={() => setSaved(false)}>Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </Stack>
      </Stack>
    </form>
  );
}

/**
 * Playground for the actions & forms group.
 */
export default function Forms() {
  const [loading, setLoading] = useState(false);

  return (
    <Section id="forms" title="Actions &amp; forms" description="Button, Field, Input, Textarea, Select, Combobox, Checkbox, RadioGroup, Switch, Slider, SegmentedControl.">
      <Example title="Button: variants and sizes" wide>
        <Stack gap="14">
          {SIZES.map((size) => (
            <Stack key={size} direction="row" gap="8" align="center" wrap>
              {VARIANTS.map((variant) => <Button key={variant} variant={variant} size={size}>{variant}</Button>)}
            </Stack>
          ))}
        </Stack>
      </Example>

      <Example title="Button: icons, loading, disabled">
        <Stack gap="12">
          <Stack direction="row" gap="8" align="center" wrap>
            <Button variant="primary" icon={RotateCw}>Restart agent</Button>
            <Button icon={Download}>Export</Button>
            <Button variant="ghost" icon={Plus}>New topic</Button>
            <Button variant="danger" icon={Trash2}>Delete</Button>
          </Stack>
          <Stack direction="row" gap="8" align="center" wrap>
            <Button iconOnly icon={Bell} aria-label="Notifications" size="sm" variant="primary" />
            <Button iconOnly icon={Bell} aria-label="Notifications" variant="primary" />
            <Button iconOnly icon={Search} aria-label="Search" />
            <Button iconOnly icon={Trash2} aria-label="Delete" variant="ghost" />
            <Button iconOnly icon={Trash2} aria-label="Delete" variant="danger" size="lg" />
          </Stack>
          <Stack direction="row" gap="8" align="center" wrap>
            <Button variant="primary" loading={loading} onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}>
              {loading ? "Saving" : "Click to load"}
            </Button>
            <Button variant="primary" loading>Saving</Button>
            <Button loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button disabled>Disabled</Button>
            <Button variant="ghost" disabled>Disabled</Button>
            <Button variant="danger" disabled>Disabled</Button>
          </Stack>
          <Button variant="primary" fullWidth>Full width</Button>
        </Stack>
      </Example>

      <Example title="Input: sizes and appearance">
        <Stack gap="12" style={FIELD_WIDTH}>
          <Input size="sm" placeholder="Small" aria-label="Small" />
          <Input placeholder="Medium" aria-label="Medium" />
          <Input size="lg" placeholder="Large" aria-label="Large" />
          <Input appearance="soft" leading={<Icon icon={Search} />} placeholder="Search messages, topics, tags" aria-label="Search" />
          <Input appearance="soft" size="lg" leading={<Icon icon={Search} />} placeholder="Soft, large" aria-label="Search large" />
        </Stack>
      </Example>

      <Example title="Input: field states">
        <Stack gap="14" style={FIELD_WIDTH}>
          <Input label="Topic" description="Sources can only publish to allowed topics." mono placeholder="grid.alerts" />
          <Input label="Email" required leading={<Icon icon={Mail} />} placeholder="you@ionnet.dev" type="email" />
          <Input label="Host" mono defaultValue="hostion.ionnet.dev" trailing={<span className="io-text-muted">:443</span>} />
          <Input label="Topic" mono defaultValue="grid alerts" error="Topics can't contain spaces." />
          <Input label="Disabled" disabled defaultValue="read only value" />
        </Stack>
      </Example>

      <Example title="Textarea">
        <Stack gap="14" style={FIELD_WIDTH}>
          <Textarea label="Message" description="Markdown is supported." rows={3} placeholder="Disk usage above 90% on hostion" />
          <Textarea label="Rule (mono, auto-grow)" mono resize="auto" rows={2} defaultValue={'{ "topic": "grid.*", "min": 4 }'} />
          <Textarea label="Message" error="A message is required." rows={2} />
          <Textarea label="Disabled" disabled defaultValue="Can't edit this" rows={2} />
        </Stack>
      </Example>

      <Example title="Select">
        <Stack gap="14" style={FIELD_WIDTH}>
          <Select
            label="Topic"
            description="Where the message is published."
            placeholder="Pick a topic"
            options={TOPIC_OPTIONS}
          />
          <Select
            label="Priority"
            size="sm"
            defaultValue={3}
            options={[
              { value: 5, label: "Urgent" },
              { value: 4, label: "High" },
              { value: 3, label: "Default" },
              { value: 2, label: "Low", disabled: true },
              { value: 1, label: "Min" },
            ]}
          />
          <Select label="Topic" size="lg" placeholder="Pick a topic" required error="Topic is required." options={TOPIC_OPTIONS} />
          <Select label="Disabled" disabled defaultValue="grid.alerts" options={TOPIC_OPTIONS} />
        </Stack>
      </Example>

      <Example title="Combobox">
        <Stack gap="14" style={FIELD_WIDTH}>
          <Combobox label="Topic" description="Type to filter." mono placeholder="Search topics" options={TOPIC_OPTIONS} />
          <Combobox label="Topic" size="sm" defaultValue="deploy.hostion" options={TOPIC_OPTIONS} />
          <Combobox label="Topic" error="Pick one of the existing topics." options={TOPIC_OPTIONS} emptyText="No topics match" />
          <Combobox label="Disabled" disabled defaultValue="grid.alerts" options={TOPIC_OPTIONS} />
        </Stack>
      </Example>

      <Example title="Checkbox">
        <Stack gap="14" style={FIELD_WIDTH}>
          <Checkbox label="Show acknowledged" defaultChecked />
          <Checkbox label="Group by topic" />
          <Checkbox label="Mark all as read" description="Applies to the current filter only." />
          <Checkbox label="Some topics selected" indeterminate />
          <Checkbox label="Email digest" placement="end" defaultChecked />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled, checked" disabled defaultChecked />
        </Stack>
      </Example>

      <Example title="RadioGroup">
        <Stack gap="20" style={FIELD_WIDTH}>
          <RadioGroup label="Delivery" description="How messages reach you." defaultValue="instant">
            <Radio value="instant" label="Instant" description="Push as soon as it arrives." />
            <Radio value="digest" label="Digest" description="One summary every morning." />
            <Radio value="silent" label="Silent" disabled />
          </RadioGroup>
          <RadioGroup label="Density" orientation="horizontal" defaultValue="comfortable">
            <Radio value="comfortable" label="Comfortable" />
            <Radio value="compact" label="Compact" />
          </RadioGroup>
          <RadioGroup label="Delivery" required error="Choose a delivery mode.">
            <Radio value="instant" label="Instant" />
            <Radio value="digest" label="Digest" />
          </RadioGroup>
        </Stack>
      </Example>

      <Example title="Switch">
        <Stack gap="14" style={FIELD_WIDTH}>
          <Switch label="Quiet hours 23:00–07:30" description="Silences everything below priority 4." defaultChecked />
          <Switch label="Desktop notifications" />
          <Switch size="sm" label="Small" defaultChecked />
          <Switch size="sm" label="Small, off" />
          <Switch label="Do not disturb" placement="end" defaultChecked />
          <Switch label="Disabled" disabled />
          <Switch label="Disabled, on" disabled defaultChecked />
          <Switch aria-label="No label" defaultChecked />
        </Stack>
      </Example>

      <Example title="Slider">
        <Stack gap="18" style={FIELD_WIDTH}>
          <Slider label="Volume" defaultValue={40} showValue format={(value) => `${value}%`} description="Notification sound level." />
          <Slider label="Priority range" min={1} max={5} defaultValue={[2, 4]} showValue />
          <Slider label="Retention (days)" min={1} max={90} defaultValue={30} showValue error="Retention can't exceed your plan." />
          <Slider label="Disabled" disabled defaultValue={60} showValue />
        </Stack>
      </Example>

      <Example title="SegmentedControl">
        <Stack gap="14" style={FIELD_WIDTH}>
          <SegmentedControl aria-label="Filter" defaultValue="all" options={[{ value: "all", label: "All" }, { value: "unread", label: "Unread" }, { value: "acked", label: "Acked" }]} />
          <SegmentedControl aria-label="Small" size="sm" defaultValue="all" options={[{ value: "all", label: "All" }, { value: "unread", label: "Unread" }, { value: "acked", label: "Acked" }]} />
          <SegmentedControl aria-label="Large" size="lg" defaultValue="digest" options={[{ value: "instant", label: "Instant" }, { value: "digest", label: "Digest" }, { value: "silent", label: "Silent" }]} />
          <SegmentedControl aria-label="Theme" fullWidth defaultValue="mail" options={[{ value: "mail", label: "Mail", icon: Mail }, { value: "bell", label: "Bell", icon: Bell }, { value: "moon", label: "Quiet", icon: Moon }]} />
          <SegmentedControl aria-label="Disabled option" defaultValue="a" options={[{ value: "a", label: "Active" }, { value: "b", label: "Disabled", disabled: true }, { value: "c", label: "Other" }]} />
          <SegmentedControl aria-label="Disabled" disabled defaultValue="a" options={[{ value: "a", label: "One" }, { value: "b", label: "Two" }]} />
        </Stack>
      </Example>

      <Example title="Field around a custom control">
        <Field label="Custom" description="Any control can sit inside a Field." error="Something is off.">
          <div style={{ padding: "10px 14px", borderRadius: "var(--io-radius-field)", background: "var(--io-color-surface-soft)" }}>Custom control</div>
        </Field>
      </Example>

      <Example title="Ping settings form" wide>
        <PingSettingsForm />
      </Example>
    </Section>
  );
}
