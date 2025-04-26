import React, { useState } from 'react';

interface PostContentEditorProps {
  content: string;
  onChange: (content: string) => void;
}

/**
 * Rich Editor for Blog Post Content
 * Allows editing the main content of blog posts with markdown support
 */
const PostContentEditor: React.FC<PostContentEditorProps> = ({ content, onChange }) => {
  const [showPreview, setShowPreview] = useState(false);

  // Simple markdown preview renderer
  const renderMarkdown = (markdown: string) => {
    return {
      __html: markdown
        .replace(/# (.*?)\n/g, '<h1>$1</h1>')
        .replace(/## (.*?)\n/g, '<h2>$1</h2>')
        .replace(/### (.*?)\n/g, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>'),
    };
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
      {/* Editor Toolbar */}
      <div className="bg-gray-100 dark:bg-gray-800 p-2 border-b border-gray-300 dark:border-gray-700 flex justify-between">
        <div className="flex space-x-2">
          <button
            type="button"
            className="p-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            onClick={() => onChange(content + '# ')}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            className="p-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            onClick={() => onChange(content + '## ')}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            className="p-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            onClick={() => onChange(content + '### ')}
            title="Heading 3"
          >
            H3
          </button>
          <span className="border-r border-gray-300 dark:border-gray-700 mx-1"></span>
          <button
            type="button"
            className="p-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            onClick={() => onChange(content + '**bold text**')}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className="p-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            onClick={() => onChange(content + '*italic text*')}
            title="Italic"
          >
            <em>I</em>
          </button>
          <span className="border-r border-gray-300 dark:border-gray-700 mx-1"></span>
          <button
            type="button"
            className="p-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            onClick={() => onChange(content + '- ')}
            title="List Item"
          >
            • List
          </button>
          <button
            type="button"
            className="p-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            onClick={() => onChange(content + '[link text](https://example.com)')}
            title="Link"
          >
            🔗 Link
          </button>
        </div>

        <button
          type="button"
          className={`p-1 px-2 rounded ${
            showPreview
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {showPreview ? (
        // Preview Mode
        <div
          className="p-4 min-h-[300px] bg-white dark:bg-gray-900 prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={renderMarkdown(content)}
        />
      ) : (
        // Edit Mode
        <textarea
          className="w-full min-h-[300px] p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono focus:outline-none"
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your post content here using Markdown..."
        />
      )}
    </div>
  );
};

export default PostContentEditor;
