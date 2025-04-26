import { Image, SocialLinks, SEO } from './common';
import { Release } from './music';

export interface Artist {
  id: string;
  slug: string;
  name: string;
  image: string;
  genres: string[];
  bio: string;
  featured?: boolean;
  active?: boolean;
  joinedDate?: string;
}

export interface ArtistDetailed extends Artist {
  coverImage?: string;
  gallery?: Image[];
  socialLinks?: SocialLinks;
  longBio?: string;
  releases?: Release[];
  upcomingShows?: ArtistShow[];
  videos?: ArtistVideo[];
  seo?: SEO;
  featured: boolean;
}

export interface ArtistShow {
  id: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  ticketUrl?: string;
  description?: string;
  image?: string;
}

export interface ArtistVideo {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  uploadDate?: string;
}

export interface ArtistFilters {
  genres?: string[];
  search?: string;
  featured?: boolean;
}

export interface ArtistCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  artistCount?: number;
}

export interface ArtistCollaboration {
  id: string;
  artistA: Artist;
  artistB: Artist;
  title: string;
  description?: string;
  image?: string;
  releaseId?: string;
}

export interface ArtistQuote {
  id: string;
  artistId: string;
  artistName: string;
  quote: string;
  source?: string;
  date?: string;
}
