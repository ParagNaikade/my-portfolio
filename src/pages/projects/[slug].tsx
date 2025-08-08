import { GetStaticPaths, GetStaticProps } from "next";
import { projects, IProject } from "../../data/projects";
import { useRouter } from "next/router";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface Props {
  project: IProject;
}

export default function ProjectPage({ project }: Props) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
      {/* Title and Short Description */}
      <header>
        <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
        <p className="text-gray-700 dark:text-gray-300">{project.shortDescription}</p>
      </header>

      {/* GitHub and Demo Links */}
      <div className="flex gap-6">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          <Github size={18} />
          <span>GitHub Repo</span>
        </a>
        {project.demo && project.demo !== "#" && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-300 rounded-md shadow hover:bg-blue-50 dark:hover:bg-blue-950 transition"
          >
            <ExternalLink size={18} />
            <span>Live Demo</span>
          </a>
        )}
      </div>

      {/* Full Description */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Full Description</h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {project.fullDescription}
        </p>
      </section>

      {/* Features */}
      {project.features && project.features.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            {project.features.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Tech Stack</h2>
        <ul className="flex flex-wrap gap-3">
          {project.tech.map(({ name, icon }) => (
            <li
              key={name}
              className="inline-block bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded-full select-none"
            >
              {icon && <span className="mr-1">{icon}</span>}
              {name}
            </li>
          ))}
        </ul>
      </section>

      {/* Architecture */}
      {project.architecture && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Architecture</h2>
          <div className="space-y-4">
            <dl>
              {Object.entries(project.architecture).map(([key, value]) => (
                <div key={key}>
                  <dt className="font-semibold">{key}</dt>
                  <dd className="mb-4 text-gray-700 dark:text-gray-300">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Installation */}
      {project.installation && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Installation</h2>
          <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
            {project.installation.map((step, i) => (
              <li key={i} className="whitespace-pre-wrap">
                {step}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Screenshots</h2>
          <div className="flex flex-wrap gap-4">
            {project.screenshots.map((src, i) => (
              <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="block">
                <Image
                  src={src}
                  width={600}
                  height={400}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="rounded-lg shadow-md max-w-full h-auto border border-gray-200 dark:border-gray-700"
                />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* DevOps / CI-CD */}
      {project.devops && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">DevOps & Deployment</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            {project.devops.ciCd && (
              <li>
                <strong>CI/CD:</strong> {project.devops.ciCd}
              </li>
            )}
            {project.devops.hosting && (
              <li>
                <strong>Hosting:</strong> {project.devops.hosting}
              </li>
            )}
            {project.devops.analytics && (
              <li>
                <strong>Analytics:</strong> {project.devops.analytics}
              </li>
            )}
          </ul>
        </section>
      )}

      {/* Notes */}
      {project.notes && project.notes.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Notes</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            {project.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
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
