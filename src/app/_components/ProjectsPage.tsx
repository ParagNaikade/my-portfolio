"use client";

import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-10">Projects</h1>

      <div className="flex flex-wrap gap-8 items-stretch">
        {projects.map((project, index) => (
          <div key={project.slug} className="w-full sm:w-[350px] md:w-[340px] flex">
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
