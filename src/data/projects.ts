// data/projects.ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  github: string;
  demo?: string;
  tech: string[];
  content: string; // You can format this later as markdown/HTML
}

export const projects: Project[] = [
  {
    slug: "order-tracking-app",
    title: "Order Tracking App",
    description: "Blazor Server, RabbitMQ, MongoDB, Docker, CI/CD",
    github: "https://github.com/yourusername/order-tracking-app",
    demo: "#",
    tech: ["Blazor", "RabbitMQ", "Docker", "MongoDB"],
    content: `
      This app allows customers to track their orders in real-time...
      
      **Tech Stack**:
      - Backend: Blazor Server (.NET 8)
      - Messaging: RabbitMQ
      - Database: MongoDB, SQL Server
      - CI/CD: GitHub Actions
    `,
  },
  {
    slug: "secure-payment-form",
    title: "Secure Payment Form",
    description: "React + eWAY integration with secure fields",
    github: "https://github.com/yourusername/payment-app",
    demo: "#",
    tech: ["React", "eWAY", "Security"],
    content: `
      A secure and PCI-compliant payment page integrated with eWAY Secure Fields...
      
      **Key Features**:
      - React SPA
      - Hosted fields for card input
      - Token-based communication with server
    `,
  },
];
