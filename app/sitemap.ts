import type { MetadataRoute } from "next";

// Emitted as a file during the static export target.
export const dynamic = "force-static";
import { events } from "@/data/events";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // The newest session dates the static pages too: they all list sessions, so
  // a new event is the thing that changes them.
  const lastModified = new Date(
    `${[...events].sort((a, b) => b.date.localeCompare(a.date))[0].date}T00:00:00Z`,
  );

  const staticRoutes = [
    "",
    "/events",
    "/team",
    "/about",
    "/insights",
    "/gallery",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const eventRoutes = events.map((event) => ({
    url: `${site.url}/events/${event.slug}`,
    lastModified: new Date(`${event.date}T00:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes];
}
