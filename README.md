# CSI Student Chapter — SRMIST Vadapalani

Website for the Computer Society of India Student Chapter at SRMIST Vadapalani.

Live at https://csi-srmistvdp.vercel.app/

## What this is for

Our chapter runs sessions fairly regularly, and until now the only record of
them was a poster in a WhatsApp group. Those scroll away in about a week. Six
months later nobody can tell you who spoke or what was covered.

So I built somewhere for them to live. Each session keeps its poster, speaker,
venue and topics on its own page. If a junior wants to see what the chapter has
been doing, or a speaker wants to link to their talk, or next year's office
bearers want to know what happened before them, it's there.

I also wanted it to look like someone actually cared. Students judge a chapter
by whatever page they land on first, and a stock template says nobody did.

## Versions

Every version is kept here as history: what it had, what changed and why. The
newest is at the bottom.

| Version | Dates | In one line |
|---|---|---|
| [v1](#v1-the-first-release) | 21 Aug to 17 Sep 2026 | The first public site: every session, the team and the chapter in one place |
| [v2](#what-changed-in-v2) | 17 Sep 2026 | A cleanup: stricter type, spacing and buttons, honest copy, one main action |
| [v3](#what-changed-in-v3) | 17 Sep 2026 onward, **live now** | The feel of using it: an animated hero, a folding menu, a card that opens out of the seal, a team rail with momentum |

Still on the list:

- Speaker names and proper write-ups for the older sessions.
- A chapter email address, so the Contact column and the FAQ don't have to
  point to LinkedIn.
- A real domain instead of the deployment subdomain.
- Search across sessions, once there are enough of them to need it.

If you're in the chapter and want something added, open an issue.

## v1: the first release

Built from scratch in August 2026 and live from 21 August. The aim was simple:
give the chapter's sessions somewhere to live other than a WhatsApp poster that
scrolls away in a week.

What it had:

- **A sky hero.** A generated sky photograph cropped two ways (tall for
  phones, wide for laptops), the headline "Where curious students build
  community and technology together." with "community" and "technology" in a
  handwritten script, the CSI emblem, and buttons to explore events and follow
  on LinkedIn.
- **This month's session and the month's highlight**, as large cards with the
  poster, date, venue and speaker. The highlight card sat in a green canopy
  photograph with a grass-and-cloud artwork button.
- **"Learning looks better in action."** A collage of photographs from the
  sessions, with a way into the photo library.
- **An archive of every session**, each with its own page: summary, what we
  explored, key takeaways, a quote, the speaker, student feedback, a captioned
  photo gallery and a link to the full report. Filters split sessions by type.
- **A photo library** with one album per session, shown as a stack of covers,
  with a curved scroller down the right edge on phones.
- **The team**, faculty first, in a scrollable rail with arrows, and a full
  Team page.
- **Insights**: one idea worth keeping from each session, on the home page.
- **Social links**: two glass cards over a photograph of rolling hills, one for
  LinkedIn and one for Instagram.
- **The college seal** in the navigation, opening a small card that links to
  the SRMIST Vadapalani website and fades away when closed.
- **Search and sharing basics**: page titles and descriptions, a square link
  preview image, structured data for the chapter and each event, and a sitemap.

How it looked: an editorial layout with large headings and a lot of space,
navy on cream, four to five typefaces (Instrument Sans, Playfair Display and
later Instrument Serif, Inter, Great Vibes, and Times New Roman on the
highlight card), a metallic edge on cards that shifts while you scroll, and
sections that fade and rise as they come into view.

What v1 taught us, and why v2 followed: the type, spacing and buttons had
drifted into too many sizes and styles; some copy was filler; a few details
weren't confirmed; the footer credited one person rather than the chapter; and
the site was fine on a laptop but only adapted, not designed, for phones.

## What changed in v2

### Where the ideas came from

Before changing anything I studied [NotchOwl](https://www.notchowl.com/), a
small Mac app with a very polished website, on a laptop and on a phone. I
measured its type sizes, spacing and buttons, and read the copy line by line.
It's a product page and we're a student chapter, but the principles carry over:

- **One typeface, used with discipline.** Weight, size and tight letter
  spacing do the work that extra fonts usually do.
- **Short headings.** Mostly one or two short sentences, such as "Less
  switching. More doing." They say one thing and stop.
- **Copy that starts with a verb and talks to the reader.** "Pick a task",
  "Jot down an idea". Every sentence names something real.
- **One main action.** The same button sits in the nav, the hero and at the
  end of the page, with a short line of facts underneath it.
- **A fixed scale.** A small set of sizes and spacings, the same on every page.
- **Lots of space, few sections.** Each section does one job.
- **A phone layout designed on its own terms.** Centred text, stacked buttons,
  pictures under the words, a two-column footer.
- **The organisation comes first.** The footer says who owns the site.

Then I went through our own site asking what looked unprofessional, and what
would change if we followed those principles.

### Things removed

**The personal credit in the footer.** The footer used to end with a
handwritten "designed and developed by" signature. On an organisation's
website that reads as one person's portfolio. The footer now ends with
"© 2026 Computer Society of India, SRMIST Vadapalani Student Chapter. All
rights reserved." The credit lives here in the README instead.

**"Coming soon" filters.** The events page had a Discussion filter that opened
an empty "coming soon" card. An empty category makes the chapter look
inactive. Filters now appear only for categories that have at least one event,
so Discussion will come back by itself when the first discussion is added.

**Honorifics in photo captions.** Captions said "Dr. Golda Dilip ma'am" and
"Dr. CV Jayakumar Sir". That's how we speak on campus, but on a public page it
looks informal. They now read "Dr. Golda Dilip, Head of CSE" and "Dr. CV
Jayakumar, Dean FET".

**Details we couldn't confirm.** A wrong title looks worse than a missing one.
Dr. Akila's card no longer shows "CSI SDC" (the posters disagree between SDC
and SBC), and "Team Byte Club" became "a third team" until the spelling is
checked. An old code note that called the event details placeholders was
also removed, since they come from the posters and reports.

**Three of the five typefaces.** The site had grown to Instrument Sans,
Instrument Serif, Times New Roman, Inter and Great Vibes. Five fonts on one
page feel noisy. Inter now sets everything, and Great Vibes is kept only for
the handwritten words in the hero and the names on the team cards.

### Things changed

**Headings.** Every heading is now a short statement ending in a full stop, in
the same voice: "Eight sessions. One chapter.", "The people behind it.",
"Learn from people doing the work.", "Be part of what's next." Before, they
mixed title case, sentence case, labels and slogans. The session count in
"Eight sessions" is worked out from the data, so it stays true as events are
added. The hero headline was kept as it was.

**Body copy.** Paragraphs now start with what the reader can do. The hero
says "Join a session, ask the speaker, take the notes home." The events page
says "Browse every session the chapter has run." Filler sentences went.

**A trust line.** Under the main button: "Open to all CSE students at SRMIST
VDP · Free sessions · Certificates for event winners". These are the three
things a student wants to know before joining, and each one was confirmed by
the chapter before it went on the page. On phones the three facts stack, so a
wrapped line never starts with a stray dot.

**One main button.** "Join the chapter" goes to LinkedIn, and it's the same
button in the nav, in the hero and at the end of every page. Before, the nav
had two icons, the hero had "Follow on LinkedIn", and the closing section had
two cards for two platforms. One clear action is easier to follow. Instagram
is still in the footer and the phone menu.

**Type sizes.** Every size is set for phones and laptops, with a straight ramp
between:

| | Phone | Laptop |
|---|---|---|
| Hero and page titles | 40px | 72px |
| Section headings | 32px | 48px |
| Card headings | 22px | 28px |
| Body copy | 16px | 18px |

Before, headings could reach 120px on a wide screen and body text changed
size at every width. Fixed ends keep the page calm on a big monitor and
readable on a small phone.

**Spacing.** 72px between sections on phones and 120px on laptops, set once
as a design token. Bands with their own background, like the closing section
and the footer, carry that full space inside them. The content width is now
1280px, with narrower columns for paragraphs so lines stay easy to read.

**Buttons and cards.** Every button is 48px tall with 14px corners and the
same shadow. Cards use three corner sizes only (14px, 24px, 32px), plus the
same metallic edge and shadow everywhere, including the team photos, which
used to have a plain border. Before, corners ranged across six different
values and buttons came in several heights.

**Home page.** It's now hero, the month's highlight, what's happening this
month, recent sessions, the team, and a closing section. The photo collage and
the insights list were taken off the home page. The home page should answer
"what is this chapter and what's it doing", and six sections do that without
the scroll getting long.

**Insights page.** The takeaways moved to their own page at `/insights`, and
the nav links there. The photos are still in the photo library, linked from
the footer.

**Closing section.** Every page ends with the same band: "Be part of what's
next.", the "Join the chapter" button, and the trust line again. The sky-filled
heading and the rolling hills photo from v1 are kept.

**Footer.** Chapter name, emblem and tagline, then three columns: Chapter
(About, Events, Team, Insights, Photo library), Follow (LinkedIn, Instagram)
and Contact (LinkedIn, FAQ). Then the © line and the campus address. On
phones it becomes two columns.

**FAQ.** Six questions on the About page: who can join, whether membership is
paid, certificates, how to hear about sessions, how to propose one, and who
runs the chapter. The answers use only confirmed facts: sessions are free, CSI
membership has a fee, certificates go to event winners. It ends with a link
to message the chapter on LinkedIn. The answers use the browser's own
open/close element, so they work without JavaScript.

**Phone layouts.** Designed for the phone rather than squeezed down from the
laptop:

- Section headings are centred, with their "All sessions" style link below
  them instead of beside them.
- Hero and closing buttons are full width and stacked.
- Pictures sit under the text on feature cards.
- Team cards swipe and snap one person at a time; the arrow buttons only
  appear from tablet width up.
- Event cards are one per row.
- Filter chips are centred.

**Pixel check.** Every page was checked at 375, 768, 1280 and 1440px wide with
a script that flags anything poking past the edge of the screen, and any
heading or paragraph that leaves a single word alone on its last line. Nothing
overflows at any width. The single-word lines it found were fixed with
balanced text wrapping or shorter wording. Two titles still break with one
word alone on the smallest phones, because they only have three words:
"Ideas to keep." and "SKILLSHONE Orientation Programme".

## What changed in v3

v2 fixed how the site looks. v3 is about how it feels to use: the site
responds when you touch it, things arrive instead of appearing, and the few
places that felt stiff or slow were smoothed out. Every effect below is
switched off for people who turn on reduced motion, and none of them hide
content while scripts load.

### The hero comes alive

The hero used to be a still picture. Three small things now make it feel
live, without turning it into a show:

- **The headline writes itself.** Each word rises into place from a soft blur,
  one after another, and then "community" and "technology" are written in from
  left to right, like a pen crossing the page. It's done with CSS keyframes
  rather than JavaScript, so the full headline is in the HTML from the first
  byte and is never hidden while scripts load. The script words' clip is inset
  past their swashes so no curl of a letter is cut.
- **The emblem follows you.** On a laptop the CSI emblem leans up to 14 degrees
  toward the pointer, wherever it is on the screen, and a patch of light slides
  across its face on the side facing the pointer, like sun on a metal badge.
  The light is masked to the emblem's own shape so it never spills onto the
  sky. It follows the Tilted Card idea from
  [React Bits](https://reactbits.dev), built with Motion and a spring so it
  settles smoothly. Touch screens keep the still emblem.
- **The chapter in numbers.** A band just under the hero shows sessions,
  students and speakers, counting up from zero the first time it scrolls into
  view. Sessions and speakers are counted from `data/events.ts`, so they stay
  true as events are added; "400+ students" is the chapter's own figure. The
  final numbers are in the HTML, so they're right even before the count runs.

With reduced motion turned on, the headline, emblem and counters all stay
still.

### The college card opens out of the seal and dissolves into pixels

The SRMIST seal in the top left opens a small card linking to the college
site.

Opening it works like a window coming out of its icon in the macOS Dock. The
card starts shrunk to the size of the seal, sitting exactly on top of it, then
travels to the middle of the screen and grows to full size on the way,
settling without a bounce. It fades in over the first tenth of a second and
arrives in about a third of a second, on phones and laptops alike. Because the
seal's position is measured at the moment you tap it, the card always comes
out of the right place.

The first version of this stalled for a moment after the tap, most noticeably
on phones. Two things caused it, and both are fixed:

- The blur behind the card was animated from nothing to full strength. That
  makes the browser redraw the whole page behind it on every frame, so the
  first frames were dropped. The blur is now applied once, and only its fade
  animates.
- The page was locked from scrolling at the moment of the tap. Locking scroll
  makes the browser re-measure the whole page, and doing that in the same
  frame as the first step of the animation cost that frame. The lock now
  happens once the card has arrived.

The opening only moves the card's position, size and opacity. Browsers can
animate those without redrawing anything, which is what keeps it smooth. I
looked at genie-effect libraries such as
[genie.js](https://github.com/hbi99/genie.js/) and
[Genie](https://github.com/HarshilShah/Genie), but those bend a snapshot of the
element, which is heavy on a phone, and the genie is really macOS's minimise
animation rather than how a window opens. Motion's shared-element transitions
were the other option; they stretch the text mid-animation, so a plain zoom
from the seal was the better fit.

When you close the card, it breaks into pixels that sweep away from top to
bottom. A plain fade felt too quiet for something you opened on purpose; this
makes closing it feel like a small moment instead of the card just vanishing.
Here's how it works:

- The card is divided into a grid of squares, 12 across, with the number of
  rows worked out from the card's shape so the squares stay square.
- The squares appear row by row from the top over about 0.4 seconds. Each
  one gets a small random delay, so the edge looks ragged rather than like a
  straight line wiping down.
- The real card is cut away just behind the incoming rows, so it never shows
  through a gap.
- Each square holds for a moment, then fades, shrinks and drops a few pixels,
  so the card seems to crumble downwards. A few squares are light blue
  instead of cream, which makes the pixels read as pixels.
- The blurred page behind the card comes back into focus during the sweep,
  not after it. The whole close takes under a second.

It works the same way whether you press the close button, click outside the
card or press Escape. With reduced motion turned on, the card simply closes.

The idea comes from [React Bits](https://github.com/DavidHDev/react-bits)'
Pixel Transition, which covers content with a grid of squares and then removes
them. That component uses GSAP; this version is built with Motion, which the
site already uses, so nothing extra is downloaded.

### The phone menu folds open like paper

On phones and tablets, the three-line button in the top right opens the quick
navigation menu. It used to appear in one frame. It now unfolds like a strip
of paper that was folded into a zigzag and is being let drop.

Why paper? The seal card already borrows from the Mac, and a second zoom would
have made the two feel like the same trick. A menu is a list you read from the
top down, so it made sense for it to arrive from the top down, one line at a
time. Paper also suits a chapter site better than a slick app transition: it
feels handmade, and the light and shadow on each fold make the glass menu look
like a physical object for a moment.

How it opens:

- The glass sheet behind the menu hangs from its top edge, tipped back about
  28 degrees, and falls forward until it's flat. Its bottom edge travels down
  at the same time, so the sheet grows with the rows instead of appearing
  whole.
- Each row (Home, About, Events, Team, Insights, then LinkedIn and Instagram)
  is one panel of the folded strip. It hangs off the row above it and swings
  down from edge-on to flat. Rows start 0.065 seconds apart, top to bottom,
  so from the front the menu drops open in steps, like a staircase.
- Each row lands with a very slight flop, the way paper falls flat, rather
  than sliding into place.
- Alternate rows start with a crease shadow or a catch of light, which fades
  as the row flattens. That zigzag of light and shade is what makes it read as
  folded paper.

How it closes:

- The rows fold back up from the bottom, 0.04 seconds apart.
- The glass sheet folds up with them. Its bottom edge rises at the same pace
  as the rows and it tips back as it goes, fading out only in the last moment.
  The first version waited for the rows to finish and then removed the sheet
  in one go, which looked abrupt.
- The whole close takes under half a second, whether you tap a link, tap the
  X or press Escape.

Two details keep it smooth:

- The first version's opening lurched. The sheet's growing edge was animated
  as a `clip-path` string, and browsers rewrite `inset(0% 0% 0% 0%)` as
  `inset(0%)`. The two strings no longer match, so the animation jumped
  instead of tweening. The edge is now a single CSS variable inside the
  clip-path, which always animates smoothly.
- Page scroll is locked once the menu has landed rather than on the tap.
  Locking scroll makes the browser re-measure the whole page, and doing it in
  the same frame as the first step of the fold dropped that frame. The seal
  card uses the same fix.

With reduced motion turned on, the menu simply appears and disappears.

References I looked at: [OriDomi](http://oridomi.com/), the best-known library
for folding page elements, and the
[Paper Fold 3D Accordion](https://codefronts.com/navigation/css-accordions/paper-folded/),
[Folding Paper Menu](https://webcodeflow.com/folding-paper-menu/) and
[CSS 3D paper fold](https://gist.github.com/2772486) demos. OriDomi works by
slicing the element into copies, which is heavy for a menu with a blurred
glass background, so the fold here is built with Motion using 3D rotation on
the real rows. Nothing extra is downloaded.

### The team rail and names

- **Names write themselves.** Each team member's name is written in from left
  to right, like a signature, the first time their card comes into view. On
  the home page rail, names on cards still waiting off to the side stay hidden
  until the card slides in, so each one writes as it arrives. The name is in
  the page from the start and is only hidden once the browser is ready to write
  it in, so it never goes missing if scripts are slow. One detail made this
  work: a name clipped to nothing counts as out of view to the browser, so the
  card around the name is what's watched.
- **The rail has momentum.** The team rail now uses Swiper's free mode, which
  the site already had for the photo library. Flick or drag it and it keeps
  gliding, slowing to a stop the way an iPhone list does, then settles on the
  nearest card so nobody is left half in view. It works with a mouse drag, a
  sideways trackpad swipe or a finger, while scrolling up and down over it
  still scrolls the page. The arrows still move one person at a time. About
  one and a quarter cards show on phones, two on tablets and three on laptops.

### The whole site: smooth scroll, page transitions, a camera and a secret

- **Smooth scrolling.** On a laptop, wheel and trackpad scrolling now glides to
  a stop instead of jumping in steps, using
  [Lenis](https://lenis.darkroom.engineering). It makes every scroll-linked
  effect on the site move more smoothly too. The "Scroll" and "Home" jumps use
  it with the same half-second timing as before. Phones keep their native
  scrolling, which already has momentum. It pauses whenever something locks the
  page (the college card, the phone menu, the photo viewer) so the page can't
  drift underneath, and the album stack keeps the wheel to itself.
- **Page transitions.** Moving between pages crossfades the old page into the
  new one, using the browser's built-in View Transitions through React's
  `<ViewTransition>` in `app/template.tsx`. The top bar is pinned so it stays
  still. Opening a session from its card makes the poster fly from the card
  into the event page's hero, with a touch of blur mid-flight. This replaced
  the earlier fade-and-rise page animation. Browsers without View Transitions
  simply swap pages.
- **A camera that takes a picture.** Hovering the camera link beside "Nine
  sessions. One chapter." makes it dip like a shutter being pressed while a
  ring flashes out from the lens. It's plain CSS; a Lottie or Rive file would
  have meant a heavier download for one small icon.
- **The hidden feature.** The v1 launch post promised hidden features. Type
  "csi" anywhere on the page, or click the CSI emblem in the hero five times,
  and confetti in the chapter's colours bursts from both sides of the screen
  with a note: "You found a hidden feature. Welcome to CSI." It uses
  [canvas-confetti](https://github.com/catdad/canvas-confetti), which skips the
  burst for anyone with reduced motion turned on; the note still appears.

### The highlight button

The month's highlight card is the one place that
breaks the button rule, on purpose. It used to have a grass-and-cloud artwork
button. It looked like a sticker rather than something to press, and the
cloud clashed with the green card. I compared options from three button
libraries, [Magic UI](https://magicui.design/docs/components/shimmer-button),
[Aceternity UI](https://ui.aceternity.com/components/moving-border) and
[Uiverse](https://github.com/uiverse-io/galaxy), mocked each one on the real
card, and picked Magic UI's Shimmer Button with a sun glint added.

- It's a lime pill, taken from the card's own highlight colour, so it belongs
  to the card instead of being pasted on top.
- A white spark keeps travelling round its edge, which echoes the metallic
  shine that moves around the site's cards as you scroll.
- Every few seconds a streak of light sweeps across the face, like sun on
  glass. It passes underneath the label, so the words never wash out.
- Hovering speeds both up, so the button answers the pointer. With reduced
  motion turned on, both stop.

It's still 48px tall like every other button, and full width on phones. The
highlight is the one card we want people to open each month, so it's the one
button allowed to move. Everywhere else, buttons stay still.

### The photo library

Every session has an album, shown as a stack of covers you
scroll through, with the poster on the front and the photos inside. When the
home page lost its photo section, the library lost its way in, so a small
camera button now sits right beside "Eight sessions. One chapter." A camera
says "photos" at a glance, so it can stay small without needing a label. It
uses [Lucide](https://lucide.dev/icons/camera)'s camera icon, the same icon set
as the rest of the site.

The library page itself was simplified:

- The stack is sized to the screen, so covers are big enough to look at
  without zooming. On a laptop the front cover is about 400px and the whole
  stack fits in the window. On a phone it's about three quarters of the screen
  wide.
- On a laptop the whole library is one screen: the title and the current
  album's details sit on the left, the stack on the right. Scrolling the stack
  updates the details beside it, and "Open this album" stays in view, so
  nobody scrolls the page between looking at a cover and opening it. Checked
  at 1440×900, 1366×768 and 1280×720.
- Laptops still scroll the stack up and down with the wheel or by dragging.
  Phones now swipe it sideways. A vertical stack on a phone filled the screen
  and caught the thumb that was trying to scroll the page, which is why it used
  to need a curved scroller down the right edge. Swiping sideways removes that
  conflict, so the curved scroller is gone.
- On phones the album details and "Open this album" button sit in one centred
  panel under the stack.
- An album with no photos yet opens on an illustration of a duckling on a lake
  that says "Oops! No photos of this event yet", instead of showing the poster
  again with nothing else to see. Because that picture is what you see inside,
  the album's count reads "1 photograph" rather than "0 photographs".

### Keeping the month current

Two flags in `data/events.ts` decide what the
top of the home page shows: `highlight` picks the month's highlight card and
`featured` picks "Happening this month". The highlight is ENTRESPARK 2026,
and "Happening this month" is Cyber Security Unlocked, the second September
session (15 September, Knowledge Updates Series #9, with IEEE CS). It had
still been showing Beyond the CGPA from August, which made the page look out
of date. When a new session runs, move the flags to it.

Adding a session is only data: an entry in `data/events.ts` with its poster,
details from the poster, and its photographs with captions. Its page, its
album in the photo library and the session count in "Nine sessions. One
chapter." all follow from that entry.

The highlight card also changed in two small ways:

- It shows the event's album cover, the same artwork as in the photo library,
  instead of the poster. The cover is designed to be looked at; the poster is
  mostly text. The "Happening this month" card still shows the poster, so the
  two cards don't repeat the same image.
- The heading "Highlight of September 2026." fills its letters with a green
  gradient, and a gradient only paints inside the text's own box. At the tight
  line height, the tail of the "g" hung below that box and was cut off. The
  heading now has a little padding at the bottom, balanced by a negative
  margin, so the letters show in full without moving anything around it.

## Design decisions

I went for an editorial layout — large headings, a lot of whitespace, few
things per screen. Club websites usually go the other way and cram six widgets
above the fold. Keeping it sparse was easier to build and looks better.

Each section does one job. The hero says who we are, the next sections show
this month's highlight and what's happening now, then recent sessions, then
the team, then one closing line with the main button. Someone who leaves after
two screens still knows what the chapter is.

The photographs do most of the work. A packed lab with a speaker in front of a
slide says more about an active chapter than any description would, so real
photos get more space than anything else on the page. Event posters are shown
whole and uncropped, since the poster is what people actually saw.

There are two typefaces. Inter sets everything, from the hero to the footer.
Great Vibes appears only for the handwritten words: two in the hero and the
names on the team cards. Colour is almost entirely navy on cream, so the
hierarchy comes from size and spacing.

Sizes and spacing are fixed at both ends. Body copy is 16px on phones and 18px
on laptops, section headings 32px and 48px, page titles 40px and 72px, with
72px between sections on phones and 120px on laptops. Every button is 48px tall
with 14px corners, and every card uses the same edge and shadow.

Each page ends the same way: one line, one "Join the chapter" button that goes
to LinkedIn, and the facts about joining underneath it.

Animation is kept small. Sections fade and rise 20px as they come into view,
the cards have a metallic edge that shifts while you scroll, and in-page jumps
use a fixed 520ms scroll. That last one exists because Chrome's own smooth
scroll gets slower the further it travels, and jumping to the bottom of the page
felt broken. Everything is disabled under `prefers-reduced-motion`. The
bigger effects added later are described in
[What changed in v3](#what-changed-in-v3).

## Tech stack

**Next.js 16 with the App Router.** Every page is prerendered to static HTML at
build time. No server to run, no database, and it can be hosted for free. The
event pages come from `generateStaticParams` over a data file, so adding a
session adds a page.

**React 19 and TypeScript.** The types double as documentation for whoever
maintains this next. `ChapterEvent` lists exactly what an event needs, and the
build breaks if something's missing.

**Tailwind CSS 4.** All the design tokens sit in one `@theme` block — colours,
the fluid type scale, spacing, easing. Changing the look means editing that
block. Deleting a component also deletes its styles, which matters when you're
still figuring out the layout.

**Motion** for scroll reveals and the college dialog. **Lenis** for smooth
scrolling and **canvas-confetti** for the hidden feature. Everything else is plain
CSS, since pulling in an animation library for a fade isn't worth the bytes.

**next/font** self-hosts and inlines both typefaces at build time, so
there's no request to Google and no shift when they load.

**No CMS.** A CMS means an account and a subscription to hand over every year.
Content lives in typed files in the repo instead, so changes go through pull
requests and the git history shows who changed what.

## Editing the content

None of the copy is written inside components. To change the site, edit:

- `data/site.ts` — chapter name, URL, social links, navigation
- `data/events.ts` — every session, and which one is featured
- `data/team.ts` — office bearers, faculty first
- `data/insights.ts` — the takeaways section

Adding an event to `data/events.ts` gives you the card, the page at
`/events/[slug]`, the metadata and the sitemap entry. Nothing else to touch.

A team member without a `name` shows up as "Announcing soon", so the grid stays
even while a role is unfilled. Categories in `upcomingCategories` show a
coming-soon notice instead of an empty page.

## Running it

```bash
npm install
npm run dev     # localhost:8790
npm run build
npm run lint
```

### Running two dev servers

Next.js locks its build folder, so a second `next dev` in the same project
refuses to start. Setting `NEXT_DIST_DIR` gives a server its own folder:
`NEXT_DIST_DIR=.next-preview npx next dev`. Normal builds and Vercel don't set
it. `.next-preview/` is ignored by git and by ESLint.

## Deploying

The same config builds for two places, switched by environment variables.

Vercel is the live site and deploys on every push to `main`. GitHub Pages runs
as a backup from `.github/workflows/deploy-pages.yml`, built with `noindex` so
Google doesn't treat the two as duplicates of each other.

| Variable | Vercel | Pages |
| --- | --- | --- |
| `STATIC_EXPORT` | unset | `true` |
| `NEXT_PUBLIC_BASE_PATH` | unset | `/CSI-SRMISTVDP` |
| `NEXT_PUBLIC_SITE_URL` | production domain | the Pages URL |
| `NEXT_PUBLIC_NOINDEX` | unset | `true` |

If you hand-write anything pointing at `/public` — a raw `<img>`, a CSS `url()`
— run it through `asset()` in `lib/asset.ts`, or it'll 404 on Pages where the
site sits under a subpath. `next/image` and `next/link` handle that themselves.

## Images

`lib/media.ts` decides per file. SVGs are served straight from `/public`, since
the optimizer can't improve a vector, and photographs go through `next/image`
for AVIF and WebP. The `Img` wrapper in `components/ui/Img.tsx` applies that
rule plus the base path, because `next/image` only rewrites paths for images it
optimizes — an unoptimized one 404s on Pages otherwise. That took me a while to
work out.

Two scripts prepare the artwork:

```bash
python3 scripts/prepare-brand.py             # cuts white out of the two seals, resizes the skies
python3 scripts/make-og.py                   # builds the link preview card
```

They need Pillow and numpy. Originals are in `scripts/source/`.

## Accessibility

Semantic landmarks, a skip link, visible focus rings, `aria-current` on the
active nav item, focus handling in the dialog, and body text at or above 4.5:1
contrast against the cream background. Every animation is skipped under
`prefers-reduced-motion`.

## Artwork

- The hero sky was generated with ChatGPT 5.6 Sol, then cropped two ways: tall
  for phones, wide for laptops, so a phone doesn't download the desktop frame.
- Session photographs were taken at the sessions.
- Event posters are the chapter's own.
- The "No photos of this event yet" illustration in the photo library was
  created with GPT-6 Astro, at medium intensity.

---

Designed and developed by R. Magdaleena, Vice President, CSI Student Chapter,
SRMIST Vadapalani.
