import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import {
  getServerBlogPostBySlug,
  getServerBlogCategories,
  getServerBlogPosts,
  getServerBlogPostsForSitemap,
} from '@/lib/supabase/server';
import { BlogPostPageProps } from '@/types/blog'; // Adjust path if necessary

// Main blog post page component
export default function BlogPostPage({ post }: BlogPostPageProps) {
  // Here's the component implementation
  // This is just a placeholder to complete the file
  return (
    <>
      <Head>
        <title>{post.title} | echoniq</title>
        <meta name="description" content={post.excerpt || ''} />
      </Head>

      <main>{/* Blog post page content */}</main>
    </>
  );
}

// Implement getStaticPaths to generate all blog post slugs
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = await getServerBlogPostsForSitemap();

    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));

    return {
      paths,
      fallback: 'blocking', // Use 'blocking' for better SEO
    };
  } catch (error) {
    console.error('Error in getStaticPaths for Blog Post:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

// Implement getStaticProps to load data for a specific blog post
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
