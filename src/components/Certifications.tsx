import { certifications } from "@/data/certifications";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Certifications() {
  return (
    <div
      className="
        flex gap-4 overflow-x-auto pb-4
        sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        sm:overflow-x-visible
      "
    >
      {[...certifications].reverse().map((cert, i) => (
        <motion.a
          key={cert.id}
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="
            min-w-[260px] max-w-xs flex-shrink-0
            bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900
            border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-lg rounded-2xl p-6 flex flex-col items-center text-center
            hover:shadow-lg dark:hover:shadow-xl transition-colors transition-shadow
            sm:min-w-0 sm:max-w-none
          "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <Image src={cert.badge} alt={cert.title} width={100} height={100} className="mb-4" />
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{cert.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{cert.code}</p>
        </motion.a>
      ))}
    </div>
  );
}
