/**
 * Social media configuration for echoniq Label website
 * This file contains settings for social media sharing and integration
 */

// Social media platform configurations
export const platforms = {
  instagram: {
    name: 'Instagram',
    url: 'https://instagram.com/echoniq',
    handle: '@echoniq',
    shareUrl: 'https://instagram.com/share',
    icon: 'instagram',
    active: true,
  },
  spotify: {
    name: 'Spotify',
    url: 'https://open.spotify.com/user/echoniq',
    handle: 'echoniq',
    shareUrl: 'https://open.spotify.com',
    icon: 'spotify',
    active: true,
  },
  youtube: {
    name: 'YouTube',
    url: 'https://youtube.com/c/echoniq',
    handle: '@echoniq',
    shareUrl: 'https://youtube.com',
    icon: 'youtube',
    active: true,
  },
  soundcloud: {
    name: 'SoundCloud',
    url: 'https://soundcloud.com/echoniq',
    handle: 'echoniq',
    shareUrl: 'https://soundcloud.com',
    icon: 'soundcloud',
    active: true,
  },
  twitter: {
    name: 'Twitter',
    url: 'https://twitter.com/echoniq',
    handle: '@echoniq',
    shareUrl: 'https://twitter.com/intent/tweet',
    icon: 'twitter',
    active: true,
  },
  facebook: {
    name: 'Facebook',
    url: 'https://facebook.com/echoniq',
    handle: 'echoniq',
    shareUrl: 'https://www.facebook.com/sharer/sharer.php',
    icon: 'facebook',
    active: true,
  },
  tiktok: {
    name: 'TikTok',
    url: 'https://tiktok.com/@echoniq',
    handle: '@echoniq',
    shareUrl: 'https://www.tiktok.com',
    icon: 'tiktok',
    active: true,
  },
  bandcamp: {
    name: 'Bandcamp',
    url: 'https://echoniq.bandcamp.com',
    handle: 'echoniq',
    shareUrl: 'https://bandcamp.com',
    icon: 'bandcamp',
    active: true,
  },
};

// Social sharing configuration for different types of content
export const sharingConfig = {
  // For music releases
  music: {
    title: 'Hör dir "{title}" von {artist} auf echoniq an',
    description: 'Entdecke "{title}" von {artist} auf echoniq - Dein unabhängiges Musiklabal.',
    hashtags: ['echoniq', 'newmusic', 'indielabel'],
    platforms: ['spotify', 'soundcloud', 'twitter', 'facebook', 'whatsapp'],
  },

  // For artist profiles
  artist: {
    title: 'Entdecke {artist} auf echoniq',
    description: '{artist} - Teil des echoniq Musiklabals. Hör dir jetzt die neueste Musik an!',
    hashtags: ['echoniq', 'artist', 'musiclabel'],
    platforms: ['instagram', 'twitter', 'facebook', 'whatsapp'],
  },

  // For blog posts
  blog: {
    title: '{title} | echoniq Blog',
    description: 'Lies den neuesten Artikel auf dem echoniq Blog: {title}',
    hashtags: ['echoniq', 'musicblog', 'musicnews'],
    platforms: ['twitter', 'facebook', 'linkedin', 'whatsapp'],
  },

  // For studio services
  studio: {
    title: 'Professionelle Musikproduktion im echoniq Studio',
    description:
      'Entdecke die Services des echoniq Studios - Dein Partner für professionelle Aufnahmen, Mixing und Mastering.',
    hashtags: ['musicstudio', 'recording', 'musicproduction'],
    platforms: ['instagram', 'twitter', 'facebook', 'whatsapp'],
  },
};

// Music streaming platforms for release links
export const streamingPlatforms = [
  {
    name: 'Spotify',
    icon: 'spotify',
    baseUrl: 'https://open.spotify.com',
    linkPrefix: 'album/',
    active: true,
  },
  {
    name: 'Apple Music',
    icon: 'apple',
    baseUrl: 'https://music.apple.com',
    linkPrefix: 'album/',
    active: true,
  },
  {
    name: 'SoundCloud',
    icon: 'soundcloud',
    baseUrl: 'https://soundcloud.com',
    linkPrefix: '',
    active: true,
  },
  {
    name: 'Bandcamp',
    icon: 'bandcamp',
    baseUrl: 'https://bandcamp.com',
    linkPrefix: '',
    active: true,
  },
  {
    name: 'YouTube Music',
    icon: 'youtube',
    baseUrl: 'https://music.youtube.com',
    linkPrefix: 'watch?v=',
    active: true,
  },
  {
    name: 'Deezer',
    icon: 'deezer',
    baseUrl: 'https://www.deezer.com',
    linkPrefix: 'album/',
    active: true,
  },
  {
    name: 'Tidal',
    icon: 'tidal',
    baseUrl: 'https://tidal.com',
    linkPrefix: 'album/',
    active: true,
  },
  {
    name: 'Amazon Music',
    icon: 'amazon',
    baseUrl: 'https://music.amazon.com',
    linkPrefix: 'albums/',
    active: true,
  },
];

// Social feed integration options
export const socialFeed = {
  instagram: {
    enabled: true,
    userId: process.env.INSTAGRAM_USER_ID || '',
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || '',
    count: 9,
    cacheDuration: 60 * 60, // 1 hour in seconds
  },
  spotify: {
    enabled: true,
    clientId: process.env.SPOTIFY_CLIENT_ID || '',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    artistIds: [],
    playlistIds: [],
    cacheDuration: 24 * 60 * 60, // 24 hours in seconds
  },
};

// Share button default settings
export const shareButtonDefaults = {
  showCount: true,
  size: 'medium' as 'small' | 'medium' | 'large',
  round: false,
  showLabel: true,
};

// Embed configuration for social media content
export const embedConfig = {
  spotify: {
    width: '100%',
    height: 380,
    frameBorder: 0,
    allowTransparency: true,
    allow: 'encrypted-media',
  },
  youtube: {
    width: '100%',
    height: 315,
    frameBorder: 0,
    allow:
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    allowFullScreen: true,
  },
  soundcloud: {
    width: '100%',
    height: 166,
    scrolling: 'no',
    frameBorder: 'no',
    allow: 'autoplay',
  },
};

export default {
  platforms,
  sharingConfig,
  streamingPlatforms,
  socialFeed,
  shareButtonDefaults,
  embedConfig,
};
