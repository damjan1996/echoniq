import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';

interface PostContentProps {
  content: string;
  className?: string;
}

export const PostContent: React.FC<PostContentProps> = ({ content, className }) => {
  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      className={cn('post-content', className)}
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            // Custom image component with Next.js Image optimization
            img: ({ src, alt }) => {
              if (!src) return null;

              // Handle external and internal images
              const isExternal = src.startsWith('http') || src.startsWith('https');

              return (
                <div className="relative my-8 rounded-lg overflow-hidden">
                  {isExternal ? (
                    // External image: use Image component for optimization
                    <Image
                      src={src}
                      alt={alt || ''}
                      width={1200}
                      height={675}
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    // Internal image: use Image component
                    <Image
                      src={src}
                      alt={alt || ''}
                      width={1200}
                      height={675}
                      className="w-full h-auto rounded-lg"
                    />
                  )}
                  {alt && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 block mt-2 text-center">
                      {alt}
                    </span>
                  )}
                </div>
              );
            },

            // Custom link component
            a: ({ href, children, ...props }) => {
              if (!href) return null;

              // Handle internal and external links
              const isExternal = href.startsWith('http') || href.startsWith('https');

              if (isExternal) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    {...props}
                  >
                    {children}
                    <span className="inline-block ml-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline -mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </span>
                  </a>
                );
              }

              return (
                <Link
                  href={href}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  {...props}
                >
                  {children}
                </Link>
              );
            },

            // Custom heading components
            h1: ({ children, ...props }) => (
              <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6" {...props}>
                {children}
              </h1>
            ),

            h2: ({ children, ...props }) => (
              <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4" {...props}>
                {children}
              </h2>
            ),

            h3: ({ children, ...props }) => (
              <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3" {...props}>
                {children}
              </h3>
            ),

            h4: ({ children, ...props }) => (
              <h4 className="text-lg md:text-xl font-bold mt-5 mb-2" {...props}>
                {children}
              </h4>
            ),

            // Custom blockquote
            blockquote: ({ children, ...props }) => (
              <blockquote
                className="border-l-4 border-blue-600 dark:border-blue-400 pl-4 py-1 my-4 italic text-gray-700 dark:text-gray-300"
                {...props}
              >
                {children}
              </blockquote>
            ),

            // Corrected Code component
            code: ({ className, children }) => {
              // Check if it's an inline code or a code block
              // In newer versions of react-markdown, the 'inline' property
              // might not be directly available, so we use the class context
              const isInline = !className;

              const match = /language-(\w+)/.exec(className || '');

              // Inline code
              if (isInline) {
                return (
                  <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                );
              }

              // Code block
              return (
                <div className="my-4 bg-gray-800 dark:bg-gray-900 rounded-lg overflow-hidden">
                  {match && (
                    <div className="bg-gray-700 dark:bg-gray-800 px-4 py-1 text-xs text-gray-200">
                      {match[1]}
                    </div>
                  )}
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-gray-200 text-sm font-mono">{children}</code>
                  </pre>
                </div>
              );
            },

            // Custom table
            table: ({ children, ...props }) => (
              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse" {...props}>
                  {children}
                </table>
              </div>
            ),

            // Table headers
            th: ({ children, ...props }) => (
              <th
                className="py-2 px-4 bg-gray-100 dark:bg-gray-800 text-left text-gray-800 dark:text-gray-200 font-medium border border-gray-300 dark:border-gray-700"
                {...props}
              >
                {children}
              </th>
            ),

            // Table cells
            td: ({ children, ...props }) => (
              <td
                className="py-2 px-4 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                {...props}
              >
                {children}
              </td>
            ),

            // Lists
            ul: ({ children, ...props }) => (
              <ul
                className="list-disc pl-6 my-4 space-y-2 text-gray-800 dark:text-gray-200"
                {...props}
              >
                {children}
              </ul>
            ),

            ol: ({ children, ...props }) => (
              <ol
                className="list-decimal pl-6 my-4 space-y-2 text-gray-800 dark:text-gray-200"
                {...props}
              >
                {children}
              </ol>
            ),

            // Horizontal rule
            hr: ({ ...props }) => (
              <hr className="my-8 border-t border-gray-300 dark:border-gray-700" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default PostContent;
