import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Archive, BellOff, Bell, Clock, FileText, HardDrive, House, Inbox, Lightbulb, LayoutGrid, Plus, Receipt, RotateCw, Rocket, Send,
  Server, Settings, SlidersHorizontal, Star, User,
} from "@ionnet/iontronic/icons";
import {
  Accordion, AppShell, Badge, Button, Card, CardBody, CardFooter, CardHeader, CodeBlock, EmptyState, Grid, Icon, IconTile, List, ListGroup,
  ListItem, NavItem, NavSection, Sidebar, Stack, TabBar, TabBarItem, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs,
  Tile, Timeline, TimelineItem,
} from "@ionnet/iontronic/react";
import { Example, Section } from "../docs/Demo";

const SOFT_BACKDROP: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "var(--io-space-16)",
  borderRadius: "var(--io-radius-panel)",
  background: "var(--io-color-bg)",
};

const WIDE: CSSProperties = { width: "100%", minWidth: 0 };

// A zero-width, full-min-width box keeps long code lines from widening the example cell (scroll containers still
// contribute their content width to intrinsic sizing).
const CLAMPED: CSSProperties = { width: 0, minWidth: "100%" };

const INSTALL_SNIPPET = `npm install @ionnet/iontronic
npm install react react-dom @base-ui/react lucide-react

# then, in your entry file
import "@ionnet/iontronic/styles.css";`;

const LONG_SNIPPET = `curl -fsSL https://tools.ionnet.dev/ping/install.sh | sh -s -- --channel stable --topic grid.alerts --host web-01.hostion --quiet-hours 22:00-07:00`;

const TOPICS = [
  { name: "grid.alerts", category: 1, count: 3 },
  { name: "deploy.hostion", category: 2, count: 12 },
  { name: "timesheet", category: 3, count: 1 },
  { name: "ledger.renewals", category: 4, count: 5 },
  { name: "backups", category: 5, count: 0 },
] as const;

const SERVERS = [
  { host: "web-01.hostion", status: "Offline", tone: "bad", cpu: "0.0", uptime: "0 d" },
  { host: "web-02.hostion", status: "Healthy", tone: "ok", cpu: "34.2", uptime: "41 d" },
  { host: "db-01.hostion", status: "Healthy", tone: "ok", cpu: "12.8", uptime: "118 d" },
  { host: "backup-01.hostion", status: "Degraded", tone: "warn", cpu: "71.5", uptime: "9 d" },
  { host: "ionserver", status: "Healthy", tone: "ok", cpu: "8.1", uptime: "203 d" },
] as const;

function InboxRows(props: { selectFirst?: boolean }) {
  return (
    <List>
      <ListGroup label="Today">
        <ListItem
          icon={Server}
          category={1}
          title="web-01 is offline"
          badges={<Badge priority={5} />}
          description="No heartbeat for more than 5 minutes. The last response was a 502 from the load balancer."
          meta={<span className="io-mono">grid.alerts</span>}
          trailing="17:00"
          selected={props.selectFirst}
          unread
          interactive
        />
        <ListItem
          icon={Rocket}
          category={2}
          title="Deploy finished"
          badges={<Badge tone="ok">Success</Badge>}
          description="ionnet/ping main was deployed to hostion in 48 seconds."
          meta={<span className="io-mono">deploy.hostion</span>}
          trailing="16:12"
          interactive
        />
      </ListGroup>
      <ListGroup label="Yesterday">
        <ListItem
          icon={Clock}
          category={3}
          title="Timesheet reminder"
          description="Friday hours are still missing for the Ping project."
          meta={<span className="io-mono">timesheet</span>}
          trailing="09:00"
          interactive
        />
      </ListGroup>
    </List>
  );
}

