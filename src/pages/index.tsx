import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Head>
        <title>Daniel Buckner | Full Stack Developer</title>
        <meta
          name="description"
          content="Portfolio of Daniel Buckner - .NET, React, DevOps Engineer"
        />
      </Head>

      <motion.header
        className="my-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2">Hi, I'm Daniel Buckner 👋</h1>
        <p className="text-lg text-gray-600">
          Senior Full Stack Developer | .NET • React • Azure • DevOps
        </p>
      </motion.header>

      <motion.section
        className="mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="p-5 border rounded-xl shadow hover:shadow-lg transition bg-white"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="mb-2 text-gray-600">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm bg-gray-100 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/projects" className="text-blue-600 underline">
            View all projects →
          </Link>
        </div>
      </motion.section>

      <motion.section
        className="mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Resume</h2>
        <p className="mb-2 text-gray-600">You can download my resume below:</p>
        <a
          href="/Daniel_Buckner_Resume.pdf"
          download
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Download Resume
        </a>
      </motion.section>

      <motion.section
        className="mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p>
          Email:{" "}
          <a className="text-blue-600" href="mailto:daniel@example.com">
            daniel@example.com
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            className="text-blue-600"
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
          >
            yourprofile
          </a>
        </p>
      </motion.section>
    </>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function ProjectCard({
  title,
  description,
  github,
  demo,
}: {
  title: string;
  description: string;
  github: string;
  demo: string;
}) {
  return (
    <motion.div
      className="p-4 border rounded-xl shadow hover:shadow-lg transition hover:scale-105 bg-white"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-3 text-gray-600">{description}</p>
      <div className="flex space-x-4">
        <a href={github} target="_blank" className="text-blue-600">
          GitHub
        </a>
        {demo !== "#" && (
          <a href={demo} target="_blank" className="text-blue-600">
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
