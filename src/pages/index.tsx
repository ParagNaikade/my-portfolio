import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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

      {/* Hero Section with Avatar */}
      <motion.header
        className="my-12 flex flex-col md:flex-row items-center gap-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/profile.jpg"
          alt="Parag Naikade"
          width={120}
          height={120}
          className="hidden md:block rounded-full mb-4 md:mb-0 w-32 h-32 border-4 shadow-lg border-blue-400"
          priority
        />
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Hi, I&apos;m Parag Naikade <span className="animate-wave inline-block">👋</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Tech Lead • Team Builder & Mentor • Full Stack Developer (.NET, React, AWS, Azure, AI)
          </p>
        </div>
      </motion.header>

      {/* Featured Projects */}
      <SectionTitle>Featured Projects</SectionTitle>
      <p className="mb-4 text-gray-500 dark:text-gray-400 text-sm">
        Here are a few selected projects.{" "}
        <Link href="/projects" className="underline text-blue-600 dark:text-blue-400">
          Browse all projects
        </Link>{" "}
        for more.
      </p>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} showActions />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          href="/projects"
          className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 transition font-semibold"
        >
          View All Projects
        </Link>
      </div>

      <SectionDivider />

      {/* Certifications */}
      <SectionTitle>Microsoft Certifications</SectionTitle>
      <Certifications />

      <SectionDivider />

      {/* Testimonials Carousel on Mobile */}
      <SectionTitle>Testimonials</SectionTitle>
      <div className="flex gap-4 overflow-x-auto pb-4 md:flex-wrap">
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

      <SectionDivider />

      {/* Resume */}
      <SectionTitle>Resume</SectionTitle>
      <p className="mb-2 text-gray-600 dark:text-gray-300">
        You can view/download my resume below:
      </p>
      <ResumeButtons />

      <SectionDivider />

      {/* Contact */}
      <SectionTitle>Contact</SectionTitle>
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
    </>
  );
}

// Section Title with animated gradient underline
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 relative inline-block">
      {children}
      <span className="block h-1 w-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mt-1 animate-gradient-x" />
    </h2>
  );
}

// Section Divider
function SectionDivider() {
  return <div className="my-12 border-t border-gray-200 dark:border-gray-700 w-full" />;
}

// Optional: Add this to your global CSS for waving hand animation and gradient underline
/*
@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
.animate-wave {
  animation: wave 2s infinite;
  transform-origin: 70% 70%;
}
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}
*/
