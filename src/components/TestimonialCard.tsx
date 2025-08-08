import Link from "next/link";
import React from "react";

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  linkedin?: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, role, linkedin }) => {
  return (
    <div className="flex flex-col justify-between bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 border border-gray-200 dark:border-gray-700 shadow-lg p-6 rounded-xl w-full max-w-sm mx-auto md:mx-0 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <p className="text-gray-700 dark:text-gray-200 italic mb-4 transition-colors duration-300">
        &quot;{quote}&quot;
      </p>
      <div className="flex items-center justify-between mt-4">
        <div>
          <span className="block text-blue-800 dark:text-blue-400 font-semibold">{author}</span>
          {role && <span className="block text-gray-500 dark:text-gray-400 text-sm">{role}</span>}
        </div>
        {linkedin && (
          <Link
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
            aria-label={`LinkedIn profile of ${author}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v4.75z" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
