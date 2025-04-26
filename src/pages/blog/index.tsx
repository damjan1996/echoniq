import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

// Components
import { LoadingSpinner } from '@/components/common/loading-spinner';
// Hooks and utilities
import { useAnalytics, trackPageView } from '@/lib/analytics';
import { SITE_URL } from '@/lib/constants';
// Server functions instead of api.ts
import {
  getServerBlogPostBySlug,
  getServerBlogPosts,
  getServerBlogCategories,
} from '@/lib/supabase/server';
import { BlogPostWithAuthor, BlogCategory } from '@/lib/supabase/types';

// Import components as default imports to avoid warnings
import Comments from './post/PostComments';
import BlogContent from './post/PostContent';
import Header from './post/PostHeader';
import Sidebar from './post/PostSidebar';
import Related from './post/RelatedPosts';

interface PostPageProps {
  post: BlogPostWithAuthor | null;
  relatedPosts: BlogPostWithAuthor[];
  categories: BlogCategory[];
  error?: string;
}

export default function PostPage({ post, relatedPosts, categories, error }: PostPageProps) {
  const router = useRouter();

  // Initialize analytics
  useAnalytics();

  // Track page view - just call with one parameter
  React.useEffect(() => {
    if (post) {
      trackPageView(`/blog/${post.slug}`);
    }
  }, [post]);

  // Format date for display
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle loading/error states
  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Error Loading Post</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {error || 'The post could not be found.'}
        </p>
        <button
          onClick={() => router.push('/blog')}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition duration-200"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  // Get category information from the first category in the list
  const categoryInfo = post.category
    ? categories.find((cat) => cat.id === post.category)
    : undefined;

  return (
    <>
      <Head>
        <title>{post.title} | echoniq Blog</title>
        <meta name="description" content={post.excerpt || ''} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ''} />
        <meta
          property="og:image"
          content={post.featured_image || `${SITE_URL}/images/blog/default-og.jpg`}
        />
        <meta property="og:url" content={`${SITE_URL}/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        {/* Null-checks for published_at and updated_at */}
        {post.published_at && (
          <meta property="article:published_time" content={post.published_at} />
        )}
        {post.updated_at && <meta property="article:modified_time" content={post.updated_at} />}
        <link rel="canonical" href={`${SITE_URL}/blog/${post.slug}`} />
      </Head>

      <main className="pb-16">
        {/* Post Header with the correct props according to the PostHeader component */}
        <Header
          title={post.title}
          date={formatDate(post.published_at)}
          author={
            post.authors
              ? {
                  name: post.authors.name,
                  avatar: post.authors.avatar,
                }
              : undefined
          }
          category={categoryInfo?.name}
          categorySlug={categoryInfo?.slug}
          // Optional: If readingTime was available
          // readingTime={post.readingTime}
        />

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Post Content with null check */}
              <BlogContent content={post.content || ''} />

              {/* Comments Section */}
              <Comments postId={post.id} />
            </div>

            {/* Sidebar with minimal props */}
            <div className="lg:col-span-1">
              <Sidebar categories={categories} />
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <Related posts={relatedPosts} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {};

  if (!slug || Array.isArray(slug)) {
    return {
      props: {
        post: null,
        relatedPosts: [],
        categories: [],
        error: 'Invalid slug parameter',
      },
    };
  }

  try {
    // Fetch the post with getServerBlogPostBySlug function
    const post = await getServerBlogPostBySlug(slug as string);

    if (!post) {
      return {
        notFound: true,
      };
    }

    // Fetch related posts and categories in parallel
    // Use server functions instead of non-existent API functions
    const [relatedPosts, categories] = await Promise.all([
      // Since getRelatedPosts doesn't exist, use getServerBlogPosts with category filter
      getServerBlogPosts({
        category: post.category,
        limit: 4,
      }).then((posts) => posts.filter((p) => p.id !== post.id)), // Exclude current post
      getServerBlogCategories(),
    ]);

    return {
      props: {
        post,
        relatedPosts,
        categories,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps for blog post:', error);
    return {
      props: {
        post: null,
        relatedPosts: [],
        categories: [],
        error: 'Failed to load the blog post. Please try again later.',
      },
    };
  }
};
