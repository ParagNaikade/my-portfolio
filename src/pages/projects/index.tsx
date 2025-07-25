// pages/projects/index.tsx
import Link from "next/link";
import { projects } from "../../data/projects";

export default function Projects() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Projects</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug}
            className="block p-4 border rounded-lg shadow hover:shadow-md hover:scale-[1.02] transition"
          >
            <h2 className="text-xl font-semibold mb-1">{project.title}</h2>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <div className="flex gap-2 text-sm text-gray-500">
              {project.tech.map((tech) => (
                <span key={tech} className="bg-gray-100 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
