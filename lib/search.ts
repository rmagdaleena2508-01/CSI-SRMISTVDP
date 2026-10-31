import { allEvents, formatEventDate } from "@/data/events";
import { insights } from "@/data/insights";
import { faq } from "@/data/faq";
import { team } from "@/data/team";
import { navigation } from "@/data/site";

export type SearchGroup =
  "Sessions" | "People" | "Insights" | "Questions" | "Pages";

export type SearchItem = {
  id: string;
  group: SearchGroup;
  title: string;
  subtitle?: string;
  href: string;
  /** Extra words that should match but are not worth showing. */
  keywords?: string;
};

/**
 * Everything the site knows about, flattened into one list at build time.
 * It comes from the same data files the pages render, so the index can never
 * describe a session or a person the site does not have.
 */
export const searchIndex: SearchItem[] = [
  ...allEvents.map((event) => ({
    id: `event-${event.slug}`,
    group: "Sessions" as const,
    title: event.title,
    subtitle: `${formatEventDate(event.date)} · ${event.category}`,
    href: `/events/${event.slug}`,
    keywords: [
      event.description,
      event.summary,
      event.tagline,
      event.speaker?.name,
      event.speaker?.role,
      event.venue,
      ...(event.explored ?? []),
      ...(event.takeaways ?? []),
      ...(event.highlights ?? []),
    ]
      .filter(Boolean)
      .join(" "),
  })),
  ...team
    .filter((member) => member.name)
    .map((member) => ({
      id: `person-${member.name}`,
      group: "People" as const,
      title: member.name as string,
      subtitle: member.detail
        ? `${member.role} · ${member.detail}`
        : member.role,
      href: "/team",
    })),
  ...insights.map((insight, i) => ({
    id: `insight-${i}`,
    group: "Insights" as const,
    title: insight.statement,
    subtitle: insight.source,
    href: "/insights",
    keywords: insight.detail,
  })),
  ...faq.map((item, i) => ({
    id: `faq-${i}`,
    group: "Questions" as const,
    title: item.q,
    subtitle: "About page",
    href: "/about#faq",
    keywords: item.a,
  })),
  ...navigation.map((item) => ({
    id: `page-${item.href}`,
    group: "Pages" as const,
    title: item.label,
    href: item.href,
  })),
  {
    id: "page-gallery",
    group: "Pages",
    title: "Photo library",
    href: "/gallery",
    keywords: "photos albums pictures gallery",
  },
];

/** Where a match landed, so a title hit can outrank a buried keyword hit. */
function score(item: SearchItem, query: string) {
  const q = query.toLowerCase();
  const title = item.title.toLowerCase();
  if (title.startsWith(q)) return 0;
  if (title.includes(q)) return 1;
  if (item.subtitle?.toLowerCase().includes(q)) return 2;
  if (item.keywords?.toLowerCase().includes(q)) return 3;
  return -1;
}

/** Every word has to match somewhere, so "akila october" narrows rather than widens. */
export function searchSite(query: string, limit = 8): SearchItem[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];

  return searchIndex
    .map((item) => {
      const scores = words.map((word) => score(item, word));
      if (scores.some((s) => s === -1)) return null;
      return { item, rank: Math.min(...scores) + Math.max(...scores) / 10 };
    })
    .filter((hit): hit is { item: SearchItem; rank: number } => hit !== null)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit)
    .map((hit) => hit.item);
}
