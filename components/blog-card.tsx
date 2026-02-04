"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Clock, Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";
import type { BlogPostMetadata } from "@/lib/blog";

interface BlogCardProps extends BlogPostMetadata {
  index?: number;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  date,
  author,
  tags,
  coverImage,
  readingTime,
  index = 0,
}: BlogCardProps) {
  const locale = useLocale();

  return (
    <motion.article
      variants={fadeInUp}
      custom={index}
      className="group flex flex-col overflow-hidden rounded-xl border border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 bg-white"
    >
      <Link href={`/${locale}/blog/${slug}`} className="flex flex-col h-full">
        {/* Cover Image - Larger */}
        <div className="relative h-56 md:h-64 overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow p-6 md:p-7">
          {/* Tags - Positioned directly below image */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded-full hover:bg-accent/10 hover:text-accent transition-all duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title - Larger and bolder */}
          <h3 className="text-2xl md:text-xl font-bold text-accent mb-3 group-hover:text-accent/80 transition-colors line-clamp-2 leading-tight">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-foreground/70 text-sm md:text-base mb-6 flex-grow line-clamp-3 leading-relaxed">
            {excerpt}
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-border mb-5" />

          {/* Meta Footer */}
          <div className="flex items-center justify-between text-xs md:text-sm text-foreground/60 gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={16} className="text-accent/60" />
              <span>{formatDate(date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={16} className="text-accent/60" />
              <span className="truncate">{author}</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Clock size={16} className="text-accent/60" />
              <span>{readingTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
