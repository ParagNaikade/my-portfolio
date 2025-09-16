"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Server, Database, Rocket, Boxes, Wrench, ScrollText, TrendingUp } from "lucide-react";
import { Accordion } from "@/components/Accordion";

function TechnicalExpertise() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mb-12 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 md:px-8 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Technical Expertise
      </h2>

      <div className="w-full">
        <Accordion title="Languages & Frameworks" icon={Server}>
          C#, .NET 8, Blazor, ASP.NET Core Web API, React 18, Next.js (SSR), WPF, WinForms, Delphi
        </Accordion>

        <Accordion title="Architecture & Patterns" icon={Boxes}>
          SOLID Principles, Design Patterns, CQRS, RabbitMQ, Azure Service Bus
        </Accordion>

        <Accordion title="Databases" icon={Database}>
          SQL Server, PostgreSQL, MongoDB, Redis
        </Accordion>

        <Accordion title="DevOps & Tools" icon={Rocket}>
          Docker, Azure Pipelines, TeamCity, Octopus Deploy, GitHub, Git, TFS
        </Accordion>

        <Accordion title="Certifications" icon={ScrollText}>
          Microsoft Certified: Azure Developer Associate (AZ-204), Azure Fundamentals (AZ-900),
          Azure AI Fundamentals (AI-900)
        </Accordion>

        <Accordion title="Currently Learning" icon={TrendingUp}>
          Cloud-native architecture, Serverless patterns, Advanced system design
        </Accordion>

        <Accordion title="Tooling I Enjoy" icon={Wrench}>
          Visual Studio, Rider, VS Code, Postman, Fiddler, Docker Desktop
        </Accordion>
      </div>
    </motion.section>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center mb-12"
      >
        <Image
          src="/profile.jpg"
          alt="Parag Naikade"
          width={120}
          height={120}
          className="rounded-full shadow-md mb-4 border border-gray-200 dark:border-gray-700"
        />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Parag Naikade</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Tech Lead • Full Stack Developer • Mentor
        </p>
      </motion.div>

      {/* Intro */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          I&apos;m a <strong>Tech Lead and Full Stack Developer</strong> with over{" "}
          <strong>12 years of experience</strong> building enterprise-grade applications across a
          wide range of industries and technologies. I specialize in designing scalable systems,
          leading cross-functional teams, and delivering high-quality software in both onshore and
          offshore setups.
        </p>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Throughout my career, I&apos;ve gained a reputation for being highly adaptable and
          solution-driven — quickly picking up new stacks, mentoring engineers, and helping teams
          succeed under tight timelines. Whether it’s modern front-end frameworks or legacy
          platforms, I enjoy solving real-world problems and turning ideas into well-engineered
          products.
        </p>
      </motion.section>

      {/* Technical Skills */}
      {TechnicalExpertise()}

      {/* Leadership */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mb-10 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Leadership Philosophy
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          As a technical leader, I believe great software is built by <strong>great teams</strong>.
          I focus on fostering a culture of ownership, learning, and continuous improvement —
          encouraging engineers to write clean code, ask good questions, and never stop growing.
        </p>
      </motion.section>

      {/* Contact */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="text-center"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Let&apos;s Connect
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          I&apos;m currently exploring new opportunities where I can contribute as a senior engineer
          or tech lead. If you&apos;re hiring or want to collaborate, feel free to reach out.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition"
        >
          Contact Me
        </Link>
      </motion.section>
    </div>
  );
}
