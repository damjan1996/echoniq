import Image from 'next/image';
import React, { useState, useCallback } from 'react';

interface PostContentEditorProps {
  content: string;
  onChange: (content: string) => void;
}

/**
 * Simple Markdown Editor for Blog Post Content
 * In a real application, this would be a more sophisticated rich text editor
 */
const PostContentEditor: React.FC<PostContentEditorProps> = ({ content, onChange }) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Simple markdown preview (in a real app, this would use a proper Markdown parser)
  const renderPreview = useCallback(() => {
    if (!content) return <p className="text-gray-500">No content to preview...</p>;

    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {content.split('\n').map((paragraph, index) => {
          // Basic heading rendering
          if (paragraph.startsWith('# ')) {
            return (
              <h1 key={index} className="text-3xl font-bold">
                {paragraph.substring(2)}
              </h1>
            );
          }
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="text-2xl font-bold">
                {paragraph.substring(3)}
              </h2>
            );
          }
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-xl font-bold">
                {paragraph.substring(4)}
              </h3>
            );
          }

          // Basic link rendering
          if (paragraph.match(/\[.*\]\(.*\)/)) {
            const parts = paragraph.split(/\[(.*?)\]\((.*?)\)/g);
            return (
              <p key={index}>
                {parts.map((part, i) => {
                  // Even indices are regular text, odd are link text, odd+1 are URLs
                  if (i % 3 === 1 && parts[i + 1]) {
                    return (
                      <a key={i} href={parts[i + 1]} className="text-blue-600 hover:underline">
                        {part}
                      </a>
                    );
                  } else if (i % 3 === 0) {
                    return part;
                  }
                  return null;
                })}
              </p>
            );
          }

          // Basic image rendering - using Next.js Image component
          if (paragraph.match(/!\[.*\]\(.*\)/)) {
            const alt = paragraph.match(/!\[(.*?)\]/)?.[1] || '';
            const src = paragraph.match(/\((.*?)\)/)?.[1] || '';
            return (
              <div key={index} className="my-4 relative w-full h-auto aspect-video">
                <Image
                  src={src}
                  alt={alt}
                  className="rounded-md"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            );
          }

          // Basic list rendering
          if (paragraph.startsWith('* ')) {
            return (
              <li key={index} className="ml-8">
                {paragraph.substring(2)}
              </li>
            );
          }

          // Regular paragraph
          return paragraph ? (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ) : (
            <br key={index} />
          );
        })}
      </div>
    );
  }, [content]);

  // Handle toolbar button clicks
  const handleToolbarClick = useCallback(
    (value: string) => {
      // Get the textarea element
      const textarea = document.getElementById('post-content') as HTMLTextAreaElement;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // If it's a block element (heading, list), insert at beginning of line
      if (['# ', '## ', '### ', '* '].includes(value)) {
        const textBeforeCursor = content.substring(0, start);
        const lineStart = textBeforeCursor.lastIndexOf('\n') + 1;
        const newContent = content.substring(0, lineStart) + value + content.substring(lineStart);
        onChange(newContent);
      } else {
        // For inline formatting, insert at cursor
        const newContent = content.substring(0, start) + value + content.substring(end);
        onChange(newContent);
        // Set cursor position
        setTimeout(() => {
          textarea.focus();
          textarea.selectionStart = start + value.length;
          textarea.selectionEnd = start + value.length;
        }, 0);
      }
    },
    [content, onChange]
  );

  return (
    <div className="post-editor">
      {/* Editor/Preview Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button
          onClick={() => setIsPreviewMode(false)}
          className={`py-2 px-4 ${
            !isPreviewMode
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          aria-pressed={!isPreviewMode}
          aria-label="Edit mode"
        >
          Edit
        </button>
        <button
          onClick={() => setIsPreviewMode(true)}
          className={`py-2 px-4 ${
            isPreviewMode
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          aria-pressed={isPreviewMode}
          aria-label="Preview mode"
        >
          Preview
        </button>
      </div>

      {/* Basic Toolbar */}
      {!isPreviewMode && (
        <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-100 dark:bg-gray-800 rounded">
          {[
            { label: 'H1', value: '# ' },
            { label: 'H2', value: '## ' },
            { label: 'H3', value: '### ' },
            { label: 'Bold', value: '**bold**' },
            { label: 'Italic', value: '*italic*' },
            { label: 'Link', value: '[Link text](https://example.com)' },
            { label: 'Image', value: '![Alt text](https://example.com/image.jpg)' },
            { label: 'List', value: '* List item' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleToolbarClick(item.value)}
              className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title={item.label}
              aria-label={`Insert ${item.label}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Editor/Preview Content */}
      <div>
        {isPreviewMode ? (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-300 dark:border-gray-700 min-h-[400px]">
            {renderPreview()}
          </div>
        ) : (
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            rows={20}
            placeholder="Write your post content in Markdown..."
            aria-label="Post content editor"
          ></textarea>
        )}
      </div>

      {/* Markdown Help */}
      {!isPreviewMode && (
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>This editor supports Markdown syntax.</p>
          <p className="mt-2">
            <strong>Quick Reference:</strong> # Heading 1, ## Heading 2, *italic*, **bold**,
            [Link](url), ![Image](url), * List item
          </p>
        </div>
      )}
    </div>
  );
};

export default PostContentEditor;
