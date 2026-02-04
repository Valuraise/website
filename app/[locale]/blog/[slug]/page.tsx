import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx-components";
import { formatDate } from "@/lib/utils";
import { Calendar, User, Clock } from "lucide-react";
import CTASection from "@/components/cta-section";

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.flatMap((slug) => [
    { locale: "en", slug },
    { locale: "fr", slug },
  ]);
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-accent mb-2">Post Not Found</h1>
          <p className="text-foreground/70 mb-6">The blog post you're looking for doesn't exist.</p>
          <a href={`/${locale}/blog`} className="text-accent hover:underline font-medium">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <>
      <article className="min-h-screen bg-white">
        {/* Cover Image */}
        <div className="relative w-full h-96 md:h-[500px] bg-muted overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 md:gap-8 pb-8 text-foreground/60 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-border">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm font-medium bg-muted text-foreground rounded-full hover:bg-accent/10 hover:text-accent transition-all duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* MDX Content */}
          <div className="prose prose-neutral max-w-none mb-12">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          {/* Author Bio */}
          <div className="bg-muted p-6 md:p-8 rounded-lg border border-border mb-12">
            <h3 className="text-lg font-semibold text-accent mb-2">
              {locale === "fr" ? "À propos de l'auteur" : "About the Author"}
            </h3>
            <p className="text-foreground/70">
              {post.author}{" "}
              {locale === "fr"
                ? "est un consultant senior chez Valuraise avec une expertise en IA, ingénierie des données et infrastructure cloud."
                : "is a senior consultant at Valuraise with expertise in AI, data engineering, and cloud infrastructure."}
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previousPost ? (
              <a
                href={`/${locale}/blog/${previousPost.slug}`}
                className="p-6 rounded-lg border border-border hover:shadow-lg hover:border-accent transition-all duration-300"
              >
                <p className="text-sm text-foreground/60 mb-2">
                  {locale === "fr" ? "← Article Précédent" : "← Previous Post"}
                </p>
                <p className="text-lg font-semibold text-accent hover:text-accent/80 transition-colors line-clamp-2">
                  {previousPost.title}
                </p>
              </a>
            ) : (
              <div />
            )}
            {nextPost ? (
              <a
                href={`/${locale}/blog/${nextPost.slug}`}
                className="p-6 rounded-lg border border-border hover:shadow-lg hover:border-accent transition-all duration-300 md:text-right"
              >
                <p className="text-sm text-foreground/60 mb-2">
                  {locale === "fr" ? "Prochain Article →" : "Next Post →"}
                </p>
                <p className="text-lg font-semibold text-accent hover:text-accent/80 transition-colors line-clamp-2">
                  {nextPost.title}
                </p>
              </a>
            ) : (
              <div />
            )}
          </div>
        </div>
      </article>

      {/* CTA */}
      <CTASection
        headline={locale === "fr" ? "Besoin d'une Expertise?" : "Need Expert Guidance?"}
        description={locale === "fr"
          ? "Discutons de comment nous pouvons vous aider avec votre prochain projet IA ou d'ingénierie des données."
          : "Let's discuss how we can help with your next AI or data engineering project."}
        primaryCTA={{
          text: locale === "fr" ? "Nous Contacter" : "Get in Touch",
          href: `/${locale}/contact`,
        }}
      />
    </>
  );
}
