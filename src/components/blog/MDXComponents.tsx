import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the interactive components to prevent SSR issues
const ColorPaletteGenerator = dynamic(() => import("./ColorPaletteGenerator"), {
  ssr: false,
});

const AnimatedCounter = dynamic(() => import("./AnimatedCounter"), {
  ssr: false,
});

const MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      className="mb-6 mt-10 text-2xl font-bold text-black dark:text-white"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="mb-4 mt-8 text-xl font-medium text-black dark:text-white"
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className="mb-4 mt-6 text-lg font-medium text-black dark:text-white"
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className="mb-5 leading-relaxed text-gray-600 dark:text-gray-300"
    />
  ),
  a: ({ href = "", ...props }) => {
    if (href.startsWith("http")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
          {...props}
        />
      );
    }
    return (
      <Link
        href={href}
        className="text-blue-600 hover:underline dark:text-blue-400"
        {...props}
      />
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      className="mb-6 list-disc pl-5 text-gray-600 dark:text-gray-300"
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      className="mb-6 list-decimal pl-5 text-gray-600 dark:text-gray-300"
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="mb-2" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="mb-6 border-l-2 border-gray-200 pl-4 italic text-gray-500 dark:border-gray-700 dark:text-gray-400"
    />
  ),
  img: ({ alt = "", src = "", ...props }) => (
    <div className="my-6">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={600}
        className="rounded-sm"
        {...props}
      />
      {alt && (
        <div className="mt-2 text-center text-sm text-gray-500">{alt}</div>
      )}
    </div>
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} className="not-prose rounded-md" />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Inline code blocks
    if (!className?.includes("language-")) {
      return (
        <code
          {...props}
          className="rounded bg-gray-50 px-1 py-0.5 text-sm text-gray-800 dark:bg-gray-900 dark:text-gray-200"
        />
      );
    }

    // Code blocks with language - rehype-pretty-code will handle these
    return <code {...props} className={className} />;
  },
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr {...props} className="my-8 border-gray-100 dark:border-gray-800" />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="mb-6 overflow-x-auto">
      <table
        {...props}
        className="min-w-full table-auto border-collapse text-sm"
      />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      {...props}
      className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-left font-medium dark:border-gray-700 dark:bg-gray-900"
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      {...props}
      className="border-b border-gray-100 px-4 py-2 dark:border-gray-800"
    />
  ),

  // Add our custom components to make them available in MDX
  ColorPaletteGenerator,
  AnimatedCounter,
};

export default MDXComponents;
