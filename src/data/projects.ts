export interface IProject {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features?: string[];
  tech: { name: string; icon?: string }[];
  github: string;
  demo?: string;
  gradient: {
    light: string;
    dark: string;
  };
  architecture: Record<string, string>;
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
    slug: "ai-chatbot",
    title: "AI Chatbot with Amazon Bedrock & Next.js",
    shortDescription:
      "A secure, mobile-friendly AI chatbot using Amazon Bedrock, Next.js, and Tailwind CSS. Features persistent chat, AWS OIDC CI/CD, and robust cloud protections.",
    fullDescription: `
    This project is a modern AI chatbot built with Next.js and Tailwind CSS, designed for seamless use across all devices. It leverages Amazon Bedrock's Nova micro model for AI responses, with a backend powered by AWS Lambda and API Gateway (SAM project). The UI is fully responsive and keeps chat history in local storage, so conversations persist even after a page refresh.
    Security is a top priority: the chatbot is protected with rate limiting, DoS protection, Cloudflare security, and AWS CloudWatch alarms. CI/CD is handled via GitHub Actions using AWS OIDC for secure deployments, with IAM roles configured for GitHub authentication.
  `,
    features: [
      "Chatbot UI built with Tailwind CSS and Next.js",
      "Mobile-friendly, responsive layout for all devices",
      "Persistent chat history using local storage",
      "AI powered by Amazon Bedrock Nova micro model",
      "Backend with AWS Lambda and API Gateway (SAM project)",
      "Rate limiting and DoS protection on API endpoints",
      "Cloudflare security and protection",
      "AWS CloudWatch alarms for monitoring",
      "CI/CD pipeline with GitHub Actions and AWS OIDC integration",
      "IAM roles for secure GitHub-to-AWS authentication",
    ],
    tech: [
      { name: "Next.js", icon: "🌐" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "React", icon: "⚛️" },
      { name: "Amazon Bedrock", icon: "🪨" },
      { name: "AWS Lambda", icon: "λ" },
      { name: "API Gateway", icon: "🛣️" },
      { name: "SAM", icon: "📦" },
      { name: "Cloudflare", icon: "☁️" },
      { name: "CloudWatch", icon: "📈" },
      { name: "GitHub Actions", icon: "🚀" },
      { name: "OIDC", icon: "🔐" },
      { name: "Local Storage", icon: "💾" },
    ],
    github: "https://github.com/ParagNaikade/my-portfolio-chatbot",
    demo: "https://paragnaikade.com/",
    gradient: {
      light: "from-green-50 via-blue-50 to-indigo-100",
      dark: "dark:from-slate-800 dark:via-neutral-800 dark:to-indigo-900",
    },
    architecture: {
      Frontend:
        "Next.js app with Tailwind CSS for UI, chat state managed in local storage for persistence.",
      Backend: "AWS Lambda functions exposed via API Gateway, deployed using AWS SAM.",
      AI: "Amazon Bedrock Nova micro model for generating responses.",
      Security: "Rate limiting, DoS protection, Cloudflare, and AWS CloudWatch alarms.",
      CI_CD: "GitHub Actions pipeline with AWS OIDC provider and IAM role for secure deployments.",
    },
    screenshots: ["/chatbot_1.png", "/chatbot_2.png"],
    devops: {
      ciCd: "GitHub Actions with AWS OIDC for secure, automated deployments.",
      hosting:
        "Frontend hosted on Vercel as a part of portfolio website, backend on AWS Lambda/API Gateway.",
      analytics: "AWS CloudWatch for monitoring and alarms.",
    },
    notes: [
      "Chat history is stored in local storage for persistence across sessions.",
      "API endpoints are protected with rate limiting and DoS protection.",
      "Cloudflare and AWS CloudWatch provide additional layers of security and monitoring.",
      "CI/CD uses AWS OIDC and IAM roles for secure GitHub-to-AWS authentication.",
    ],
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
    tech: [
      { name: "C#", icon: "💻" },
      { name: ".NET 8", icon: "🌐" },
      { name: "SQL Server", icon: "🗄️" },
      { name: "MongoDB", icon: "🍃" },
      { name: "RabbitMQ", icon: "🐇" },
      { name: "Docker", icon: "🐳" },
      { name: "Docker Compose", icon: "⚙️" },
      { name: "CQRS", icon: "🔄" },
    ],
    github: "https://github.com/ParagNaikade/OrderTrackingApp",
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
  {
    slug: "blazor-game-lobby",
    title: "Blazor Game Lobby: Real-Time Rock-Paper-Scissors",
    shortDescription:
      "A real-time, multiplayer Rock-Paper-Scissors game built with Blazor WebAssembly and SignalR. Players join rooms, select avatars, and play with live updates.",
    fullDescription: `
    BlazorGameLobby is a real-time, multiplayer Rock-Paper-Scissors game built with Blazor WebAssembly and ASP.NET Core SignalR.
    Players can join a game room, select an avatar, and play against each other with instant updates.
    The project demonstrates modern .NET 8 features, real-time communication, and a clean separation of client/server/shared code.
  `,
    features: [
      "Blazor WebAssembly frontend for fast, interactive UI",
      "SignalR for real-time communication between players",
      "Bootstrap 5 for responsive, modern styling",
      "Player avatars and names for personalized gameplay",
      "Room system: create or join rooms by ID",
      "Game state management: handles moves, results, and player disconnects",
    ],
    tech: [
      { name: "Blazor WebAssembly", icon: "⚡" },
      { name: ".NET 8", icon: "🌐" },
      { name: "ASP.NET Core", icon: "🖥️" },
      { name: "SignalR", icon: "🔗" },
      { name: "Bootstrap 5", icon: "🎨" },
      { name: "C#", icon: "💻" },
    ],
    github: "https://github.com/ParagNaikade/Blazor-Game-Lobby",
    demo: "https://blazor-demo.paragnaikade.com/lobby",
    gradient: {
      light: "from-yellow-50 via-blue-50 to-green-100",
      dark: "dark:from-slate-800 dark:via-neutral-800 dark:to-green-900",
    },
    architecture: {
      Client: "Blazor WebAssembly frontend for UI and game interactions",
      Server: "ASP.NET Core backend with SignalR hub for real-time messaging",
      Shared: "Shared models and enums for consistent game logic",
      GameHub: "SignalR hub managing game state and player moves",
      "Lobby.razor": "Lobby page for joining rooms and selecting avatars",
      "GameRoom.razor": "Main game room UI for playing rounds",
    },
    screenshots: ["/rps_1.png", "/rps_2.png", "/rps_3.png", "/rps_4.png"], // Add screenshot paths if available, e.g. ["/blazor_game_lobby_1.png"]
    devops: {
      ciCd: "Auto deplpoyment via Render.com with GitHub integration",
      hosting: "Hosted on Render.com and mapped to a subdomain via Cloudflare DNS.",
      analytics: "",
    },
    notes: [
      "Avatars can be customized by editing the Avatars array in Lobby.razor.",
      "UI is styled with Bootstrap 5 for easy customization.",
      "Game logic is extendable in GameHub.cs and shared models.",
      "MIT licensed for open source contribution and modification.",
    ],
  },
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
      "Hosted on Vercel with a custom Cloudflare domain, HTTPS, and production performance",
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
];
