import { useState } from "react";
import {
  AlertTriangle, Archive, Bell, BellOff, Camera, Check, Clock, CreditCard, ExternalLink, House, Inbox, KeyRound, Layers, Lightbulb,
  RotateCw, Search, Server, Settings, SlidersHorizontal, Smartphone, Upload, Zap,
} from "@ionnet/iontronic/icons";
import {
  AppShell, Avatar, Badge, Button, Card, CardBody, CardFooter, CardHeader, Chip, Grid, Icon, IconTile, Input, List, ListGroup, ListItem,
  Meter, NavItem, NavSection, SegmentedControl, Sidebar, Stack, TabBar, TabBarItem, Tile, Timeline, TimelineItem,
} from "@ionnet/iontronic/react";
import { Example, Section } from "../docs/Demo";

// The reference inbox (reference/design-directions.html, Twilight) rebuilt from Iontronic components only. All content is
// sample data.

const TOPICS = [
  { name: "grid.alerts", category: 1, count: 3 },
  { name: "deploy.hostion", category: 2, count: 4 },
  { name: "timesheet", category: 3, count: 1 },
  { name: "ledger.renewals", category: 4, count: 2 },
  { name: "backups", category: 5, count: 2 },
] as const;

const FILTERS = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "acked", label: "Acked" },
];

function InboxList() {
  const [filter, setFilter] = useState("all");
  return (
    <Card padding="md">
      <Stack gap="12">
        <Stack direction="row" align="center" justify="between" gap="12" wrap>
          <h3 className="io-display" data-size="md" style={{ margin: 0 }}>Inbox</h3>
          <SegmentedControl options={FILTERS} value={filter} onValueChange={setFilter} size="sm" aria-label="Filter messages" />
        </Stack>
        <Input appearance="soft" leading={<Icon icon={Search} size="sm" />} placeholder="Search messages, topics, tags" aria-label="Search" />
        <List>
          <ListGroup label="Today">
            <ListItem
              icon={Server} category={1} title="web-01 is offline" badges={<Badge priority={5} />}
              description="No heartbeat for more than 5 min." meta={<span className="io-mono">grid.alerts</span>}
              trailing="17:00" unread selected interactive
            />
            <ListItem
              icon={Clock} category={3} title="7h40 logged today. Submit?" badges={<Badge priority={3} />}
              description="5h00 Grid · 2h40 Ping, from commits and terminal activity." meta={<span className="io-mono">timesheet</span>}
              trailing="17:00" unread interactive
            />
            <ListItem
              icon={Upload} category={2} title="ionnet-sso deployed" badges={<Badge priority={2} />}
              description="Healthy after 14 s · rolled out on hostion." meta={<span className="io-mono">deploy.hostion</span>}
              trailing="16:41" interactive
            />
            <ListItem
              icon={CreditCard} category={4} title="ionnet.dev renews in 5 days" badges={<Badge priority={4} />}
              description="Auto-renew is off. Renew before 17 Nov to keep the domain." meta={<span className="io-mono">ledger.renewals</span>}
              trailing="09:00" interactive
            />
            <ListItem
              icon={Archive} category={5} title="Nightly backup finished" badges={<Badge priority={1} />}
              description="ionserver · 12 min · no errors." meta={<span className="io-mono">backups</span>}
              trailing="03:12" interactive
            />
          </ListGroup>
        </List>
      </Stack>
    </Card>
  );
}

function MessageDetail() {
  return (
    <Card padding="lg">
      <Stack gap="16">
        <Stack direction="row" gap="6" wrap align="center">
          <Badge priority={5}>P5 · Urgent</Badge>
          <Chip category={1}>grid.alerts</Chip>
          <Chip>machine:web-01</Chip>
        </Stack>
        <h3 className="io-display" data-size="lg" style={{ margin: 0 }}>web-01 is offline</h3>
        <p className="io-text-muted" style={{ margin: 0 }}>
          No heartbeat for more than 5 minutes (since 16:55). It was last seen with load 0.4 and its disk 61% full.
        </p>
        <Stack direction="row" gap="8" wrap>
          <Button variant="primary" icon={RotateCw}>Restart agent</Button>
          <Button icon={BellOff}>Silence 1h</Button>
          <Button variant="ghost" icon={ExternalLink}>Open in Grid</Button>
        </Stack>
        <Timeline>
          <TimelineItem title="Fired" description="17:00 from Grid" />
          <TimelineItem title="Delivered" description="Pixel, desktop, 2 browser tabs" />
          <TimelineItem title="Escalating" description="in 3 min unless acknowledged" priority={4} />
        </Timeline>
        <Button icon={Check} fullWidth>Acknowledge</Button>
      </Stack>
    </Card>
  );
}

