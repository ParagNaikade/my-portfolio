import { logEvent } from "@/lib/gtag";
import { motion } from "framer-motion";
import { Eye, Download } from "lucide-react";

const ResumeButton = ({ type }: { type: string }) => {
  const isView = type === "view";

  const handleClick = () => {
    logEvent({
      action: `${isView ? "view" : "download"}_resume`,
      category: "downloads",
      label: "Resume PDF",
    });
  };

  const baseClasses =
    "sm:flex-1 inline-flex min-w-max whitespace-nowrap w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-medium transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

  const viewClasses =
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800";

  const downloadClasses =
    "border border-blue-600 text-blue-700 bg-white hover:bg-blue-50 focus:ring-blue-500 dark:border-blue-400 dark:text-blue-300 dark:bg-slate-900 dark:hover:bg-slate-800";

  return (
    <motion.a
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      href="/Parag_Naikade_Resume.pdf"
      {...(isView ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
      className={`${baseClasses} ${isView ? viewClasses : downloadClasses}`}
      onClick={handleClick}
    >
      {isView ? (
        <>
          <Eye size={18} /> <span>View Resume</span>
        </>
      ) : (
        <>
          <Download size={18} /> <span>Download Resume</span>
        </>
      )}
    </motion.a>
  );
};

export default function ResumeButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 mt-4 sm:mt-4 w-full max-w-[420px]">
      <ResumeButton type="view" />
      <ResumeButton type="download" />
    </div>
  );
}