function DesktopShell() {
  return (
    <AppShell
      height="560px"
      style={{ borderRadius: "var(--io-radius-sheet)" }}
      sidebar={
        <Sidebar brand="Ping" logo={<Icon icon={Bell} size="md" />} footer={<NavItem icon={Settings} label="Settings" />}>
          <NavItem icon={Inbox} label="Inbox" hotCount={1} count={12} active href="#inbox" />
          <NavItem icon={Star} label="Starred" count={4} href="#starred" />
          <NavItem icon={Send} label="Sent" href="#sent" />
          <NavItem icon={Archive} label="Archive" count={238} href="#archive" />
          <NavSection label="Topics" action={<Icon icon={Plus} size="sm" label="Add topic" />}>
            {TOPICS.map((topic) => (
              <NavItem key={topic.name} label={topic.name} category={topic.category} count={topic.count || undefined} href={`#${topic.name}`} />
            ))}
          </NavSection>
        </Sidebar>
      }
      tabBar={
        <TabBar aria-label="Main">
          <TabBarItem icon={Inbox} label="Inbox" active badge={1} href="#inbox" />
          <TabBarItem icon={Star} label="Starred" href="#starred" />
          <TabBarItem icon={Archive} label="Archive" href="#archive" />
        </TabBar>
      }
    >
      <Card padding="md">
        <CardHeader title={<span className="io-display" data-size="sm">Inbox</span>} description="1 urgent, 11 unread" actions={<Button size="sm" icon={Plus}>New rule</Button>} />
        <CardBody><InboxRows selectFirst /></CardBody>
      </Card>
    </AppShell>
  );
}

function PocketHome() {
  const [lights, setLights] = useState(false);
  return (
    <div style={{ width: 360, maxWidth: "100%", margin: "0 auto" }}>
      <AppShell
        phone
        height="780px"
        style={{ borderRadius: 36, boxShadow: "var(--io-shadow-overlay)" }}
        tabBar={
          <TabBar aria-label="Main">
            <TabBarItem icon={House} label="Home" active href="#home" />
            <TabBarItem icon={Inbox} label="Inbox" badge={3} href="#pocket-inbox" />
            <TabBarItem icon={SlidersHorizontal} label="Control" href="#control" />
            <TabBarItem icon={User} label="Me" href="#me" />
          </TabBar>
        }
      >
        <Stack gap="12">
          <div>
            <p className="io-label" style={{ margin: 0 }}>Friday</p>
            <h4 className="io-display" data-size="md" style={{ margin: "var(--io-space-4) 0 0" }}>Good evening</h4>
          </div>
          <Card urgent>
            <CardHeader
              leading={<IconTile icon={Server} size="sm" priority={5} />}
              title="web-01 is offline"
              description={<span className="io-mono">grid.alerts · 2 min ago</span>}
              actions={<Badge priority={5} />}
            />
            <CardFooter stretch>
              <Button variant="primary" size="sm" icon={RotateCw}>Restart</Button>
              <Button size="sm" icon={BellOff}>Silence 1h</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader
              leading={<IconTile icon={Clock} size="sm" category={3} />}
              title="Timesheet"
              description="Week 46 · Ping project"
              actions={<span className="io-mono io-text-muted">6.5 / 8 h</span>}
            />
          </Card>
          <Grid columns={4} gap="8">
            <Tile icon={Lightbulb} label="Lights" category={3} active={lights} onClick={() => setLights(!lights)} />
            <Tile icon={LayoutGrid} label="Grid" category={1} />
            <Tile icon={Clock} label="Hours" category={4} />
            <Tile icon={Receipt} label="Receipt" category={5} />
          </Grid>
          <List>
            <ListItem
              icon={Rocket}
              category={2}
              title="Deploy finished"
              description="ionnet/ping main is live on hostion."
              meta={<span className="io-mono">deploy.hostion</span>}
              trailing="16:12"
              unread
              dense
              interactive
              style={{ background: "var(--io-color-surface)", boxShadow: "var(--io-shadow-card)" }}
            />
          </List>
        </Stack>
      </AppShell>
    </div>
  );
}

function section(children: ReactNode) {
  return <div style={WIDE}>{children}</div>;
}

