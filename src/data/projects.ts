export interface IProject {
  slug: string;
  title: string;
  description: string;
  github: string;
  demo?: string;
  tech: string[];
  content: string; // You can format this later as markdown/HTML
  gradient: {
    light: string;
    dark: string;
  };
}

export const projects: IProject[] = [
  {
    slug: "order-tracking-app",
    title: "Order Tracking App",
    description: `A real-time order tracking system for both customers and admins.
Includes live messaging, status updates, and dashboard views.
Built with scalable architecture and asynchronous communication.
Ideal for logistics, e-commerce, and delivery platforms.`,
    github: "https://github.com/ParagNaikade/OrderTrackingApp",
    demo: "#",
    tech: ["⚙️ Blazor", "📦 RabbitMQ", "🍃 MongoDB"],
    content: `...`,
    gradient: {
      light: "from-blue-50 via-gray-50 to-indigo-100",
      dark: "dark:from-slate-800 dark:via-neutral-800 dark:to-indigo-900",
    },
  },
  {
    slug: "my-portfolio",
    title: "My Portfolio",
    description: `A personal portfolio showcasing my projects and skills.
Built with modern web technologies and responsive design.
Features live demos, GitHub links, and tech stack highlights.
Designed for scalability, accessibility, and dark mode support.`,
    github: "https://github.com/ParagNaikade/my-portfolio",
    demo: "#",
    tech: ["⚛️ React", "🌐 Next.js", "🎨 Tailwind CSS"],
    content: `...`,
    gradient: {
      light: "from-blue-50 via-gray-50 to-indigo-100",
      dark: "dark:from-slate-800 dark:via-neutral-800 dark:to-indigo-900",
    },
  },
];
