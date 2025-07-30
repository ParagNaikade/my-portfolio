import { ICaseStudy } from "@/data/caseStudies";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const CaseStudy = ({ title, summary, slug }: ICaseStudy) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 hover:shadow-lg transition max-w-md mx-auto"
  >
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
    <p className="mb-4 text-gray-700 dark:text-gray-300">{summary}</p>
    <a
      href={`/leadership/${slug}`}
      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
    >
      Read More <ArrowRight className="ml-2" size={16} />
    </a>
  </motion.div>
);
