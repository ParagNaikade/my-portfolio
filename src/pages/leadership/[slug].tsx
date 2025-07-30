import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { caseStudies, ICaseStudy } from "@/data/caseStudies";

interface Props {
  caseStudy: ICaseStudy;
}

export default function CaseStudyPage({ caseStudy }: Props) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;

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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = caseStudies.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const caseStudy = caseStudies.find((p) => p.slug === params?.slug);
  if (!caseStudy) return { notFound: true };
  return { props: { caseStudy } };
};
