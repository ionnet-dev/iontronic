import { Example, Section } from "../docs/Demo";

// Owner: main session, built last (after groups A–D). Recreates the reference mock (reference/design-directions.html,
// Twilight) from components only, with no custom CSS beyond docs.css:
// - Desktop (Example wide): AppShell + Sidebar (brand "Ping", NavItems Inbox 12 active / Urgent hot 1 / Digest / Topics /
//   Sources / Rules / Devices, NavSection "Topics" with topic NavItems by category) + Grid "minmax(0,1.2fr) minmax(0,1fr)"
//   of a list Card (io-display "Inbox", SegmentedControl All/Unread/Acked, Input appearance="soft" search,
//   List > ListGroup "Today" > ListItems with IconTile, Badge priority, mono meta, time, unread, selected) and a detail
//   Card (Badges + Chips, io-display title, Button primary/secondary/ghost, Timeline, full-width Acknowledge).
// - Phone (Example): header with io-label date + io-display "Evening" + Avatar, urgent Card with CardFooter stretch,
//   hours Card with segmented Meter, io-label "Quick" + Grid columns={4} of Tiles, TabBar with 4 TabBarItems.
export default function PingInbox() {
  return (
    <Section id="ping" title="Ping inbox" description="The reference inbox and phone home screen, rebuilt from Iontronic components.">
      <Example title="Desktop" wide>
        {/* TODO(main): desktop inbox */}
      </Example>
      <Example title="Phone">
        {/* TODO(main): Pocket home screen */}
      </Example>
    </Section>
  );
}
