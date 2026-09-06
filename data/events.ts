export type EventCategory =
  | "Workshop"
  | "Discussion"
  | "Industry"
  | "Knowledge Session";

export type ChapterEvent = {
  slug: string;
  title: string;
  /** ISO date — formatted for display at render time. */
  date: string;
  category: EventCategory;
  /** One line, used on cards. */
  description: string;
  /** Two or three sentences, used on the event page. */
  summary: string;
  speaker?: { name: string; role: string };
  venue?: string;
  image: string;
  /** Bullets for "What we explored". */
  explored?: string[];
  /** Bullets for "Key takeaways". */
  takeaways?: string[];
  gallery?: { src: string; caption?: string }[];
  quote?: { text: string; attribution: string };
  /** Short verbatim responses collected after the session. */
  feedback?: { text: string; attribution: string }[];
  reportUrl?: string;
  /** The one shown under "Happening this month". */
  featured?: boolean;
  /** The one shown as the month's highlight, above it. */
  highlight?: boolean;
};

/**
 * TODO (chapter team): replace speaker names, venues and report links with the
 * real records. Everything the site renders comes from this file — no event
 * copy is hardcoded in components.
 */
export const events: ChapterEvent[] = [
  {
    slug: "entrespark-2026",
    title: "ENTRESPARK 2026",
    date: "2026-09-02",
    category: "Workshop",
    description: "Entrepreneurship orientation and an interactive pitching activity.",
    summary:
      "Run jointly with the Entrepreneurship Development Cell for first-year CSE students: a session on entrepreneurship, innovation, incubation and marketing, followed by InnoVenture, a pitching activity where teams had fifteen minutes to research a problem, shape an idea and present it. One team built a full presentation inside that window. Team VDK won, Team Nexus were runners-up, and Team Byte Club took a special mention.",
    speaker: {
      name: "Ms. Ranjitha R",
      role: "Founder and CEO, Trouvaille Eunoia",
    },
    venue: "9:00 AM onwards",
    image: "/images/events/entrespark-2026.jpg",
    explored: [
      "What entrepreneurship, innovation, incubation and marketing actually involve",
      "How CSI and the EDC work, and what students can take part in",
      "Turning a problem you have noticed into an idea worth pitching",
      "Researching, shaping and presenting that idea in fifteen minutes",
      "Pitching to coordinators and judges, and answering for the idea afterwards",
    ],
    gallery: [
      {
        src: "/images/events/entrespark-4.jpg",
        caption: "Opening with the department's E-Cell activities for the year",
      },
      {
        src: "/images/events/entrespark-2.jpg",
        caption: "A student coordinator walking through past programmes",
      },
      {
        src: "/images/events/entrespark-6.jpg",
        caption: "Introducing the E-Summit to the first-year students",
      },
      {
        src: "/images/events/entrespark-10.jpg",
        caption: "Ms. Ranjitha R leading the entrepreneurship session",
      },
      {
        src: "/images/events/entrespark-8.jpg",
        caption: "Ms. Ranjitha R taking questions from the room",
      },
      {
        src: "/images/events/entrespark-7.jpg",
        caption: "A first-year student putting a question to the speaker",
      },
      {
        src: "/images/events/entrespark-3.jpg",
        caption: "A team pitching during InnoVenture",
      },
      {
        src: "/images/events/entrespark-5.jpg",
        caption: "Teams presenting their ideas to the coordinators and judges",
      },
      {
        src: "/images/events/entrespark-9.jpg",
        caption: "At the judging table between pitches",
      },
    ],
    feedback: [
      {
        text: "The session helped me understand that entrepreneurship begins with identifying real problems and turning them into practical opportunities and solutions.",
        attribution: "Student participant",
      },
      {
        text: "I learned that building something new can start with the knowledge we already have and the challenges we have personally experienced.",
        attribution: "Student participant",
      },
      {
        text: "The session encouraged me to follow my passion, believe in myself, and take the first step towards turning my ideas into action.",
        attribution: "Student participant",
      },
    ],
    highlight: true,
  },
  {
    slug: "skillshone-orientation",
    title: "SKILLSHONE Orientation Programme",
    date: "2026-08-25",
    category: "Industry",
    description: "Industry-oriented learning and real-time project opportunities.",
    summary:
      "An orientation on industry-oriented learning and real-time project work with industry mentors, held with IEEE CS. The session ranged over how generative AI is reshaping hiring, why domain knowledge matters as much as technical skill, and how to build proof of your work before graduating.",
    speaker: { name: "Mr. Malaya Rout", role: "Director, Exafluence" },
    venue: "3rd Floor Auditorium, 9:00 to 10:30 AM",
    image: "/images/events/skillshone-orientation.jpg",
    gallery: [
      {
        src: "/images/events/skillshone-orientation-5.jpg",
        caption:
          "Dean FET, Dr. CV Jayakumar Sir, addressing the guest and students",
      },
      {
        src: "/images/events/skillshone-orientation-3.jpg",
        caption:
          "HOD of CSE, Dr. Golda Dilip ma'am, addressing the guest and students",
      },
      {
        src: "/images/events/skillshone-orientation-1.jpg",
        caption: "Mr. Malaya Rout addressing the students",
      },
      {
        src: "/images/events/skillshone-orientation-2.jpg",
        caption: "Walking through the SKILLSHONE platform",
      },
      {
        src: "/images/events/skillshone-orientation-4.jpg",
        caption: "Speaker and the team behind the CSI August event 2026",
      },
    ],
    reportUrl:
      "https://www.linkedin.com/posts/computer-society-of-india-csi-srmist-vadapalani_csi-event-1-semester-3-25082026-activity-7497952177982922752-1cCr",
    takeaways: [
      "AI is changing the job market. Generative AI is reshaping roles and influencing how companies hire and work.",
      "Learn to work with AI. Instead of avoiding AI, students should learn how to use it effectively in their everyday work.",
      "Know your industry vertical. Understanding the industry you work in is just as important as knowing your technical skills.",
      "Your domain matters. Especially for experienced professionals looking for lateral opportunities, companies value relevant domain knowledge.",
      "Ask about your role in interviews. It is both your right and responsibility to ask which domain you will be working in.",
      "Start gaining experience early. Build projects, take up internships, and work on real-world problems before graduation.",
      "Projects can become proof of your skills. Practical work helps you demonstrate what you can actually do, rather than only talking about what you have learned.",
      "Do not hesitate to ask questions.",
      "Make use of platforms like SKILLSHONE. Students can work on real-time projects with guidance from industry professionals and gain practical industry exposure.",
    ],
    quote: {
      text: "Your eyes are brightened up with questions. Do ask them.",
      attribution: "Mr. Malaya Rout, encouraging students to speak up",
    },
  },
  {
    slug: "beyond-the-cgpa",
    title: "Beyond the CGPA: Building a Tech Career That Actually Works",
    date: "2026-08-27",
    category: "Knowledge Session",
    description: "Knowledge Updates Seminar Series #8.",
    summary:
      "Knowledge Updates Seminar Series #8, held with IEEE CS. What a technology career is built on once marks stop being the measure, from a final-year student already working across the full software development life cycle.",
    speaker: {
      name: "Hameed Salihu",
      role: "Student, Department of CSE, SRMIST Vadapalani",
    },
    venue: "CSE Lab 2, 2:00 to 3:00 PM",
    image: "/images/events/beyond-the-cgpa.jpg",
    featured: true,
  },
  {
    slug: "vibe-coding",
    title: "Code Less, Create More: The Vibe Coding Revolution",
    date: "2026-08-13",
    category: "Knowledge Session",
    description: "Knowledge Updates Seminar Series #6.",
    summary:
      "A session exploring AI-assisted development, its advantages, limitations and the responsibility developers still carry. We wrote code alongside an assistant, then read every line back critically.",
    speaker: {
      name: "Jaiarthi",
      role: "III Year CSE, SRM Institute of Science and Technology",
    },
    venue: "Hardware Lab, 2:00 PM",
    image: "/images/events/vibe-coding.jpg",
    explored: [
      "What vibe coding actually means in practice",
      "Advantages of AI-assisted development",
      "Where generated code quietly breaks down",
      "Security considerations when accepting suggestions",
      "Reliability, testing and review discipline",
      "Responsible use of AI tools in coursework and projects",
    ],
    takeaways: [
      "Speed is the easy win. Correctness still costs the same attention it always did.",
      "Read generated code the way you would review a stranger's pull request.",
      "Prompting is specification writing, vague input produces confidently wrong output.",
      "Never paste credentials, private data or unreleased work into a tool you do not control.",
    ],
    quote: {
      text: "AI can accelerate development. Judgment still belongs to the developer.",
      attribution: "Closing note from the session",
    },
  },
  {
    slug: "gsoc-roadmap",
    title: "Your Roadmap to Becoming a GSoC Contributor",
    date: "2026-03-12",
    category: "Knowledge Session",
    description: "Knowledge Updates Seminar Series #6.",
    summary:
      "Knowledge Updates Seminar Series #6, held with IEEE CS. A walk through what it takes to contribute to Google Summer of Code, from an engineer working in cloud-native technologies, DevOps and open source.",
    speaker: { name: "Achanandhi M", role: "Advanced Analyst at EY" },
    venue: "CSE Lab 2, 10:00 to 11:00 AM",
    image: "/images/events/gsoc-roadmap.jpg",
  },
  {
    slug: "community-led-innovation",
    title:
      "Community-Led Innovation: How Open Source and AI Geeks Create Real Impact",
    date: "2026-02-13",
    category: "Knowledge Session",
    description: "Knowledge Updates Seminar Series #5.",
    summary:
      "Knowledge Updates Seminar Series #5, held with IEEE CS. How open source communities form, how they sustain themselves, and the impact they create, from someone running one.",
    speaker: {
      name: "Crystal Darling",
      role: "Lead and Organizer, AI Geeks Chennai",
    },
    venue: "CSE Lab 2, 10:00 to 11:00 AM",
    image: "/images/events/community-led-innovation.jpg",
  },
  {
    slug: "communication-side-hustles",
    title: "Communication Skills, Side Hustles and Freelancing for Income",
    date: "2026-01-30",
    category: "Knowledge Session",
    description: "Turning communication into opportunities and income.",
    summary:
      "A session on the skills that open doors alongside technical ability: communicating well, finding work that fits around college, and turning conversations into freelance income.",
    speaker: {
      name: "Jaishree B",
      role: "B.Tech CSE IV Year, SRM IST Vadapalani",
    },
    venue: "CSE Hardware Lab, 9:00 to 10:00 AM",
    image: "/images/events/communication-side-hustles.jpg",
    explored: [
      "How communication creates opportunities faster than skills alone",
      "Side hustles that actually work during college",
      "Turning conversations into income: freelancing basics and commercialization",
    ],
  },
  {
    slug: "decode-the-interview",
    title: "Decode the Interview",
    date: "2025-10-27",
    category: "Knowledge Session",
    description: "How technical interviews actually run.",
    summary:
      "A session on what technical interviews look like from the other side of the table, led by the chapter's own President.",
    speaker: {
      name: "Antony Saju David",
      role: "President, CSI Student Chapter, SRMIST VDP",
    },
    venue: "CSE Hardware Lab, 11:40 AM",
    image: "/images/events/decode-the-interview.jpg",
  },
];

/** Categories with nothing published yet — their filter shows a notice. */
export const upcomingCategories: readonly EventCategory[] = ["Discussion"];

export const eventCategories: readonly ("All" | EventCategory)[] = [
  "All",
  "Workshop",
  "Discussion",
  "Industry",
  "Knowledge Session",
];

const byDateDesc = (a: ChapterEvent, b: ChapterEvent) =>
  b.date.localeCompare(a.date);

export const allEvents = [...events].sort(byDateDesc);

export const featuredEvent =
  allEvents.find((e) => e.featured) ?? allEvents[0];

export const highlightEvent = allEvents.find((e) => e.highlight);

export const recentEvents = allEvents.slice(0, 3);

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function relatedEvents(slug: string, limit = 3) {
  const current = getEvent(slug);
  if (!current) return [];
  const sameCategory = allEvents.filter(
    (e) => e.slug !== slug && e.category === current.category
  );
  const rest = allEvents.filter(
    (e) => e.slug !== slug && e.category !== current.category
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

/** "August 2026", used for the highlight heading so it stays right on its own. */
export function formatEventMonth(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatEventDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
