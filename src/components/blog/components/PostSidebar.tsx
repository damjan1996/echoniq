// src/pages/blog/post/PostSidebar.tsx
import Link from 'next/link';
import React from 'react';

import { BlogPostWithAuthor } from '@/components/blog/components/BlogList';
import { BlogCategory } from '@/types/database';

export interface PostSidebarProps {
  categories: BlogCategory[];
  // Additional props from current call
  recentPosts?: BlogPostWithAuthor[];
  currentPostId?: string;
}

const PostSidebar: React.FC<PostSidebarProps> = ({
  categories,
  recentPosts = [],
  currentPostId,
}) => {
  return (
    <aside className="blog-sidebar space-y-8">
      {/* Categories Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/blog?category=${category.slug}`}
                className="block py-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-gray-700 dark:text-gray-300"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts Section */}
      {recentPosts && recentPosts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recent Posts</h3>
          <ul className="space-y-4">
            {recentPosts
              .filter((post) => post.id !== currentPostId)
              .slice(0, 5)
              .map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white">{post.title}</h4>
                    {post.published_at && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(post.published_at).toLocaleDateString()}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Subscribe to our Newsletter</h3>
        <p className="text-sm opacity-90 mb-4">
          Get the latest updates, news and special offers sent directly to your inbox.
        </p>

        <form className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 rounded-md text-gray-900 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-blue-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs opacity-80 mt-3">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      </div>
    </aside>
  );
};

export default PostSidebar;
