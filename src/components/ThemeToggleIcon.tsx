"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggleIcon = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="group relative w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-500 bg-gray-200 dark:bg-gray-800 hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 dark:hover:ring-blue-500"
    >
      <div className="absolute inset-0 rounded-full bg-yellow-300 dark:bg-blue-500 opacity-20 group-hover:scale-125 scale-100 transition-transform duration-500 blur-xl" />

      <Sun
        className={`absolute h-6 w-6 text-yellow-500 transition-all duration-300 ease-out transform ${
          isDark ? "opacity-0 scale-50 rotate-180" : "opacity-100 scale-100 rotate-0"
        }`}
      />
      <Moon
        className={`absolute h-6 w-6 text-blue-500 transition-all duration-300 ease-out transform ${
          isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-180"
        }`}
      />
    </button>
  );
};
