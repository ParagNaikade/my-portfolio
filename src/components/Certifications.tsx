import { certifications } from "@/data/certifications";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Certifications() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 ">
      {certifications.map((cert, i) => (
        <motion.a
          key={cert.id}
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg dark:hover:shadow-xl transition-colors transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
        >
          <Image src={cert.badge} alt={cert.title} width={100} height={100} className="mb-4" />
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{cert.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{cert.code}</p>
        </motion.a>
      ))}
    </div>
  );
}
