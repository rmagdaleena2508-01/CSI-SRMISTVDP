export const site = {
  name: "CSI Student Chapter",
  institution: "SRMIST Vadapalani",
  legalName: "Computer Society of India — SRMIST Vadapalani Student Chapter",
  // Set per deployment; canonical tags, Open Graph and the sitemap read it.
  // Falls back to production rather than a placeholder: a wrong canonical tag
  // sends search engines to a domain that does not exist, which is worse than
  // having none at all.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://csi-srmistvdp.vercel.app",
  description:
    "Official website of the Computer Society of India Student Chapter at SRMIST Vadapalani. Explore our workshops, technical sessions, events and insights.",
  /** Set on mirror deployments so only the canonical host is indexed. */
  noindex: process.env.NEXT_PUBLIC_NOINDEX === "true",
  tagline: "Where curious students build community and technology together.",
  /** The one main action, used in the nav, the hero and every closing band. */
  join: {
    label: "Join the chapter",
    href: "https://www.linkedin.com/company/computer-society-of-india-csi-srmist-vadapalani/",
  },
  /** Confirmed by the chapter. Shown under the main button. */
  trust: [
    "Open to all CSE students at SRMIST VDP",
    "Free sessions",
    "Certificates for event winners",
  ],
  address: "SRMIST Vadapalani Campus, Chennai 600026",
  socials: {
    linkedin: "https://www.linkedin.com/company/computer-society-of-india-csi-srmist-vadapalani/",
    instagram: "https://www.instagram.com/csi_srmist_vdp/",
  },
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
  { label: "Insights", href: "/insights" },
] as const;
