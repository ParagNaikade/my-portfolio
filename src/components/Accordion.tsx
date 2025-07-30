import { ChevronDown, LucideIcon } from "lucide-react";
import { useState } from "react";

export const Accordion = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-6 overflow-hidden transition-all bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 hover:from-blue-100 hover:to-blue-200 dark:hover:from-gray-800 dark:hover:to-gray-900 text-left transition duration-200 cursor-pointer"
      >
        <div className="flex items-center text-blue-700 dark:text-blue-300 font-medium text-base">
          <Icon className="mr-2 h-5 w-5" />
          {title}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <div
        className={`transition-max-height duration-500 ease-in-out px-5 overflow-hidden text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 ${open ? "max-h-96 py-4" : "max-h-0 py-0"}`}
      >
        <div className="leading-relaxed text-sm md:text-base border-t border-gray-100 dark:border-gray-800 pt-4">
          {children}
        </div>
      </div>
    </div>
  );
};
