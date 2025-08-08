import { CaseStudy } from "@/components/CaseStudy";
import { caseStudies } from "@/data/caseStudies";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CaseStudyPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <div className="bg-gradient-to-b from-[#f0f4f8] to-white dark:from-gray-900 dark:to-gray-800 px-4 md:px-12 py-8 transition-colors duration-300">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            My Leadership Journey
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            From stepping up during transitions to leading cross-functional teams and joining the
            Emerging Leaders Program, here&apos;s how I&apos;ve grown as a tech leader.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Case Studies
          </h2>
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <CaseStudy
                key={study.slug}
                title={study.title}
                summary={study.summary}
                slug={`/leadership/${study.slug}`}
                sections={study.sections}
              />
            ))}
          </div>
        </section>

        <section className="text-center mt-20">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Want to collaborate or learn more?
          </p>
          <Link
            href="/contact"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition"
          >
            Get in Touch
          </Link>
        </section>
      </div>
    </motion.section>
  );
}
