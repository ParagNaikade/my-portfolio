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
  architecture: Record<string, string>;
  installation: string[];
  screenshots: string[];
  devops: {
    ciCd: string;
    hosting: string;
    analytics: string;
  };
  notes: string[];
}

export const projects: IProject[] = [
  {
    slug: "my-portfolio",
    title: "My Portfolio",
    shortDescription:
      "A sleek, professional portfolio showcasing full-stack skills and leadership.",
    fullDescription: `Built to reflect the capabilities of a Lead Full Stack Developer, this portfolio demonstrates expertise in modern web technologies, CI/CD workflows, and end-to-end deployment.`,
    features: [
      "Built with React 19, Next.js 15, and Tailwind CSS v4 (zero-config)",
      "Fully responsive layout with dark/light theme support using next-themes",
      "Animated transitions with Framer Motion",
      "Lucide-react icons for a clean, consistent UI",
      "Contact form with Formspree integration and Google reCAPTCHA for spam protection",
      "Google Analytics integration for traffic insights",
      "CI/CD pipeline using GitHub Actions for build & deploy automation",
      "Hosted on a custom Cloudflare domain with HTTPS and production performance",
      "Developer experience enhancements: ESLint, Prettier, and project-wide linting setup",
    ],
    github: "https://github.com/ParagNaikade/my-portfolio",
    demo: "https://paragnaikade.com/",
    tech: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "🌐" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Framer Motion", icon: "🎞️" },
      { name: "Lucide React", icon: "🧩" },
      { name: "Formspree", icon: "📨" },
      { name: "ReCAPTCHA", icon: "🔒" },
      { name: "GitHub Actions", icon: "🚀" },
      { name: "Cloudflare", icon: "☁️" },
      { name: "Google Analytics", icon: "📊" },
    ],
    architecture: {
      Frontend:
        "Built entirely with React 19 and Next.js 15, utilizing the App Router for modern routing and React Markdown for rendering rich content.",
      "Static Site Generation":
        "Uses Next.js getStaticProps and getStaticPaths to pre-render project pages at build time for fast performance and SEO benefits.",
      "Theming & UI":
        "Dark and light mode support implemented with next-themes for seamless theme switching, and icons are provided by lucide-react for a consistent UI experience.",
    },
    installation: [
      "Clone the repo: git clone https://github.com/ParagNaikade/my-portfolio",
      "Install dependencies: yarn install",
      "Start the dev server: yarn dev",
    ],
    screenshots: ["/demo_1.png", "/demo_2.png"],
    devops: {
      ciCd: "Automated CI/CD using GitHub Actions to build and deploy on every commit.",
      hosting:
        "Hosted on Cloudflare Pages with a custom domain (paragnaikade.com) and HTTPS enabled.",
      analytics: "Google Analytics integrated to track traffic and user behavior.",
    },
    notes: [
      "Supports SEO optimizations and smooth page transitions.",
      "Uses ESLint and Prettier to enforce consistent code style.",
      "Contact form protected with Google reCAPTCHA v2 to prevent spam.",
    ],
    gradient: {
      light: "from-blue-50 via-gray-50 to-indigo-100",
      dark: "dark:from-slate-800 dark:via-neutral-800 dark:to-indigo-900",
    },
  },
  {
    slug: "order-tracking-app",
    title: "Order Management System with Clean Architecture",
    shortDescription:
      "A .NET solution implementing clean architecture with CQRS, domain events, RabbitMQ integration, and MongoDB synchronization.",
    fullDescription: `
    This project implements an order management system using .NET and follows the Clean Architecture pattern.
    It exposes three REST API endpoints: Get Orders, Get Order by ID, and Create Order.
    The Create Order endpoint triggers a CQRS command handler that performs business validations such as inventory checks,
    persists the order to a SQL Server database, and then publishes an OrderCreatedEvent domain event.
    An event handler listens for this event and publishes a message to a RabbitMQ queue.
    A separate Consumer worker application listens to this RabbitMQ queue, reads the order data from the SQL database,
    and synchronizes it to a MongoDB collection.
    Additionally, there is a Migration Runner console application that performs initial data seeding.
    The entire solution is containerized using Docker with separate Dockerfiles for the API, Consumer, and Migration Runner apps.
    MongoDB, SQL Server, and RabbitMQ services are orchestrated using Docker Compose.
  `,
    features: [
      "Clean Architecture with separated layers (API, Application, Domain, Infrastructure)",
      "CQRS pattern with MediatR commands and queries",
      "Domain events for decoupled event-driven communication",
      "RabbitMQ integration for asynchronous messaging",
      "Worker service for syncing data from SQL Server to MongoDB",
      "Initial data seeding via Migration Runner console app",
      "Containerized with Docker and orchestrated using Docker Compose",
    ],
    images: [
      // example placeholders, add your actual image URLs or paths
      "/images/order-management-architecture.png",
      "/images/docker-compose-setup.png",
      "/images/api-endpoints.png",
    ],
    tech: [
      { name: "C#", icon: "💻" },
      { name: ".NET 8", icon: "🌐" },
      { name: "SQL Server", icon: "🗄️" },
      { name: "MongoDB", icon: "🍃" },
      { name: "RabbitMQ", icon: "🐇" },
      { name: "Docker", icon: "🐳" },
      { name: "Docker Compose", icon: "⚙️" },
      { name: "CQRS", icon: "🔄" },
      { name: "Clean Architecture", icon: "🏛️" },
    ],
    github: "https://github.com/yourusername/order-management-clean-architecture",
    demo: "", // add URL if you have a live demo
    gradient: {
      light: "from-blue-50 via-gray-50 to-indigo-100",
      dark: "dark:from-slate-800 dark:via-neutral-800 dark:to-indigo-900",
    },
    architecture: {
      API: "Exposes REST endpoints and handles HTTP requests",
      Application: "CQRS handlers and business logic for orders",
      Domain: "Entities, value objects, domain events",
      Infrastructure: "Database access, event handlers, RabbitMQ publisher",
      "Consumer Worker": "Listens to RabbitMQ, syncs SQL data to MongoDB",
      "Migration Runner": "Console app for initial database seeding",
      "Docker Compose": "Orchestrates MongoDB, SQL Server, RabbitMQ services",
    },
    installation: [
      "Clone the repository",
      "Run docker-compose up to start MongoDB, SQL Server, and RabbitMQ",
      "Build and run the API, Consumer, and Migration Runner projects via Docker",
      "Use API endpoints to create and retrieve orders",
    ],
    screenshots: ["/demo_3.svg"],
    devops: {
      ciCd: "GitHub Actions pipeline builds Docker images and runs tests",
      hosting: "Docker Compose setup suitable for local or cloud VM deployment",
      analytics: "Basic logging with Serilog integrated in API and Consumer",
    },
    notes: [
      "CQRS and domain events help maintain clean separation of concerns.",
      "RabbitMQ decouples the order creation from downstream data synchronization.",
      "Separate worker app allows scalable syncing to MongoDB without blocking API.",
      "Docker Compose simplifies local development environment setup.",
    ],
  },
];
