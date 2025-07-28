// pages/projects/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { projects, IProject } from "../../data/projects";
import { useRouter } from "next/router";

interface Props {
  project: IProject;
}

export default function ProjectPage({ project }: Props) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="mb-4">
        <a href={project.github} className="text-blue-600 mr-4" target="_blank">
          GitHub
        </a>
        {project.demo && project.demo !== "#" && (
          <a href={project.demo} className="text-blue-600" target="_blank">
            Live Demo
          </a>
        )}
      </div>
      <div className="mb-4">
        <strong>Tech Stack:</strong>
        <ul className="list-disc ml-6 text-gray-700">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: convertMarkdown(project.content) }} />
      </div>
    </div>
  );
}

// Generate static paths for each project
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map((p) => ({
    params: { slug: p.slug },
  }));
  return { paths, fallback: false };
};

// Pass the correct project to the page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = projects.find((p) => p.slug === params?.slug);
  return { props: { project } };
};

// Basic markdown converter (replace with proper lib if needed)
function convertMarkdown(md: string): string {
  return md
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\n\n/g, "<br/><br/>");
}
