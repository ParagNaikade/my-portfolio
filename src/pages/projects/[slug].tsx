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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{project.shortDescription}</p>

      <div className="flex gap-4 mb-6">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub Repo
        </a>
        {project.demo && project.demo !== "#" && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Live Demo
          </a>
        )}
      </div>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Full Description</h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {project.fullDescription}
        </p>
      </section>

      {project.features && project.features.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {project.features.map((feat, idx) => (
              <li key={idx}>{feat}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Tech Stack</h2>
        <ul className="flex flex-wrap gap-3">
          {project.tech.map((tech) => (
            <span
              key={tech.name}
              className="inline-block bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded-full"
            >
              {tech.icon} {tech.name}
            </span>
          ))}
        </ul>
      </section>

      <section className="prose prose-lg dark:prose-invert max-w-none">
        <MarkdownRenderer markdown={project.content} />
      </section>
    </div>
  );
}

// Simple markdown to HTML converter for limited syntax
function convertMarkdown(md: string): string {
  return md
    .replace(/\n/g, "<br/>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/### (.*)/g, "<h3>$1</h3>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />')
    .replace(/- (.*)/g, "<li>$1</li>");
}

function MarkdownRenderer({ markdown }: { markdown: string }) {
  return <div dangerouslySetInnerHTML={{ __html: convertMarkdown(markdown) }} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = projects.find((p) => p.slug === params?.slug);
  if (!project) return { notFound: true };
  return { props: { project } };
};
