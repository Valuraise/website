import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "fr"
      ? "Valuraise Blog - Insights sur l'IA, les Données et la Technologie"
      : "Valuraise Blog - Insights on AI, Data & Technology";

  const description =
    locale === "fr"
      ? "Lisez les derniers articles sur l'IA, l'ingénierie des données, l'infrastructure cloud et les tendances technologiques de nos consultants experts."
      : "Read the latest articles on AI, data engineering, cloud infrastructure, and technology trends from our expert consultants.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function BlogPage() {
  const t = useTranslations();
  const posts = getAllPosts();

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
              {t("blog.page.title")}
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              {t("blog.page.description")}
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {posts.map((post, index) => (
                  <BlogCard key={post.slug} {...post} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-foreground/70 text-lg">
                  {t("blog.page.noPosts")}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
