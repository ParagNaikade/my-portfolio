import Link from "next/link";
import { motion } from "framer-motion";
import { IProject } from "@/data/projects";

interface ProjectCardProps {
  project: IProject;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className={`group flex flex-col h-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-500 transition duration-300 bg-gradient-to-br ${project.gradient.light} ${project.gradient.dark}`}
      >
        <div className="flex flex-col flex-1 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
            {project.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto pt-4">
            {project.tech.map((tech) => (
              <span
                key={tech.name}
                className="inline-block bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded-full"
              >
                {tech.icon} {tech.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
