import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';

// Components
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BlogList, BlogPostWithAuthor } from '@/components/blog/components/BlogList';
import { Hero } from '@/components/blog/components/Hero';
import { Sidebar } from '@/components/blog/components/Sidebar';
import { SectionTitle } from '@/components/common/section-title';
// Hooks and utilities
import { trackPageView } from '@/lib/analytics';
import { SITE_URL } from '@/lib/constants';
// Server functions
import { getServerBlogPosts, getServerBlogCategories } from '@/lib/server';
import { BlogCategory } from '@/types/database';

interface BlogPageProps {
  initialPosts: BlogPostWithAuthor[];
  categories: BlogCategory[];
  featuredPosts: BlogPostWithAuthor[];
}

export default function BlogPage({ initialPosts, categories, featuredPosts }: BlogPageProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPostWithAuthor[]>(initialPosts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Track page view
  useEffect(() => {
    trackPageView('/blog');
  }, []);

  // Get filter values from URL params
  const categorySlug = router.query.category as string | undefined;
  const tagName = router.query.tag as string | undefined;
  const searchQuery = router.query.search as string | undefined;
  const page = parseInt((router.query.page as string) || '1', 10);
  const pageSize = 9; // Number of posts per page

  // Find active category
  const activeCategory = categorySlug ? categories.find((cat) => cat.slug === categorySlug) : null;

  // Memoize the fetch posts function to avoid re-creating it on every render
  const fetchPosts = useCallback(async () => {
    if (typeof window === 'undefined') return;

    setIsLoading(true);
    setError(null);

    try {
      // Build query params
      const queryParams = new URLSearchParams();

      if (categorySlug) {
        queryParams.append('category', categorySlug);
      }

      if (tagName) {
        queryParams.append('tag', tagName);
      }

      if (searchQuery) {
        queryParams.append('search', searchQuery);
      }

      queryParams.append('page', page.toString());
      queryParams.append('pageSize', pageSize.toString());

      // Fetch filtered posts from API
      const response = await fetch(`/api/blog/posts?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [categorySlug, tagName, searchQuery, page, pageSize]);

  // Fetch posts based on filters
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Page title and meta based on active filters
  let pageTitle = 'Blog | echoniq';
  let pageDescription =
    'Explore music production insights, artist interviews, and the latest electronic music news.';

  if (activeCategory) {
    pageTitle = `${activeCategory.name} | echoniq Blog`;
    pageDescription = `Explore our blog posts about ${activeCategory.name.toLowerCase()} on echoniq.`;
  } else if (tagName) {
    pageTitle = `${tagName} | echoniq Blog`;
    pageDescription = `Explore our blog posts tagged with ${tagName} on echoniq.`;
  } else if (searchQuery) {
    pageTitle = `Search: ${searchQuery} | echoniq Blog`;
    pageDescription = `Search results for "${searchQuery}" on the echoniq blog.`;
  }

  // Handle page change
  const handlePageChange = useCallback(
    (newPage: number) => {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: newPage.toString() },
        },
        undefined,
        { scroll: true }
      );
    },
    [router]
  );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <Hero
          title={
            activeCategory
              ? `${activeCategory.name}`
              : tagName
                ? `Posts Tagged: ${tagName}`
                : searchQuery
                  ? `Search: ${searchQuery}`
                  : 'echoniq Blog'
          }
          subtitle={
            activeCategory
              ? activeCategory.description || 'Explore our articles in this category'
              : tagName
                ? `Explore our articles tagged with ${tagName}`
                : searchQuery
                  ? `Search results for "${searchQuery}"`
                  : 'Music production insights, artist interviews, and the latest electronic music news'
          }
          backgroundImage="/images/blog/hero-background.jpg"
        />

        <div className="container mx-auto px-4 py-12">
          {/* Featured Posts (only on main blog page with no filters) */}
          {!categorySlug && !tagName && !searchQuery && page === 1 && featuredPosts?.length > 0 && (
            <div className="mb-16">
              <SectionTitle title="Featured Articles" />
              <div className="mt-8">
                <BlogList
                  posts={featuredPosts}
                  layout="grid"
                  emptyMessage="No featured posts available"
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <SectionTitle
                title={
                  activeCategory
                    ? `${activeCategory.name} Articles`
                    : tagName
                      ? `Posts Tagged: ${tagName}`
                      : searchQuery
                        ? 'Search Results'
                        : 'Latest Articles'
                }
              />

              <BlogList
                posts={posts || []}
                isLoading={isLoading}
                error={error}
                layout="grid"
                emptyMessage={
                  searchQuery
                    ? `No results found for "${searchQuery}"`
                    : tagName
                      ? `No posts tagged with "${tagName}"`
                      : activeCategory
                        ? `No posts in ${activeCategory.name} category`
                        : 'No blog posts available'
                }
                totalCount={posts?.length || 0} // In a real app, this would come from the API
                currentPage={page}
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar
                categories={categories || []}
                recentPosts={initialPosts?.slice(0, 5) || []}
                popularTags={[
                  { name: 'techno', count: 12 },
                  { name: 'production', count: 8 },
                  { name: 'ambient', count: 7 },
                  { name: 'interviews', count: 5 },
                  { name: 'gear', count: 4 },
                  { name: 'tutorial', count: 3 },
                ]}
                currentCategorySlug={categorySlug}
                showSearch={true}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  try {
    // Fetch initial posts, categories, and featured posts in parallel
    const [posts, categories] = await Promise.all([
      getServerBlogPosts({
        orderBy: 'published_at',
        ascending: false,
        limit: 9,
        published: true,
      }),
      getServerBlogCategories(),
    ]);

    // Get featured posts
    const featuredPosts = await getServerBlogPosts({
      featured: true,
      published: true,
      limit: 3,
    });

    return {
      props: {
        initialPosts: posts || [],
        categories: categories || [],
        featuredPosts: featuredPosts || [],
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps for Blog page:', error);

    // Return empty data in case of error
    return {
      props: {
        initialPosts: [],
        categories: [],
        featuredPosts: [],
      },
      revalidate: 60, // Try again in a minute if there was an error
    };
  }
};