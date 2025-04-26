import { ArtistBio } from '@/components/artists/ArtistBio';
import { ArtistCard } from '@/components/artists/ArtistCard';
import { ArtistGallery, GalleryImage } from '@/components/artists/ArtistGallery';
import { ArtistReleases, Release, ReleaseWithTracks } from '@/components/artists/ArtistReleases';
import { FeaturedArtist } from '@/components/artists/FeaturedArtist';

import { ArtistList, FeaturedArtistList } from './ArtistList';
import { Categories, ScrollingCategories } from './Categories';
import { Filters, FilterState } from './Filters';
import { Hero, GradientHero } from './Hero';

// Export components (values)
export {
  ArtistBio,
  ArtistCard,
  ArtistGallery,
  ArtistReleases,
  FeaturedArtist,
  ArtistList,
  FeaturedArtistList,
  Categories,
  ScrollingCategories,
  Filters,
  Hero,
  GradientHero,
};

// Export types
export type { GalleryImage, Release, ReleaseWithTracks, FilterState };
