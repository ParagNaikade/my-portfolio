export interface IProject {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features?: string[];
  images?: string[];
  tech: { name: string; icon?: string }[];
  github: string;
  demo?: string;
  gradient: {
    light: string;
    dark: string;
  };
  content: string;
}

export const projects: IProject[] = [
  {
    slug: "order-tracking-app",
    title: "Order Tracking App",
    shortDescription: "Real-time order tracking system with live updates and admin dashboards.",
    fullDescription: `The Order Tracking App is designed for logistics and delivery platforms needing real-time updates. It enables seamless communication between customers and admins, supports status transitions, and offers separate dashboards for different roles.`,
    features: [
      "Real-time messaging via RabbitMQ",
      "Role-based dashboards for customers and admins",
      "MongoDB for read optimization",
      "SQL Server for transactional data",
      "Blazor Server UI with responsive design",
    ],
    github: "https://github.com/ParagNaikade/OrderTrackingApp",
    demo: "#",
    tech: [
      { name: "Blazor", icon: "⚙️" },
      { name: "RabbitMQ", icon: "📦" },
      { name: "MongoDB", icon: "🍃" },
    ],
    content: `
### Architecture Overview

This project uses a CQRS pattern with separate read and write databases. Messages are handled via RabbitMQ and persisted accordingly.

- **Write Side**: ASP.NET Core with MediatR
- **Read Side**: MongoDB projections with background consumers
- **Frontend**: Blazor Server with SignalR

### Installation

\`\`\`bash
git clone https://github.com/ParagNaikade/OrderTrackingApp
cd OrderTrackingApp
docker-compose up --build
\`\`\`

### Screenshots

`,
    gradient: {
      light: "from-blue-50 via-gray-50 to-indigo-100",
      dark: "dark:from-slate-800 dark:via-neutral-800 dark:to-indigo-900",
    },
  },
  {
    slug: "my-portfolio",
    title: "My Portfolio",
    shortDescription: "A responsive developer portfolio showcasing projects and skills.",
    fullDescription: `A clean, modern portfolio built with Next.js, React, and Tailwind CSS. Showcases personal and professional projects with animated transitions and dark mode support.`,
    features: [
      "Responsive layout",
      "Dark mode and light mode support",
      "Project detail pages with Framer Motion transitions",
      "Easy deployment via GitHub Pages or Vercel",
    ],
    github: "https://github.com/ParagNaikade/my-portfolio",
    demo: "#",
    tech: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "🌐" },
      { name: "Tailwind CSS", icon: "🎨" },
    ],
    content: `
### About This Portfolio

The portfolio is designed for performance and flexibility. It includes animations, SEO meta tags, and modular components.

### Development Notes

- Built using **Next.js App Router**
- Uses **Framer Motion** for smooth transitions
- Supports Markdown-based content for easy updates

### Run Locally

\`\`\`bash
git clone https://github.com/ParagNaikade/my-portfolio
cd my-portfolio
yarn install
yarn dev
\`\`\`
`,
    gradient: {
      light: "from-blue-50 via-gray-50 to-indigo-100",
      dark: "dark:from-slate-800 dark:via-neutral-800 dark:to-indigo-900",
    },
  },
];
