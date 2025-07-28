import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    description: string;
    tech: string[];
    gradient: {
      light: string;
      dark: string;
    };
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={`group block overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-500 transition duration-300 bg-gradient-to-br ${project.gradient.light} ${project.gradient.dark}`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 mb-2">
            {project.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="inline-block bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
