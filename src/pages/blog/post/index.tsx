import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// Components
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { useAuth } from '@/hooks/use-supabase';
import adminClient from '@/lib/supabase/admin';
import { BlogPostWithAuthor, BlogCategory } from '@/lib/supabase/types';

import PostContentEditor from './editors/PostContentEditor';
import PostMetaEditor from './editors/PostMetaEditor';

// Type definition for a new blog post without optional fields for required fields
interface BlogPostInsert {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  is_published: boolean;
  is_featured: boolean;
  published_at?: string | null;
  updated_at: string;
  created_at: string;
  author_id: string;
  tags?: string[]; // Only undefined, not null
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  featured_image?: string | null;
}

interface PostEditorProps {
  post?: BlogPostWithAuthor | null;
  categories?: BlogCategory[];
  isNew?: boolean;
}

/**
 * Post Editor/Creator Page Component
 * This page is only accessible to admin users and allows creating/editing blog posts
 */
const PostEditorPage: React.FC<PostEditorProps> = ({
  post = null,
  categories = [],
  isNew = true,
}) => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postData, setPostData] = useState<Partial<BlogPostWithAuthor>>(
    post || {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      category: '',
      is_published: false,
      is_featured: false,
      tags: [],
    }
  );

  // Check if user is authenticated and load data if editing existing post
  useEffect(() => {
    const checkAuth = async () => {
      if (authLoading) return;

      if (!user) {
        // Redirect to login if not authenticated
        router.push('/login?redirect=' + encodeURIComponent(router.asPath));
        return;
      }

      // If editing an existing post, load data
      if (!isNew && !post && router.query.id) {
        try {
          // Ensure id is a string, not an array
          const postId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;

          const { data, error } = await adminClient
            .from('blog_posts')
            .select('*, authors(*)')
            .eq('id', postId)
            .single();

          if (error) throw error;

          if (data) {
            setPostData(data);
          } else {
            setError('Post not found');
          }
        } catch (err) {
          console.error('Error loading post:', err);
          setError('Failed to load post data');
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [user, authLoading, isNew, post, router]);

  // Handle post data changes
  const handlePostDataChange = (field: string, value: string | string[] | boolean) => {
    setPostData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save post
  const handleSave = async (publish: boolean = false) => {
    if (!postData.title || !postData.slug) {
      setError('Title and slug are required');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const now = new Date().toISOString();

      if (isNew) {
        // Ensure all required fields exist
        if (!user?.id) {
          throw new Error('User ID is required');
        }

        // Convert tags from null to [] for empty tags
        const tagsArray: string[] | undefined = Array.isArray(postData.tags)
          ? postData.tags
          : undefined;

        // Prepare the data for insert (with concrete types)
        const insertData: BlogPostInsert = {
          title: postData.title || '',
          slug: postData.slug || '',
          content: postData.content || '',
          excerpt: postData.excerpt || '',
          category: postData.category || '',
          is_published: publish || Boolean(postData.is_published),
          is_featured: Boolean(postData.is_featured),
          published_at: publish && !postData.published_at ? now : postData.published_at,
          updated_at: now,
          created_at: now,
          author_id: user.id,
          tags: tagsArray,
          seo_title: postData.seo_title,
          seo_description: postData.seo_description,
          seo_keywords: postData.seo_keywords,
          featured_image: postData.featured_image,
        };

        // Create new post
        const { data, error } = await adminClient
          .from('blog_posts')
          .insert(insertData)
          .select()
          .single();

        if (error) throw error;

        // Navigate to the new post
        router.push(`/blog/${data.slug}`);
      } else {
        // For updates we need to ensure an ID exists
        if (!postData.id) {
          throw new Error('Post ID is required for updates');
        }

        // Update existing post
        const { error } = await adminClient
          .from('blog_posts')
          .update({
            ...postData,
            is_published: publish || postData.is_published,
            published_at: publish && !postData.published_at ? now : postData.published_at,
            updated_at: now,
          })
          .eq('id', postData.id);

        if (error) throw error;

        // Refresh page
        router.push(`/blog/post?id=${postData.id}`);
      }
    } catch (err) {
      console.error('Error saving post:', err);
      setError('Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle loading states
  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If no user is authenticated, this will redirect
  if (!user) return null;

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Animation variant for the sidebar with delayed start
  const fadeInUpDelayed = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {isNew ? 'Create New Post' : 'Edit Post'}
        </h1>

        <div className="flex space-x-3">
          <Link
            href="/blog"
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </Link>

          <button
            onClick={() => handleSave(false)}
            disabled={isSaving}
            className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>

          <button
            onClick={() => handleSave(true)}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="lg:col-span-2 space-y-8"
        >
          {/* Post Content Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Post Content
            </h3>

            <PostContentEditor
              content={postData.content || ''}
              onChange={(content) => handlePostDataChange('content', content)}
            />
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpDelayed}
          className="lg:col-span-1 space-y-6"
        >
          {/* Post Meta Editor */}
          <PostMetaEditor post={postData} categories={categories} onChange={handlePostDataChange} />

          {/* Publish Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Publication Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="is_published"
                  type="checkbox"
                  checked={postData.is_published || false}
                  onChange={(e) => handlePostDataChange('is_published', e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-700 focus:ring-blue-500"
                />
                <label
                  htmlFor="is_published"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Published
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="is_featured"
                  type="checkbox"
                  checked={postData.is_featured || false}
                  onChange={(e) => handlePostDataChange('is_featured', e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-700 focus:ring-blue-500"
                />
                <label
                  htmlFor="is_featured"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Featured Post
                </label>
              </div>

              {postData.published_at && (
                <div className="pt-2 text-sm text-gray-600 dark:text-gray-400">
                  Published on: {new Date(postData.published_at).toLocaleDateString()}
                </div>
              )}

              {postData.created_at && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Created on: {new Date(postData.created_at).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Featured Image
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                value={postData.featured_image || ''}
                onChange={(e) => handlePostDataChange('featured_image', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Image URL"
              />

              <p className="text-xs text-gray-500">
                Enter the URL of the featured image for this post
              </p>

              {/* Image preview */}
              {postData.featured_image && (
                <div className="mt-2 relative aspect-video rounded-md overflow-hidden">
                  <Image
                    src={postData.featured_image}
                    alt="Featured"
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">SEO</h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="seo_title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  SEO Title
                </label>
                <input
                  id="seo_title"
                  type="text"
                  value={postData.seo_title || ''}
                  onChange={(e) => handlePostDataChange('seo_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="SEO Title (leave blank to use post title)"
                />
              </div>

              <div>
                <label
                  htmlFor="seo_description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  SEO Description
                </label>
                <textarea
                  id="seo_description"
                  value={postData.seo_description || ''}
                  onChange={(e) => handlePostDataChange('seo_description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="SEO Description (leave blank to use excerpt)"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="seo_keywords"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  SEO Keywords
                </label>
                <input
                  id="seo_keywords"
                  type="text"
                  value={postData.seo_keywords || ''}
                  onChange={(e) => handlePostDataChange('seo_keywords', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Keywords separated by commas"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostEditorPage;
