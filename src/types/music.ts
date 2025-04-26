import { Artist } from './artists';
import { Image, SEO } from './common';

export interface Track {
  id: string;
  title: string;
  duration: number; // in seconds
  previewUrl?: string;
  isrc?: string;
  trackNumber?: number;
  isExplicit?: boolean;
}

export interface Release {
  id: string;
  slug: string;
  title: string;
  artistName: string;
  artistSlug: string;
  cover: string;
  releaseDate: string;
  genres: string[];
  description: string;
  longDescription?: string;
  tracks?: Track[];
  streamingLinks?: StreamingLinks;
}

export interface ReleaseDetailed extends Omit<Release, 'artistName' | 'cover'> {
  artist: string | Artist;
  releaseType: ReleaseType;
  cover: string | Image;
  additionalImages?: Image[];
  credits?: ReleaseCredit[];
  lyrics?: ReleaseLyrics[];
  relatedReleases?: Release[];
  reviews?: ReleaseReview[];
  trackCount?: number;
  duration?: number; // total duration in seconds
  label?: string;
  catalogNumber?: string;
  upc?: string;
  tags?: string[];
  seo?: SEO;
}

export type ReleaseType = 'album' | 'ep' | 'single' | 'compilation' | 'remix' | 'live';

export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
  youtubeMusicId?: string;
  amazonMusic?: string;
  deezer?: string;
  tidal?: string;
  soundcloud?: string;
  bandcamp?: string;
  youtube?: string;
}

export interface ReleaseCredit {
  role: string;
  name: string;
  artistId?: string;
}

export interface ReleaseLyrics {
  trackId: string;
  trackTitle: string;
  lyrics: string;
  translatedLyrics?: {
    language: string;
    lyrics: string;
  }[];
}

export interface ReleaseReview {
  id: string;
  source: string;
  author?: string;
  rating?: number; // e.g., 4.5 out of 5
  quote: string;
  url?: string;
  date: string;
}

export interface Playlist {
  id: string;
  slug: string;
  title: string;
  description?: string;
  coverImage: string | Image;
  createdAt: string;
  updatedAt: string;
  trackCount: number;
  duration: number; // in seconds
  curator?: string;
  curatorId?: string;
  isPublic: boolean;
  tracks: PlaylistTrack[];
}

export interface PlaylistTrack {
  id: string;
  trackId: string;
  track: Track;
  releaseId: string;
  release?: Release;
  addedAt: string;
  position: number;
}

export interface AudioState {
  isPlaying: boolean;
  currentTrack?: Track;
  currentTrackId?: string;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  isError: boolean;
  queue: Track[];
  history: Track[];
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  releaseCount?: number;
  parentGenreId?: string;
  subGenres?: Genre[];
}

export interface MusicFilters {
  genres?: string[];
  artists?: string[];
  releaseTypes?: ReleaseType[];
  releaseYear?: number | [number, number]; // year or range
  search?: string;
  sortBy?: 'releaseDate' | 'title' | 'artist';
  sortOrder?: 'asc' | 'desc';
}
