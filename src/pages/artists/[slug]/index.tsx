import { motion } from 'framer-motion';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

// Components
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { SectionTitle } from '@/components/common/section-title';
import { trackEvent } from '@/lib/analytics';
import { SITE_URL } from '@/lib/constants';
import { generateBlogPostOpenGraphMetadata } from '@/lib/social/meta';
import { getBlogPostShareMetadata, getShareButtons } from '@/lib/social/share';
import {
  getServerBlogPostBySlug,
  getServerBlogPosts,
  getServerBlogCategories,
} from '@/lib/supabase/server';
import { BlogPostWithAuthor, BlogCategory } from '@/lib/supabase/types';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { PostComments } from '@/pages/blog/post/PostComments';
import { PostContent } from '@/pages/blog/post/PostContent';
import { PostHeader } from '@/pages/blog/post/PostHeader';
import PostSidebar from '@/pages/blog/post/PostSidebar';
import { RelatedPosts } from '@/pages/blog/post/RelatedPosts';

// Utilities

interface BlogPostPageProps {
  post: BlogPostWithAuthor;
  relatedPosts: BlogPostWithAuthor[];
  categories: BlogCategory[];
}

export default function BlogPostPage({ post, relatedPosts, categories }: BlogPostPageProps) {
  const router = useRouter();

  // Track page view
  React.useEffect(() => {
    if (post && !router.isFallback) {
      trackEvent('blog_post_view', {
        category: 'content',
        label: post.title,
        postId: post.id,
        postCategory: post.category || 'uncategorized',
      });
    }
  }, [post, router.isFallback]);

  // Handle loading and fallback state
  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Calculate reading time
  const readingTime = calculateReadingTime(post.content || '');

  // Format date
  const formattedDate = post.published_at ? formatDate(post.published_at) : '';

  // Generate social sharing metadata
  const openGraph = generateBlogPostOpenGraphMetadata({
    title: post.title,
    excerpt: post.excerpt || undefined,
    featuredImage: post.featured_image || undefined,
    author: post.authors?.name,
    publishedAt: post.published_at || undefined,
    slug: post.slug,
  });

  // Generate share data
  const shareData = getBlogPostShareMetadata({
    title: post.title,
    excerpt: post.excerpt || undefined,
    featuredImage: post.featured_image || undefined,
    slug: post.slug,
  });
  // Filter out null values from shareButtons
  const shareButtons = getShareButtons(shareData).filter((button) => button !== null);

  // Find category name
  const category = post.category ? categories.find((cat) => cat.id === post.category) : null;

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeInUpDelayed = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  const fadeInUpMoreDelayed = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
  };

  return (
    <>
      <Head>
        <title>{post.seo_title || post.title} | echoniq Blog</title>
        <meta
          name="description"
          content={post.seo_description || post.excerpt || `Read ${post.title} on the echoniq blog`}
        />
        <meta property="og:title" content={openGraph.title} />
        <meta property="og:description" content={openGraph.description} />
        <meta property="og:image" content={openGraph.image} />
        <meta property="og:url" content={openGraph.url} />
        <meta property="og:type" content={openGraph.type} />
        <meta name="twitter:card" content="summary_large_image" />
        {post.seo_keywords && <meta name="keywords" content={post.seo_keywords} />}
        <link rel="canonical" href={`${SITE_URL}/blog/${post.slug}`} />
      </Head>

      <main className="bg-white dark:bg-gray-900">
        {/* Hero/Header */}
        <div className="relative w-full">
          {/* Featured Image */}
          {post.featured_image && (
            <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          )}

          {/* Post Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className={`container mx-auto px-4 ${post.featured_image ? '-mt-32 relative z-10' : 'pt-12'}`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-10 max-w-4xl mx-auto">
              <PostHeader
                title={post.title}
                date={formattedDate}
                author={post.authors}
                category={category?.name}
                categorySlug={category?.slug}
                readingTime={readingTime}
              />
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpDelayed}
              className="col-span-1 lg:col-span-2"
            >
              {/* Post Content */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-10 mb-12">
                <PostContent content={post.content || ''} />

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div>
                        <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog?tag=${tag}`}
                              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Share Buttons */}
                    <div>
                      <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-2">Share:</h4>
                      <div className="flex flex-wrap gap-2">
                        {shareButtons.map(
                          (button) =>
                            button.url && (
                              <a
                                key={button.name}
                                href={button.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full text-white transition-transform hover:scale-110"
                                style={{ backgroundColor: button.color }}
                                aria-label={`Share on ${button.name}`}
                              >
                                <span className={`icon-${button.icon}`} aria-hidden="true" />
                              </a>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              {post.authors && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-8 mb-12">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    {post.authors.avatar && (
                      <div className="flex-shrink-0">
                        <Image
                          src={post.authors.avatar}
                          alt={post.authors.name}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold mb-2">About {post.authors.name}</h3>
                      {post.authors.bio && (
                        <p className="text-gray-700 dark:text-gray-300">{post.authors.bio}</p>
                      )}
                      {post.authors.website && (
                        <a
                          href={post.authors.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 mt-2 inline-block hover:underline"
                        >
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Comments */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-8 mb-12">
                <h3 className="text-2xl font-bold mb-6">Comments</h3>
                <PostComments postId={post.id} />
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mb-12">
                  <SectionTitle title="Related Posts" />
                  <RelatedPosts posts={relatedPosts} />
                </div>
              )}
            </motion.div>

            {/* Sidebar - nur mit categories-Prop */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpMoreDelayed}
              className="col-span-1"
            >
              <PostSidebar categories={categories} />
            </motion.div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span className="icon-arrow-left mr-2" aria-hidden="true"></span>
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all published blog posts
  const posts = await getServerBlogPosts();

  // Generate paths for each post
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    // Fallback true allows for generating new pages on demand
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    // Fetch the blog post data
    const post = await getServerBlogPostBySlug(slug);

    // If the post doesn't exist or isn't published, return 404
    if (!post || !post.is_published) {
      return {
        notFound: true,
      };
    }

    // Get categories
    const categories = await getServerBlogCategories();

    // IMPORTANT: Ensure category is null rather than undefined to match the type definition
    const normalizedCategory = post.category !== undefined ? post.category : null;

    // Get related posts (same category, excluding current post)
    const relatedPosts = await getServerBlogPosts({
      category: normalizedCategory, // Using the normalized category
      limit: 4,
    });

    // Filter out the current post
    const filteredRelatedPosts = relatedPosts.filter((p) => p.id !== post.id);

    // Create a modified post with proper null handling
    const normalizedPost = {
      ...post,
      authors: post.authors || null, // Ensure null rather than undefined
      category: normalizedCategory, // Using the normalized category (string | null)
    };

    // Normalize related posts as well
    const normalizedRelatedPosts = filteredRelatedPosts.slice(0, 3).map((relatedPost) => ({
      ...relatedPost,
      authors: relatedPost.authors || null, // Ensure null rather than undefined
      category: relatedPost.category !== undefined ? relatedPost.category : null, // Ensure null rather than undefined
    }));

    return {
      props: {
        post: normalizedPost,
        relatedPosts: normalizedRelatedPosts,
        categories,
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return {
      notFound: true,
    };
  }
};
