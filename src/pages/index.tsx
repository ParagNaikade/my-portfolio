import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import { logEvent } from "@/lib/gtag";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Parag Naikade | Lead Full Stack Developer</title>
        <meta
          name="description"
          content="Portfolio of Parag Naikade - .NET, React, DevOps Engineer"
        />
      </Head>

      <motion.header
        className="my-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2">Hi, I&apos;m Parag Naikade 👋</h1>
        <p className="text-lg text-gray-600">
          Lead Full Stack Developer | .NET • Blazor • React • Azure • DevOps
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
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 2).map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
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
          href="/Parag Naikade 2025.pdf"
          download
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() =>
            setTimeout(() => {
              logEvent({ action: "download_resume", category: "downloads", label: "Resume PDF" });
            }, 500)
          }
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
            paragnaikade@gmail.com
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            className="text-blue-600"
            href="https://www.linkedin.com/in/parag-naikade/"
            target="_blank"
          >
            My Profile
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
