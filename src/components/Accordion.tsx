import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Accordion = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="border rounded-lg mb-4 overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-100 hover:bg-gray-200 text-left shadow-sm transition duration-200"
      >
        <div className="flex items-center text-blue-700 font-medium text-base">
          <Icon className="mr-2 h-5 w-5" />
          {title}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-600 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <div
        className={`transition-max-height duration-500 ease-in-out bg-white px-5 overflow-hidden text-gray-700 ${open ? "max-h-96 py-4" : "max-h-0 py-0"}`}
      >
        <div className="leading-relaxed text-sm md:text-base">
          {children}
        </div>
      </div>
    </div>
  );
};