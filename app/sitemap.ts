import type { MetadataRoute } from "next";

// Emitted as a file during the static export target.
export const dynamic = "force-static";
import { events } from "@/data/events";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/events", "/team", "/about", "/gallery"].map((path) => ({
    url: `${site.url}${path}`,
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
