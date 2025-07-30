export interface CaseStudySection {
  heading: string;
  content?: string; // rich HTML or markdown string
  listItems?: string[]; // optional bullet points
}

export interface ICaseStudy {
  title: string; // e.g., "Emerging Leaders Program (ELP)"
  summary: string; // short intro or highlight
  sections: CaseStudySection[]; // all rich sections like Overview, Impact, etc.
  slug: string; // optional "Read More" link
}

const elpCaseStudy: ICaseStudy = {
  title: "🧭 Emerging Leaders Program (ELP)",
  summary:
    "A leadership development initiative focused on strategic thinking, peer learning, and organizational influence.",
  sections: [
    {
      heading: "🧩 Overview",
      content:
        "In 2025, I was selected for the Emerging Leaders Program (ELP)—a competitive leadership development initiative aimed at identifying and nurturing future leaders within the organization. The program has been instrumental in shaping my strategic thinking and leadership style.",
    },
    {
      heading: "🧪 Selection Process",
      content: "",
      listItems: [
        "Manager Recommendation: Endorsement from Shivani Tiwari",
        "Written Submission: A detailed Q&A reflecting on leadership experiences and aspirations",
        "Assessment Round: A formal test evaluating leadership aptitude",
        "Final Interview: Panel interview with senior leaders",
      ],
    },
    {
      heading: "📅 Program Structure",
      content: "",
      listItems: [
        "Monthly leadership sessions with senior mentors",
        "Peer learning and cross-functional collaboration",
        "Real-world leadership challenges and strategic exercises",
      ],
    },
    {
      heading: "🛠️ Impact",
      content: "",
      listItems: [
        "Strengthened my ability to lead distributed teams (e.g., RTB initiative)",
        "Applied strategic frameworks to improve delivery and team engagement",
        "Gained insights into stakeholder alignment and organizational influence",
      ],
    },
    {
      heading: "🔍 Reflection",
      content:
        "Being part of ELP has been both humbling and empowering. It validated my leadership journey and equipped me with tools to lead with clarity, empathy, and impact. The monthly sessions continue to challenge and inspire me to grow.",
    },
  ],
  slug: "elp",
};

const steppingUpCaseStudy: ICaseStudy = {
  title: "🧭 Stepping Up as Team Lead",
  summary:
    "In October 2024, following the unexpected resignation of our team lead, I was given the opportunity to step into the leadership role. It was a pivotal moment in my career—filling his shoes was no small task, but it became a defining experience in my growth as a leader.",
  sections: [
    {
      heading: "⚡Challenge",
      listItems: [
        "Sudden leadership gap in a high-performing team",
        "Maintaining team morale and delivery momentum",
        "Earning trust and respect while transitioning from peer to lead",
      ],
    },
    {
      heading: "👨‍💼My Role",
      listItems: [
        "Took over as interim lead",
        "Managed sprint planning, stakeholder communication, and delivery oversight",
        "Balanced leadership duties with ongoing full stack development work",
      ],
    },
    {
      heading: "🛠️ Actions Taken",
      listItems: [
        "Held 1:1s with each team member to understand concerns and goals",
        "Introduced structured stand-ups and retros to improve transparency",
        "Advocated for the team's needs with upper management",
        "Continued contributing technically to maintain credibility and support",
      ],
    },
    {
      heading: "📈 Outcomes",
      listItems: [
        "Maintained delivery cadence with no missed sprints during the transition",
        "Improved team engagement and ownership",
        "Built strong relationships with stakeholders and leadership",
        "Earned recognition for stepping up under pressure",
      ],
    },
    {
      heading: "🔍 Reflection",
      content:
        "This experience taught me that leadership is not about having all the answers—it's about listening, supporting, and showing up consistently. It laid the foundation for how I now lead larger, cross-functional teams with confidence and empathy.",
    },
  ],
  slug: "team-lead-transition",
};

export const rtbCaseStudy: ICaseStudy = {
  title: "🧭 Leading Run the Business (RTB) Initiative",
  summary:
    "Led a multi-regional team to stabilize operations, improve delivery processes, and address critical vulnerabilities in early 2025. Mentored a new hire into a key contributor and enhanced cross-regional accountability.",
  slug: "rtb",
  sections: [
    {
      heading: "🧩 Overview",
      content:
        "In early 2025, I was appointed to lead the Run the Business (RTB) initiative for the E-Commerce vertical, focused on stabilizing and improving day-to-day operations across our digital platforms. The initiative required assembling a reliable team, streamlining processes, and responding swiftly to critical issues.",
    },
    {
      heading: "👥 Team Composition",
      listItems: [
        "2 Offshore Developers – Philippines",
        "2 Offshore Developers – India",
        "1 Local Tester",
        "1 Business Analyst",
        "1 Mobile App Developer – Hired and mentored into a key contributor",
      ],
    },
    {
      heading: "🎯 Challenges",
      listItems: [
        "Fragmented ownership of operational tasks",
        "Reliance on a single mobile developer",
        "Critical vulnerabilities flagged by Snyk requiring urgent releases",
        "Need for consistent delivery and accountability across time zones",
      ],
    },
    {
      heading: "🛠️ Actions Taken",
      listItems: [
        "Established clear ownership and reporting lines within the team",
        "Introduced weekly operational reviews and daily syncs across regions",
        "Hired and onboarded a mobile developer, mentoring him into a high-performing team member",
        "Led multiple app releases to address Snyk critical issues within tight timelines",
        "Fostered collaboration between offshore and local teams using tools like Slack, Jira, and Confluence",
      ],
    },
    {
      heading: "📈 Outcomes",
      listItems: [
        "Improved release velocity and reduced turnaround time for critical fixes",
        "Strengthened mobile app delivery with a more resilient team structure",
        "Enhanced team accountability and cross-regional collaboration",
        "Positive stakeholder feedback on responsiveness and delivery quality",
      ],
    },
    {
      heading: "🔍 Reflection",
      content:
        "This initiative reinforced the importance of proactive leadership, clear communication, and investing in team growth. Turning a newly hired developer into a core contributor was a highlight, and the rapid response to Snyk issues showcased our agility and commitment to security.",
    },
  ],
};

export const caseStudies: ICaseStudy[] = [steppingUpCaseStudy, elpCaseStudy, rtbCaseStudy];