export default function Display() {
  return (
    <Section id="display" title="Layout &amp; display" description="Card, AppShell, Sidebar, NavItem, TabBar, Tabs, Accordion, Table, List, Tile, Timeline, EmptyState, CodeBlock.">
      <Example title="Card" wide>
        <div style={SOFT_BACKDROP}>
          <Grid minChildWidth="14rem" gap="14">
            <Card>
              <CardHeader leading={<IconTile icon={HardDrive} size="sm" category={5} />} title="Default" description="Padding sm, 14px" />
              <CardBody className="io-text-muted">Nightly backups finished on all five hosts.</CardBody>
            </Card>
            <Card padding="lg">
              <CardHeader title="Padding lg" description="24px, detail panes" actions={<Badge tone="accent" size="sm">New</Badge>} />
              <CardBody className="io-text-muted">Use the larger padding for panes that hold forms or long text.</CardBody>
              <CardFooter><Button size="sm" variant="primary">Open</Button><Button size="sm" variant="ghost">Dismiss</Button></CardFooter>
            </Card>
            <Card interactive tabIndex={0}>
              <CardHeader leading={<IconTile icon={FileText} size="sm" category={4} />} title="Interactive" description="Hover me" />
              <CardBody className="io-text-muted">Gets a hover tint and a pointer.</CardBody>
            </Card>
            <Card selected>
              <CardHeader leading={<IconTile icon={Star} size="sm" tone="accent" />} title="Selected" description="Accent-soft fill" />
              <CardBody className="io-text-muted">Like the selected row in the inbox.</CardBody>
            </Card>
            <Card urgent>
              <CardHeader leading={<IconTile icon={Server} size="sm" priority={5} />} title="Urgent" description="Priority 5 tint" />
              <CardFooter stretch><Button size="sm" variant="primary">Restart</Button><Button size="sm">Silence 1h</Button></CardFooter>
            </Card>
          </Grid>
        </div>
      </Example>

      <Example title="AppShell, Sidebar and NavItem" wide>
        {section(<DesktopShell />)}
      </Example>

      <Example title="NavItem states">
        <div style={{ width: "100%", maxWidth: "15rem" }}>
          <Sidebar aria-label="NavItem states" style={{ height: "auto" }}>
            <NavItem icon={Inbox} label="Default" count={12} />
            <NavItem icon={Inbox} label="Active" count={12} active />
            <NavItem icon={Bell} label="Hot count" hotCount={4} count={12} />
            <NavItem icon={Bell} label="Disabled" disabled />
            <NavSection label="Topics">
              <NavItem label="grid.alerts" category={1} count={3} />
              <NavItem label="deploy.hostion" category={2} count={12} active />
              <NavItem label="custom.colour" color="#19a39a" />
            </NavSection>
          </Sidebar>
        </div>
      </Example>

      <Example title="TabBar">
        <div style={{ width: "100%", maxWidth: 360, overflow: "hidden", borderRadius: "var(--io-radius-panel)" }}>
          <TabBar aria-label="Demo">
            <TabBarItem icon={House} label="Home" active />
            <TabBarItem icon={Inbox} label="Inbox" badge={3} />
            <TabBarItem icon={SlidersHorizontal} label="Control" />
            <TabBarItem icon={User} label="Me" />
          </TabBar>
        </div>
      </Example>

      <Example title="Tabs">
        <Stack gap="24" style={WIDE}>
          <Tabs.Root defaultValue="overview">
            <Tabs.List>
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="rules" count={4}>Rules</Tabs.Tab>
              <Tabs.Tab value="devices" icon={Server} count={2}>Devices</Tabs.Tab>
              <Tabs.Tab value="archived" disabled>Archived</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview" className="io-text-muted">Line variant with a sliding accent indicator.</Tabs.Panel>
            <Tabs.Panel value="rules" className="io-text-muted">Four routing rules are active.</Tabs.Panel>
            <Tabs.Panel value="devices" className="io-text-muted">Two devices are registered.</Tabs.Panel>
          </Tabs.Root>
          <Tabs.Root defaultValue="all">
            <Tabs.List variant="pill">
              <Tabs.Tab value="all">All</Tabs.Tab>
              <Tabs.Tab value="unread" count={11}>Unread</Tabs.Tab>
              <Tabs.Tab value="starred" icon={Star}>Starred</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="all" className="io-text-muted">Pill variant, like a segmented control.</Tabs.Panel>
            <Tabs.Panel value="unread" className="io-text-muted">Eleven unread messages.</Tabs.Panel>
            <Tabs.Panel value="starred" className="io-text-muted">Nothing starred yet.</Tabs.Panel>
          </Tabs.Root>
        </Stack>
      </Example>

      <Example title="Accordion">
        <Stack gap="24" style={WIDE}>
          <Accordion.Root defaultValue={["quiet"]}>
            <Accordion.Item value="quiet">
              <Accordion.Trigger>Quiet hours</Accordion.Trigger>
              <Accordion.Panel>Pause everything below priority 4 between 22:00 and 07:00.</Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="digest">
              <Accordion.Trigger>Daily digest</Accordion.Trigger>
              <Accordion.Panel>Bundle low-priority messages into one summary at 08:00.</Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="locked" disabled>
              <Accordion.Trigger>Disabled section</Accordion.Trigger>
              <Accordion.Panel>Not reachable.</Accordion.Panel>
            </Accordion.Item>
          </Accordion.Root>
          <Accordion.Root variant="divided" defaultValue={["retention"]}>
            <Accordion.Item value="retention">
              <Accordion.Trigger>Retention</Accordion.Trigger>
              <Accordion.Panel>Messages are kept for 90 days, then archived.</Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="export">
              <Accordion.Trigger>Export</Accordion.Trigger>
              <Accordion.Panel>Download everything as JSON or CSV.</Accordion.Panel>
            </Accordion.Item>
          </Accordion.Root>
        </Stack>
      </Example>

      <Example title="Table" wide>
        <Stack gap="20" style={WIDE}>
          <div style={SOFT_BACKDROP}>
            <Table interactive>
              <TableHeader>
                <TableRow>
                  <TableHead>Host</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead numeric>CPU %</TableHead>
                  <TableHead numeric>Uptime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SERVERS.map((server, index) => (
                  <TableRow key={server.host} selected={index === 1}>
                    <TableCell><span className="io-mono">{server.host}</span></TableCell>
                    <TableCell><Badge tone={server.tone} size="sm">{server.status}</Badge></TableCell>
                    <TableCell numeric>{server.cpu}</TableCell>
                    <TableCell numeric>{server.uptime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div style={SOFT_BACKDROP}>
            <Table density="compact" maxHeight="9.5rem">
              <TableHeader>
                <TableRow>
                  <TableHead>Compact, sticky header</TableHead>
                  <TableHead align="center">Centre</TableHead>
                  <TableHead align="end">End</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SERVERS.concat(SERVERS).map((server, index) => (
                  <TableRow key={index}>
                    <TableCell><span className="io-mono">{server.host}</span></TableCell>
                    <TableCell align="center">{server.status}</TableCell>
                    <TableCell align="end">{server.uptime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Stack>
      </Example>

      <Example title="List" wide>
        <div style={{ ...SOFT_BACKDROP, background: "var(--io-color-surface)", padding: "var(--io-space-8)" }}>
          <InboxRows selectFirst />
        </div>
      </Example>

      <Example title="ListItem, dense and plain">
        <Stack gap="8" style={WIDE}>
          <ListItem dense title="Dense row" description="Tighter padding, description is never clamped, so a long line wraps over as many rows as it needs." trailing="12:04" interactive />
          <ListItem icon={Server} tone="info" title="Without description" trailing="11:30" />
          <ListItem leading={<IconTile size="md" tone="spark">AB</IconTile>} title="Custom leading" meta={<span className="io-mono">ab@hostion</span>} badges={<Badge size="sm" tone="info">Bot</Badge>} />
        </Stack>
      </Example>

      <Example title="Tile">
        <div style={SOFT_BACKDROP}>
          <Grid columns={4} gap="8">
            <Tile icon={Lightbulb} label="Lights" category={3} />
            <Tile icon={LayoutGrid} label="Grid" category={1} active />
            <Tile icon={Clock} label="Hours" category={4} />
            <Tile icon={Receipt} label="Receipt" category={5} disabled />
          </Grid>
        </div>
      </Example>

      <Example title="Timeline">
        <div style={WIDE}>
          <Timeline>
            <TimelineItem title="Fired" description="17:00 from Grid" time="17:00" />
            <TimelineItem title="Delivered" description="to 2 devices" time="17:00" />
            <TimelineItem title="Escalating" description="in 3 min unless acknowledged" priority={4} />
            <TimelineItem title="Failed" description="webhook returned 502" tone="bad" />
          </Timeline>
        </div>
      </Example>

      <Example title="EmptyState">
        <Stack gap="16" style={WIDE}>
          <EmptyState
            icon={Inbox}
            title="Inbox zero"
            description="Nothing needs you right now. New messages show up here the moment they arrive."
            actions={<><Button variant="primary" icon={Plus}>New rule</Button><Button variant="ghost">Learn more</Button></>}
          />
          <EmptyState size="sm" icon={BellOff} tone="warn" title="Muted" description="Quiet hours are on until 07:00." />
        </Stack>
      </Example>

      <Example title="CodeBlock">
        <Stack gap="14" style={CLAMPED}>
          <CodeBlock title="install.sh" language="bash" code={INSTALL_SNIPPET} lineNumbers />
          <CodeBlock language="bash" code={LONG_SNIPPET} wrap />
          <CodeBlock code={INSTALL_SNIPPET} copyable={false} maxHeight="4.5rem" />
        </Stack>
      </Example>

      <Example title="Pocket home preview" wide>
        <div style={{ ...WIDE, display: "grid", justifyItems: "center" }}>
          <PocketHome />
        </div>
      </Example>
    </Section>
  );
}
