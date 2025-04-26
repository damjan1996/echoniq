import React from 'react';

import { BlogPostWithAuthor, BlogCategory } from '@/lib/supabase/types';

interface PostMetaEditorProps {
  post: Partial<BlogPostWithAuthor>;
  categories: BlogCategory[];
  onChange: (field: string, value: string | string[] | boolean) => void;
}

/**
 * Editor for Blog Post Metadata
 * Manages post title, slug, categories, tags, and other metadata
 */
const PostMetaEditor: React.FC<PostMetaEditorProps> = ({ post, categories, onChange }) => {
  // Generate slug from title
  const generateSlug = () => {
    if (!post.title) return;

    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    onChange('slug', slug);
  };

  return (
    <div className="space-y-6">
      {/* Title and Slug */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Post Details</h3>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Post Title
          </label>
          <input
            id="title"
            type="text"
            value={post.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Enter post title"
          />
        </div>

        <div className="flex items-end space-x-4">
          <div className="flex-grow">
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Post Slug
            </label>
            <input
              id="slug"
              type="text"
              value={post.slug || ''}
              onChange={(e) => onChange('slug', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="post-slug"
            />
          </div>

          <button
            onClick={generateSlug}
            type="button"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Generate Slug
          </button>
        </div>
      </div>

      {/* Excerpt */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Excerpt</h3>

        <div>
          <textarea
            id="excerpt"
            value={post.excerpt || ''}
            onChange={(e) => onChange('excerpt', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Enter post excerpt (used in listings and SEO)"
          ></textarea>
          <p className="text-xs text-gray-500 mt-2">
            A short summary of the post that will appear in blog listings and search results
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category</h3>

        <select
          value={post.category || ''}
          onChange={(e) => onChange('category', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>

        <div className="mb-4">
          <input
            type="text"
            id="tags"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Add tags separated by commas"
            value={(post.tags || []).join(', ')}
            onChange={(e) => {
              const tagsArray = e.target.value
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean);
              onChange('tags', tagsArray);
            }}
          />
          <p className="text-xs text-gray-500 mt-2">
            Enter tags separated by commas (e.g. music, electronic, techno)
          </p>
        </div>

        {/* Display tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {(post.tags || []).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
              <button
                type="button"
                className="ml-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => {
                  const newTags = [...(post.tags || [])];
                  newTags.splice(index, 1);
                  onChange('tags', newTags);
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostMetaEditor;
