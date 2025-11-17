import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import Certifications from "@/components/Certifications";
import ResumeButtons from "@/components/ResumeButtons";

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
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Hi, I&apos;m Parag Naikade 👋
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Tech Lead • Team Builder & Mentor • Full Stack Developer (.NET, React, Azure)
        </p>
      </motion.header>

      <motion.section
        className="mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Featured Projects
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <div className="mt-6">
          <Link href="/projects" className="text-blue-600 dark:text-blue-400 underline">
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
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Microsoft Certifications
        </h2>
        <Certifications />
      </motion.section>

      <motion.section
        className="mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Testimonials
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              author={testimonial.author}
              quote={testimonial.quote}
              role={testimonial.role}
              linkedin={testimonial.linkedin}
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Resume</h2>
        <p className="mb-2 text-gray-600 dark:text-gray-300">
          You can view/download my resume below:
        </p>
        <ResumeButtons />
      </motion.section>

      <motion.section
        className="mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Contact</h2>
        <p>
          Email:{" "}
          <a className="text-blue-600 dark:text-blue-400" href="mailto:contact@paragnaikade.com">
            contact@paragnaikade.com
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            className="text-blue-600 dark:text-blue-400"
            href="https://www.linkedin.com/in/parag-naikade/"
            target="_blank"
            rel="noopener noreferrer"
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
