// src/lib/social/meta.ts
import { defaultSeo, openGraph, twitter } from '@/config/seo';
import { SITE_URL } from '@/lib/constants';

// Extract SEO defaults from config
const SEO_DEFAULT_TITLE = defaultSeo?.title || 'echoniq';
const SEO_DEFAULT_DESCRIPTION = defaultSeo?.description || 'Electronic music label and studio';
const SEO_DEFAULT_IMAGE = openGraph?.images?.[0]?.url || `${SITE_URL}/images/og-default.jpg`;
const SEO_SITE_NAME = openGraph?.siteName || 'echoniq';
const SEO_TWITTER_HANDLE = twitter?.handle || '@echoniq';

/**
 * Interface for Open Graph metadata
 */
export interface OpenGraphMetadata {
  /** Page title */
  title: string;

  /** Page description */
  description: string;

  /** URL to the page */
  url: string;

  /** Type of content (e.g., website, article, music) */
  type: 'website' | 'article' | 'music' | 'profile' | 'video';

  /** URL to an image representing the content */
  image: string;

  /** Site name */
  siteName: string;

  /** Additional OG metadata for specific types */
  [key: string]: unknown;
}

/**
 * Interface for Twitter Card metadata
 */
export interface TwitterCardMetadata {
  /** Card type */
  card: 'summary' | 'summary_large_image' | 'app' | 'player';

  /** @username of website */
  site: string;

  /** @username of content creator */
  creator?: string;

  /** Title of content */
  title: string;

  /** Description of content */
  description: string;

  /** URL to image representing content */
  image: string;

  /** Alt text for the image */
  imageAlt?: string;
}

/**
 * Generate Open Graph metadata for a page
 */
export const generateOpenGraphMetadata = (
  params: Partial<OpenGraphMetadata> = {}
): OpenGraphMetadata => {
  const title = params.title || SEO_DEFAULT_TITLE;
  const description = params.description || SEO_DEFAULT_DESCRIPTION;
  const image = params.image || SEO_DEFAULT_IMAGE;
  const url = params.url || SITE_URL;
  const type = params.type || 'website';
  const siteName = params.siteName || SEO_SITE_NAME;

  const metadata: OpenGraphMetadata = {
    title,
    description,
    url,
    type,
    image,
    siteName,
  };

  // Add type-specific properties if provided
  if (params.type === 'article' && params.article) {
    metadata.article = params.article;
  } else if (params.type === 'music' && params.music) {
    metadata.music = params.music;
  } else if (params.type === 'profile' && params.profile) {
    metadata.profile = params.profile;
  }

  return metadata;
};

/**
 * Generate Twitter Card metadata for a page
 */
export const generateTwitterCardMetadata = (
  params: Partial<TwitterCardMetadata> = {}
): TwitterCardMetadata => {
  const title = params.title || SEO_DEFAULT_TITLE;
  const description = params.description || SEO_DEFAULT_DESCRIPTION;
  const image = params.image || SEO_DEFAULT_IMAGE;
  const card = params.card || 'summary_large_image';
  const site = params.site || SEO_TWITTER_HANDLE;

  return {
    card,
    site,
    title,
    description,
    image,
    creator: params.creator,
    imageAlt: params.imageAlt,
  };
};

/**
 * Generate Open Graph metadata for an artist profile
 */
export const generateArtistOpenGraphMetadata = (artist: {
  name: string;
  bio?: string;
  profileImage?: string;
  slug: string;
}): OpenGraphMetadata => {
  const url = `${SITE_URL}/artists/${artist.slug}`;
  const title = `${artist.name} | echoniq`;
  const description = artist.bio
    ? artist.bio.substring(0, 160) + (artist.bio.length > 160 ? '...' : '')
    : `Check out ${artist.name} on echoniq - Electronic music producer and artist`;
  const image = artist.profileImage || SEO_DEFAULT_IMAGE;

  return generateOpenGraphMetadata({
    title,
    description,
    url,
    type: 'profile',
    image,
    profile: {
      first_name: artist.name.split(' ')[0],
      last_name: artist.name.split(' ').slice(1).join(' '),
      username: artist.slug,
    },
  });
};

/**
 * Generate Open Graph metadata for a music release
 */
export const generateReleaseOpenGraphMetadata = (release: {
  title: string;
  artist: string;
  description?: string;
  coverImage?: string;
  releaseDate?: string;
  slug: string;
}): OpenGraphMetadata => {
  const url = `${SITE_URL}/music/${release.slug}`;
  const title = `${release.title} by ${release.artist} | echoniq`;
  const description = release.description
    ? release.description.substring(0, 160) + (release.description.length > 160 ? '...' : '')
    : `Listen to ${release.title} by ${release.artist} on echoniq`;
  const image = release.coverImage || SEO_DEFAULT_IMAGE;

  return generateOpenGraphMetadata({
    title,
    description,
    url,
    type: 'music',
    image,
    music: {
      musician: release.artist,
      release_date: release.releaseDate,
      album: release.title,
    },
  });
};

/**
 * Generate Open Graph metadata for a blog post
 */
export const generateBlogPostOpenGraphMetadata = (post: {
  title: string;
  excerpt?: string;
  featuredImage?: string;
  author?: string;
  publishedAt?: string;
  slug: string;
}): OpenGraphMetadata => {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | echoniq Blog`;
  const description = post.excerpt
    ? post.excerpt.substring(0, 160) + (post.excerpt.length > 160 ? '...' : '')
    : `Read ${post.title} on the echoniq blog`;
  const image = post.featuredImage || SEO_DEFAULT_IMAGE;

  return generateOpenGraphMetadata({
    title,
    description,
    url,
    type: 'article',
    image,
    article: {
      published_time: post.publishedAt,
      author: post.author,
    },
  });
};