function DesktopInbox() {
  return (
    <AppShell
      height="800px"
      style={{ borderRadius: "var(--io-radius-sheet)" }}
      sidebar={
        <Sidebar brand="Ping" logo={<Icon icon={Bell} size="md" />}>
          <NavItem icon={Inbox} label="Inbox" count={12} active href="#ping-inbox" />
          <NavItem icon={AlertTriangle} label="Urgent" hotCount={1} href="#ping-urgent" />
          <NavItem icon={Clock} label="Digest" href="#ping-digest" />
          <NavItem icon={Layers} label="Topics" href="#ping-topics" />
          <NavItem icon={KeyRound} label="Sources" href="#ping-sources" />
          <NavItem icon={SlidersHorizontal} label="Rules" href="#ping-rules" />
          <NavItem icon={Smartphone} label="Devices" href="#ping-devices" />
          <NavSection label="Topics">
            {TOPICS.map((topic) => (
              <NavItem key={topic.name} variant="topic" label={topic.name} category={topic.category} count={topic.count} href={`#ping-${topic.name}`} />
            ))}
          </NavSection>
        </Sidebar>
      }
    >
      <Grid columns="minmax(0, 1.2fr) minmax(0, 1fr)" gap="14">
        <InboxList />
        <MessageDetail />
      </Grid>
    </AppShell>
  );
}

function PocketHome() {
  return (
    <div style={{ width: 360, maxWidth: "100%", margin: "0 auto" }}>
      <AppShell
        phone
        height="760px"
        style={{ borderRadius: 36, boxShadow: "var(--io-shadow-overlay)" }}
        tabBar={
          <TabBar aria-label="Main">
            <TabBarItem icon={Inbox} label="Inbox" active href="#pocket-inbox" />
            <TabBarItem icon={Zap} label="Control" href="#pocket-control" />
            <TabBarItem icon={House} label="Capture" href="#pocket-capture" />
            <TabBarItem icon={Settings} label="Settings" href="#pocket-settings" />
          </TabBar>
        }
      >
        <Stack gap="12">
          <Stack direction="row" align="end" justify="between">
            <div>
              <p className="io-label" style={{ margin: 0 }}>Thu 12 Nov</p>
              <h4 className="io-display" data-size="lg" style={{ margin: "var(--io-space-6) 0 0" }}>Evening</h4>
            </div>
            <Avatar name="Ion" />
          </Stack>
          <Card urgent>
            <CardHeader
              leading={<IconTile icon={Server} size="sm" category={1} />}
              title="web-01 is offline"
              description="grid.alerts · 2 min ago"
            />
            <CardFooter stretch>
              <Button variant="primary" size="sm">Restart</Button>
              <Button size="sm">Silence 1h</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader
              leading={<IconTile icon={Clock} size="sm" category={3} />}
              title="7h40 today"
              description="Ready to submit to Business Central"
            />
            <CardBody>
              <Meter
                aria-label="Hours by project"
                segments={[
                  { value: 300, label: "Grid", display: "5h00", category: 1 },
                  { value: 160, label: "Ping", display: "2h40", category: 2 },
                ]}
                legend
              />
            </CardBody>
            <CardFooter stretch>
              <Button variant="primary" size="sm">Submit</Button>
              <Button size="sm">Edit</Button>
            </CardFooter>
          </Card>
          <p className="io-label" style={{ margin: 0 }}>Quick</p>
          <Grid columns={4} gap="8">
            <Tile icon={Lightbulb} label="Lights" category={3} />
            <Tile icon={Zap} label="Grid" category={2} />
            <Tile icon={Clock} label="Hours" category={1} />
            <Tile icon={Camera} label="Receipt" category={4} />
          </Grid>
        </Stack>
      </AppShell>
    </div>
  );
}

export default function PingInbox() {
  return (
    <Section id="ping" title="Ping inbox" description="The reference inbox and Pocket home screen, rebuilt from Iontronic components only. Sample content.">
      <Example title="Desktop" wide>
        <div style={{ width: "100%", minWidth: 0, overflowX: "auto" }}>
          <div style={{ minWidth: 980 }}>
            <DesktopInbox />
          </div>
        </div>
      </Example>
      <Example title="Phone">
        <PocketHome />
      </Example>
    </Section>
  );
}
