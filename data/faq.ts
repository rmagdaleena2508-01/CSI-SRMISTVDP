export type Question = { q: string; a: string };

/**
 * Answers confirmed by the chapter: sessions are free and open to CSE students
 * at SRMIST Vadapalani, CSI membership itself is paid, and certificates go to
 * event winners only.
 */
export const faq: Question[] = [
  {
    q: "Who can join?",
    a: "Any CSE student at SRMIST Vadapalani can attend chapter sessions. Pick a session, show up, and bring your questions.",
  },
  {
    q: "Is membership paid?",
    a: "CSI student membership carries a fee set by the Computer Society of India. Chapter sessions are free to attend either way.",
  },
  {
    q: "Do I get a certificate?",
    a: "Certificates go to the winners of chapter events and competitions. Regular sessions do not carry one.",
  },
  {
    q: "How do I hear about the next session?",
    a: "Follow the chapter on LinkedIn and Instagram. Every session is announced there with its poster, date and venue.",
  },
  {
    q: "How do I propose a session?",
    a: "Message the chapter on LinkedIn with the topic, who would lead it and why students would want it. The office bearers plan the calendar.",
  },
  {
    q: "Who runs the chapter?",
    a: "Student office bearers run it, guided by faculty coordinators. The team changes each academic year.",
  },
];
