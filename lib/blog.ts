import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPostMetadata {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  coverImage: string;
  slug: string;
  readingTime: string;
}

export interface BlogPost extends BlogPostMetadata {
  content: string;
}

export function getAllPosts(): BlogPostMetadata[] {
  const files = fs.readdirSync(postsDirectory);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const slug = file.replace(".mdx", "");

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        author: data.author as string,
        excerpt: data.excerpt as string,
        tags: data.tags as string[],
        coverImage: data.coverImage as string,
        readingTime: readingTime(content).text,
      };
    });

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      author: data.author as string,
      excerpt: data.excerpt as string,
      tags: data.tags as string[],
      coverImage: data.coverImage as string,
      content,
      readingTime: readingTime(content).text,
    };
  } catch (error) {
    return null;
  }
}

export function getPostSlugs(): string[] {
  const files = fs.readdirSync(postsDirectory);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(".mdx", ""));
}
