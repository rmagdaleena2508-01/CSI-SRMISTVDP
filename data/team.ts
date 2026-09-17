export type TeamMember = {
  /** Omit while a position is still being announced — the card renders a
   *  quiet "announcing soon" state instead of a portrait. */
  name?: string;
  role: string;
  /** Shown under the role, for a title the role alone does not carry. */
  detail?: string;
  quote?: string;
  image?: string;
  linkedin?: string;
};

/** Office bearers 2026–27, faculty first. */
export const team: TeamMember[] = [
  {
    name: "Dr. K. Akila",
    role: "Assistant Professor (Sl.Grade)",
    image: "/images/team/akila.jpg",
  },
  {
    name: "A. Sasank Veera Sadhu",
    role: "President",
    image: "/images/team/sasank-veera-sadhu.jpg",
  },
  {
    name: "Magdaleena R",
    role: "Vice President",
    image: "/images/team/magdaleena.jpg",
  },
  {
    name: "Deepika S",
    role: "Secretary",
    image: "/images/team/deepika.jpg",
  },
  {
    name: "D. Sri Sasank",
    role: "Treasurer",
    image: "/images/team/sri-sasank.jpg",
  },
  {
    name: "S. Chaitanya Kumar",
    role: "PR Head",
    image: "/images/team/chaitanya-kumar.jpg",
  },
  {
    name: "Pranesh M S",
    role: "Executive Member",
    image: "/images/team/pranesh.jpg",
  },
];
