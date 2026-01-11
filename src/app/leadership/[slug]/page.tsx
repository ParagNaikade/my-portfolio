import { caseStudies } from "@/data/caseStudies";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((p) => p.slug === slug);
  return {
    title: caseStudy ? `${caseStudy.title} | Leadership` : "Case Study Not Found",
    description: caseStudy?.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((p) => p.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-12 px-4">
      <div className="max-w-3xl mx-auto rounded-xl shadow-lg bg-white dark:bg-gray-900 p-8 transition-colors duration-300">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {caseStudy.title}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{caseStudy.summary}</p>

        {caseStudy.sections.map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-400">
              {section.heading}
            </h2>

            {section.content && (
              <div
                className="prose prose-blue dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}

            {section.listItems && (
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                {section.listItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
