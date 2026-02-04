import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

export const mdxComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-accent">{children}</h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-3xl font-bold mt-8 mb-4 text-accent">{children}</h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-2xl font-semibold mt-6 mb-3 text-accent">{children}</h3>
  ),
  h4: ({ children }: { children: ReactNode }) => (
    <h4 className="text-xl font-semibold mt-4 mb-2 text-accent">{children}</h4>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-foreground/80 mb-4 leading-relaxed">{children}</p>
  ),
  a: ({ href, children }: { href: string; children: ReactNode }) => (
    <Link
      href={href}
      className="text-accent hover:underline font-medium transition-colors"
    >
      {children}
    </Link>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="text-foreground/80">{children}</li>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-accent pl-4 py-2 mb-4 italic text-foreground/70">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="px-2 py-1 rounded text-sm font-mono text-muted">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-accent text-white p-4 rounded-lg mb-4 overflow-x-auto font-mono text-sm">
      {children}
    </pre>
  ),
  img: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    <div className="relative w-full h-auto my-6">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="rounded-lg w-full h-auto"
        {...props}
      />
    </div>
  ),
  hr: () => <hr className="my-8 border-border" />,
  table: ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="bg-muted border-b border-border">{children}</thead>
  ),
  tbody: ({ children }: { children: ReactNode }) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }: { children: ReactNode }) => (
    <tr className="border-b border-border hover:bg-muted/50 transition-colors">
      {children}
    </tr>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="px-4 py-2 text-foreground/70">{children}</td>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="px-4 py-2 text-left font-semibold text-accent">{children}</th>
  ),
};
