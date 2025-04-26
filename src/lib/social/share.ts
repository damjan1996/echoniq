// src/lib/social/share.ts
import { SITE_URL } from '@/lib/constants';

/**
 * Social sharing configuration for a platform
 */
export interface SocialSharePlatform {
  /** Platform name */
  name: string;

  /** URL template for sharing */
  shareUrl: string;

  /** Icon identifier (e.g., for use with icon libraries) */
  icon: string;

  /** Background color for the platform's button */
  color: string;

  /** Text color for the platform's button */
  textColor?: string;
}

/**
 * Available social sharing platforms
 */
export const SOCIAL_PLATFORMS: Record<string, SocialSharePlatform> = {
  facebook: {
    name: 'Facebook',
    shareUrl: 'https://www.facebook.com/sharer/sharer.php?u={{url}}',
    icon: 'facebook',
    color: '#3b5998',
    textColor: '#ffffff',
  },
  twitter: {
    name: 'Twitter',
    shareUrl: 'https://twitter.com/intent/tweet?url={{url}}&text={{title}}',
    icon: 'twitter',
    color: '#1DA1F2',
    textColor: '#ffffff',
  },
  whatsapp: {
    name: 'WhatsApp',
    shareUrl: 'https://wa.me/?text={{title}}%20{{url}}',
    icon: 'whatsapp',
    color: '#25D366',
    textColor: '#ffffff',
  },
  telegram: {
    name: 'Telegram',
    shareUrl: 'https://t.me/share/url?url={{url}}&text={{title}}',
    icon: 'telegram',
    color: '#0088cc',
    textColor: '#ffffff',
  },
  email: {
    name: 'Email',
    shareUrl: 'mailto:?subject={{title}}&body={{description}}%0A%0A{{url}}',
    icon: 'mail',
    color: '#777777',
    textColor: '#ffffff',
  },
  linkedin: {
    name: 'LinkedIn',
    shareUrl: 'https://www.linkedin.com/sharing/share-offsite/?url={{url}}',
    icon: 'linkedin',
    color: '#0077b5',
    textColor: '#ffffff',
  },
  pinterest: {
    name: 'Pinterest',
    shareUrl:
      'https://pinterest.com/pin/create/button/?url={{url}}&media={{image}}&description={{title}}',
    icon: 'pinterest',
    color: '#E60023',
    textColor: '#ffffff',
  },
  reddit: {
    name: 'Reddit',
    shareUrl: 'https://www.reddit.com/submit?url={{url}}&title={{title}}',
    icon: 'reddit',
    color: '#FF5700',
    textColor: '#ffffff',
  },
};

/**
 * Generate a sharing URL for a specific platform
 */
export const generateSharingUrl = (
  platform: string,
  params: {
    url?: string;
    title?: string;
    description?: string;
    image?: string;
    hashtags?: string[];
  }
): string | null => {
  const socialPlatform = SOCIAL_PLATFORMS[platform.toLowerCase()];
  if (!socialPlatform) return null;

  const url = encodeURIComponent(params.url || window.location.href);
  const title = encodeURIComponent(params.title || document.title);
  const description = encodeURIComponent(params.description || '');
  const image = encodeURIComponent(params.image || '');
  const hashtags = params.hashtags ? params.hashtags.join(',') : '';

  let shareUrl = socialPlatform.shareUrl;
  shareUrl = shareUrl.replace('{{url}}', url);
  shareUrl = shareUrl.replace('{{title}}', title);
  shareUrl = shareUrl.replace('{{description}}', description);
  shareUrl = shareUrl.replace('{{image}}', image);
  shareUrl = shareUrl.replace('{{hashtags}}', hashtags);

  return shareUrl;
};

/**
 * Share content to a social platform
 */
export const shareToSocialPlatform = (
  platform: string,
  params: {
    url?: string;
    title?: string;
    description?: string;
    image?: string;
    hashtags?: string[];
  }
): boolean => {
  const shareUrl = generateSharingUrl(platform, params);
  if (!shareUrl) return false;

  // Open sharing dialog
  window.open(shareUrl, '_blank', 'width=600,height=400');
  return true;
};

/**
 * Generate metadata for sharing an artist profile
 */
export const getArtistShareMetadata = (artist: {
  name: string;
  bio?: string;
  profileImage?: string;
  slug: string;
}) => {
  const url = `${SITE_URL}/artists/${artist.slug}`;
  const title = `Check out ${artist.name} on echoniq`;
  const description = artist.bio
    ? artist.bio.substring(0, 160) + (artist.bio.length > 160 ? '...' : '')
    : `${artist.name} - Electronic music producer and artist on echoniq`;
  const image = artist.profileImage || '';
  const hashtags = ['echoniq', 'music', artist.name.replace(/\s+/g, '')];

  return { url, title, description, image, hashtags };
};

/**
 * Generate metadata for sharing a music release
 */
export const getReleaseShareMetadata = (release: {
  title: string;
  artist: string;
  description?: string;
  coverImage?: string;
  slug: string;
}) => {
  const url = `${SITE_URL}/music/${release.slug}`;
  const title = `Listen to ${release.title} by ${release.artist}`;
  const description = release.description
    ? release.description.substring(0, 160) + (release.description.length > 160 ? '...' : '')
    : `${release.title} by ${release.artist} - Listen now on echoniq`;
  const image = release.coverImage || '';
  const hashtags = ['echoniq', 'music', 'newmusic', release.artist.replace(/\s+/g, '')];

  return { url, title, description, image, hashtags };
};

/**
 * Generate metadata for sharing a blog post
 */
export const getBlogPostShareMetadata = (post: {
  title: string;
  excerpt?: string;
  featuredImage?: string;
  slug: string;
}) => {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = post.title;
  const description = post.excerpt
    ? post.excerpt.substring(0, 160) + (post.excerpt.length > 160 ? '...' : '')
    : `Read ${post.title} on the echoniq blog`;
  const image = post.featuredImage || '';
  const hashtags = ['echoniq', 'musicblog'];

  return { url, title, description, image, hashtags };
};

/**
 * Generate share buttons for a page
 */
export const getShareButtons = (params: {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  hashtags?: string[];
  platforms?: string[];
}) => {
  const platforms = params.platforms || ['facebook', 'twitter', 'whatsapp', 'telegram', 'email'];

  return platforms
    .map((platform) => {
      const socialPlatform = SOCIAL_PLATFORMS[platform.toLowerCase()];
      if (!socialPlatform) return null;

      const shareUrl = generateSharingUrl(platform, params);

      return {
        name: socialPlatform.name,
        url: shareUrl,
        icon: socialPlatform.icon,
        color: socialPlatform.color,
        textColor: socialPlatform.textColor || '#ffffff',
      };
    })
    .filter(Boolean);
};
