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

**v1** was the first public version: hero, current session, photographs from the
sessions, the full event archive with a page per session, the team, a few
takeaways, and the social links.

**v2 is what's live now.** It's a cleanup of v1 rather than a rebuild. The
content is the same; the way it's presented is stricter, calmer and more
honest. The full list of changes, and the reasons for each, is in
[What changed in v2](#what-changed-in-v2) below.

Still on the list:

- Speaker names and proper write-ups for the older sessions.
- A chapter email address, so the Contact column and the FAQ don't have to
  point to LinkedIn.
- A real domain instead of the deployment subdomain.
- Search across sessions, once there are enough of them to need it.

If you're in the chapter and want something added, open an issue.

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
felt broken. Everything is disabled under `prefers-reduced-motion`.

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

**Motion** for scroll reveals and the college dialog. Everything else is plain
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

---

Designed and developed by R. Magdaleena, Vice President, CSI Student Chapter,
SRMIST Vadapalani.
