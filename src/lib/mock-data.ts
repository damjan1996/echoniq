// src/lib/mock-data.ts
// Mock data to replace database queries

import {
  Artist,
  Release,
  Track,
  BlogPost,
  Author,
  BlogCategory,
  BlogComment,
  MusicGenre,
  StudioService,
  FilterOptions,
} from '@/types/database';

// Erweitere den Artist-Typ, damit er Releases enthalten kann
interface ArtistWithReleases extends Artist {
  releases?: (Release & { tracks?: Track[] })[];
}

class MockDataProvider {
  // Helper function for safe comparisons
  private compareValues(a: unknown, b: unknown, ascending: boolean): number {
    // Handle null/undefined values
    if (a == null && b == null) return 0;
    if (a == null) return ascending ? -1 : 1;
    if (b == null) return ascending ? 1 : -1;

    // If both values are strings, use string comparison
    if (typeof a === 'string' && typeof b === 'string') {
      return ascending ? a.localeCompare(b) : b.localeCompare(a);
    }

    // If both values are numbers, use numeric comparison
    if (typeof a === 'number' && typeof b === 'number') {
      return ascending ? a - b : b - a;
    }

    // If both are dates
    if (a instanceof Date && b instanceof Date) {
      return ascending ? a.getTime() - b.getTime() : b.getTime() - a.getTime();
    }

    // Convert to strings for other types
    const strA = String(a);
    const strB = String(b);
    return ascending ? strA.localeCompare(strB) : strB.localeCompare(strA);
  }

  // ARTISTS
  private artists: Artist[] = [
    {
      id: 'artist1',
      name: 'Alex Grey',
      slug: 'alex-grey',
      bio: 'Alex Grey is an electronic music producer known for deep, atmospheric techno tracks that blend organic and synthetic elements.',
      genre: 'Techno',
      profile_image: '/images/artists/alex-grey.jpg',
      cover_image: '/images/artists/covers/alex-grey-cover.jpg',
      is_published: true,
      is_featured: true,
      instagram: 'https://instagram.com/alexgrey',
      facebook: 'https://facebook.com/alexgreymusic',
      twitter: 'https://twitter.com/alexgreymusic',
      soundcloud: 'https://soundcloud.com/alexgreymusic',
      spotify: 'https://open.spotify.com/artist/alexgrey',
      created_at: '2023-01-15T09:30:00Z',
      updated_at: '2023-05-10T14:20:00Z',
    },
    {
      id: 'artist2',
      name: 'Echo Pulse',
      slug: 'echo-pulse',
      bio: 'Echo Pulse crafts mesmerizing soundscapes that journey through ambient, downtempo, and experimental electronic music.',
      genre: 'Ambient',
      profile_image: '/images/artists/echo-pulse.jpg',
      cover_image: '/images/artists/covers/echo-pulse-cover.jpg',
      is_published: true,
      is_featured: false,
      instagram: 'https://instagram.com/echopulse',
      soundcloud: 'https://soundcloud.com/echopulse',
      youtube: 'https://youtube.com/echopulse',
      created_at: '2023-02-22T11:45:00Z',
      updated_at: '2023-06-14T09:10:00Z',
    },
    {
      id: 'artist3',
      name: 'Quantum Drift',
      slug: 'quantum-drift',
      bio: 'Quantum Drift explores the intersection of house, techno, and electronica with a focus on hypnotic rhythms and intricate melodies.',
      genre: 'House',
      profile_image: '/images/artists/quantum-drift.jpg',
      cover_image: '/images/artists/covers/quantum-drift-cover.jpg',
      is_published: true,
      is_featured: true,
      instagram: 'https://instagram.com/quantumdrift',
      facebook: 'https://facebook.com/quantumdrift',
      spotify: 'https://open.spotify.com/artist/quantumdrift',
      bandcamp: 'https://quantumdrift.bandcamp.com',
      created_at: '2023-03-05T15:20:00Z',
      updated_at: '2023-07-20T16:30:00Z',
    },
  ];

  // RELEASES
  private releases: Release[] = [
    {
      id: 'release1',
      title: 'Nebula Dreams',
      slug: 'nebula-dreams',
      release_date: '2023-04-15T00:00:00Z',
      artist_id: 'artist1',
      cover_image: '/images/releases/nebula-dreams.jpg',
      description: 'A journey through cosmic soundscapes and pulsating techno rhythms.',
      genre_id: 'genre1',
      is_published: true,
      is_featured: true,
      spotify_url: 'https://open.spotify.com/album/nebuladreams',
      bandcamp_url: 'https://alexgrey.bandcamp.com/album/nebula-dreams',
      created_at: '2023-04-01T10:00:00Z',
      updated_at: '2023-04-15T00:00:00Z',
    },
    {
      id: 'release2',
      title: 'Midnight Echoes',
      slug: 'midnight-echoes',
      release_date: '2023-06-20T00:00:00Z',
      artist_id: 'artist2',
      cover_image: '/images/releases/midnight-echoes.jpg',
      description: 'Ambient textures and ethereal soundscapes for late night introspection.',
      genre_id: 'genre2',
      is_published: true,
      is_featured: false,
      soundcloud_url: 'https://soundcloud.com/echopulse/sets/midnight-echoes',
      youtube_url: 'https://youtube.com/playlist?list=midnight-echoes',
      created_at: '2023-06-01T14:30:00Z',
      updated_at: '2023-06-20T00:00:00Z',
    },
    {
      id: 'release3',
      title: 'Quantum Fields',
      slug: 'quantum-fields',
      release_date: '2023-08-10T00:00:00Z',
      artist_id: 'artist3',
      cover_image: '/images/releases/quantum-fields.jpg',
      description:
        'Progressive house and melodic techno inspired by quantum physics and abstract mathematics.',
      genre_id: 'genre3',
      is_published: true,
      is_featured: true,
      spotify_url: 'https://open.spotify.com/album/quantumfields',
      apple_music_url: 'https://music.apple.com/album/quantum-fields',
      beatport_url: 'https://www.beatport.com/release/quantum-fields',
      created_at: '2023-07-28T09:15:00Z',
      updated_at: '2023-08-10T00:00:00Z',
    },
  ];

  // TRACKS
  private tracks: Track[] = [
    {
      id: 'track1',
      title: 'Cosmic Dawn',
      release_id: 'release1',
      duration: 372, // 6:12
      track_number: 1,
      preview_url: '/audio/previews/cosmic-dawn.mp3',
      is_published: true,
      created_at: '2023-04-01T10:05:00Z',
    },
    {
      id: 'track2',
      title: 'Astral Projection',
      release_id: 'release1',
      duration: 452, // 7:32
      track_number: 2,
      preview_url: '/audio/previews/astral-projection.mp3',
      is_published: true,
      created_at: '2023-04-01T10:10:00Z',
    },
    {
      id: 'track3',
      title: 'Lunar Tides',
      release_id: 'release1',
      duration: 398, // 6:38
      track_number: 3,
      preview_url: '/audio/previews/lunar-tides.mp3',
      is_published: true,
      created_at: '2023-04-01T10:15:00Z',
    },
    {
      id: 'track4',
      title: 'Twilight Whispers',
      release_id: 'release2',
      duration: 485, // 8:05
      track_number: 1,
      preview_url: '/audio/previews/twilight-whispers.mp3',
      is_published: true,
      created_at: '2023-06-01T14:35:00Z',
    },
    {
      id: 'track5',
      title: 'Spectral Shadows',
      release_id: 'release2',
      duration: 423, // 7:03
      track_number: 2,
      preview_url: '/audio/previews/spectral-shadows.mp3',
      is_published: true,
      created_at: '2023-06-01T14:40:00Z',
    },
    {
      id: 'track6',
      title: 'Entanglement',
      release_id: 'release3',
      duration: 362, // 6:02
      track_number: 1,
      preview_url: '/audio/previews/entanglement.mp3',
      is_published: true,
      created_at: '2023-07-28T09:20:00Z',
    },
    {
      id: 'track7',
      title: 'Superposition',
      release_id: 'release3',
      duration: 412, // 6:52
      track_number: 2,
      preview_url: '/audio/previews/superposition.mp3',
      is_published: true,
      created_at: '2023-07-28T09:25:00Z',
    },
  ];

  // BLOG AUTHORS
  private authors: Author[] = [
    {
      id: 'author1',
      name: 'Sophie Edwards',
      bio: 'Electronic music journalist and DJ with a passion for underground club culture.',
      avatar: '/images/authors/sophie-edwards.jpg',
      website: 'https://sophieedwards.com',
      email: 'sophie@echoniq.com',
      created_at: '2023-01-10T08:00:00Z',
    },
    {
      id: 'author2',
      name: 'Marcus Chen',
      bio: 'Music producer, sound designer, and techno enthusiast based in Berlin.',
      avatar: '/images/authors/marcus-chen.jpg',
      website: 'https://marcuschen.de',
      email: 'marcus@echoniq.com',
      created_at: '2023-01-12T09:30:00Z',
    },
  ];

  // BLOG CATEGORIES
  private blogCategories: BlogCategory[] = [
    {
      id: 'category1',
      name: 'News',
      slug: 'news',
      description: 'The latest updates from the echoniq universe',
      color: '#3498db',
      created_at: '2023-01-05T00:00:00Z',
    },
    {
      id: 'category2',
      name: 'Interviews',
      slug: 'interviews',
      description: 'In-depth conversations with artists and industry figures',
      color: '#9b59b6',
      created_at: '2023-01-05T00:05:00Z',
    },
    {
      id: 'category3',
      name: 'Tutorials',
      slug: 'tutorials',
      description: 'Production techniques, tips, and tricks',
      color: '#2ecc71',
      created_at: '2023-01-05T00:10:00Z',
    },
    {
      id: 'category4',
      name: 'Reviews',
      slug: 'reviews',
      description: 'Equipment, software, and release reviews',
      color: '#e74c3c',
      created_at: '2023-01-05T00:15:00Z',
    },
  ];

  // BLOG POSTS
  private blogPosts: BlogPost[] = [
    {
      id: 'post1',
      title: 'Introducing Alex Grey: Our Newest Signing',
      slug: 'introducing-alex-grey',
      content:
        '## Meet Alex Grey\n\nWe are thrilled to welcome Alex Grey to the echoniq family! Alex is a groundbreaking electronic music producer whose unique blend of deep, atmospheric techno has been captivating audiences worldwide.\n\n![Alex Grey](/images/blog/alex-grey-feature.jpg)\n\n### Background\n\nBased in Berlin, Alex has been producing music for over a decade, with releases on prestigious labels such as Hypnus Records, Semantica, and Stroboscopic Artefacts. His sound is characterized by intricate rhythms, immersive soundscapes, and a perfect balance between experimental and dance floor-oriented elements.\n\n### What\'s Next\n\nAlex is currently putting the finishing touches on his debut EP for echoniq, titled "Nebula Dreams." The four-track release explores cosmic themes through pulsating techno and ambient interludes, showcasing Alex\'s signature sound while pushing into new territories.\n\n### In His Own Words\n\n"Joining echoniq feels like finding the perfect home for my music. Their commitment to artistic freedom and forward-thinking approach to electronic music aligns perfectly with my vision. I\'m excited to share my new material with the world through this collaboration." - Alex Grey\n\nStay tuned for more updates and a release date announcement soon!',
      excerpt:
        'Meet our newest signing, Alex Grey, a Berlin-based producer crafting deep, atmospheric techno with a unique sonic signature.',
      author_id: 'author1',
      featured_image: '/images/blog/alex-grey-feature.jpg',
      category: 'category1',
      tags: ['artist signing', 'techno', 'berlin', 'alex grey'],
      is_published: true,
      is_featured: true,
      published_at: '2023-03-15T09:00:00Z',
      seo_title: 'Alex Grey Joins echoniq Label - New Techno Artist Signing',
      seo_description:
        'Berlin-based techno producer Alex Grey joins echoniq label, with debut EP "Nebula Dreams" coming soon. Read about our exciting new artist.',
      created_at: '2023-03-14T14:30:00Z',
      updated_at: '2023-03-15T09:00:00Z',
    },
    {
      id: 'post2',
      title: "Studio Tour: Inside Echo Pulse's Creative Space",
      slug: 'studio-tour-echo-pulse',
      content:
        '## A Glimpse Into the Creative Process\n\nIn this exclusive feature, we take you inside the studio of ambient producer Echo Pulse, whose mesmerizing soundscapes have been captivating listeners around the globe.\n\n![Echo Pulse Studio](/images/blog/echo-pulse-studio.jpg)\n\n### The Space\n\nHidden away in a converted warehouse in Manchester, Echo Pulse\'s studio is a blend of vintage analog equipment and cutting-edge digital technology. The large, open space with high ceilings provides natural reverb that influences their production approach.\n\n"I need room for sound to breathe," explains the artist. "The physical space becomes part of the music."\n\n### Key Equipment\n\n* **Synthesizers**: Moog Matriarch, Make Noise Shared System, Prophet Rev2\n* **Processors**: Strymon BigSky, Eventide H9000, various Eurorack modules\n* **Recording**: Universal Audio Apollo interface, Neumann microphones\n* **Software**: Ableton Live, Max/MSP, Cycling \'74 plugins\n\n### The Workflow\n\nEcho Pulse describes their process as "organized chaos," beginning with ambient field recordings that form the foundation of each track. These are then manipulated through various processes before synthesizers and other elements are added.\n\n"I don\'t try to force the music into a predetermined structure," they say. "I follow where it wants to go, which often leads to unexpected places."\n\n### Upcoming Projects\n\nCurrently working on their second release for echoniq, Echo Pulse hints at an evolution of their sound: "The new material explores deeper rhythmic elements while maintaining the atmospheric qualities. It\'s less about individual tracks and more about creating an immersive journey."\n\nLook for Echo Pulse\'s new EP "Midnight Echoes" coming this summer.',
      excerpt:
        'Step inside the Manchester studio of ambient producer Echo Pulse and discover the equipment and processes behind their mesmerizing soundscapes.',
      author_id: 'author2',
      featured_image: '/images/blog/echo-pulse-studio.jpg',
      category: 'category2',
      tags: ['studio tour', 'ambient', 'gear', 'echo pulse', 'production'],
      is_published: true,
      is_featured: false,
      published_at: '2023-05-22T11:30:00Z',
      created_at: '2023-05-20T16:45:00Z',
      updated_at: '2023-05-22T11:30:00Z',
    },
    {
      id: 'post3',
      title: 'Production Tutorial: Creating Evolving Ambient Textures',
      slug: 'production-tutorial-ambient-textures',
      content:
        '## Mastering the Art of Evolving Ambient Textures\n\nIn this tutorial, we\'ll explore techniques for creating rich, evolving ambient textures that can serve as the foundation for atmospheric electronic music or provide background elements in any genre.\n\n![Ambient Textures](/images/blog/ambient-textures.jpg)\n\n### The Basics of Layering\n\nThe key to compelling ambient textures lies in thoughtful layering. Rather than stacking similar sounds, combine elements with different spectral characteristics:\n\n1. **Foundation Layer**: Start with a pad or drone that occupies the mid-range frequencies\n2. **Movement Layer**: Add elements with subtle modulation or rhythmic patterns\n3. **Accent Layer**: Incorporate sparse, higher frequency sounds for interest\n4. **Texture Layer**: Introduce noise, field recordings, or granular elements\n\n### Processing Chains\n\nThe magic happens in the processing. Here\'s a versatile effects chain for ambient textures:\n\n```\nSource → Subtle Saturation → EQ → Reverb → Delay → Second Reverb → Gentle Compression\n```\n\nLet\'s break this down:\n\n* **Saturation**: Adds harmonics and warmth without obvious distortion\n* **EQ**: Carve out space and emphasize pleasing frequencies\n* **First Reverb**: Medium decay (1-3 seconds) with pre-delay\n* **Delay**: Low feedback, higher mix\n* **Second Reverb**: Longer decay (4+ seconds) with lower mix\n* **Compression**: Gentle settings to glue everything together\n\n### Modulation Is Key\n\nStatic textures quickly become boring. Add life through modulation:\n\n* Use LFOs with very slow rates (0.1-0.3 Hz)\n* Modulate filter cutoffs, reverb sizes, delay times, or pan positions\n* Create modulation that runs at different rates for different parameters\n\n### Practical Example: Ableton Live\n\n1. Start with a simple sustained chord from Wavetable\n2. Add an Auto Filter with subtle LFO on the cutoff\n3. Insert Valhalla VintageVerb with medium decay\n4. Add Echo with ping-pong setting and low feedback\n5. Insert Valhalla Shimmer with longer decay\n6. Finish with Glue Compressor using gentle settings\n7. Automate parameters over 16 bars for evolution\n\n### Advanced Technique: Resampling\n\nFor truly unique textures, try multiple rounds of resampling:\n\n1. Record your processed texture to a new audio track\n2. Apply new processing to this recorded version\n3. Repeat this process, making different adjustments each time\n\nThis "generation loss" creates organic complexity that\'s difficult to achieve otherwise.\n\n### Conclusion\n\nCreating compelling ambient textures is about patience and subtlety. Small changes add up to create movement that keeps listeners engaged without drawing attention to individual elements. Experiment with these techniques and develop your own approach to textural sound design.\n\n*This tutorial was inspired by the production techniques of Echo Pulse, whose ambient masterpiece "Midnight Echoes" releases on June 20.*',
      excerpt:
        'Learn how to create rich, evolving ambient textures using layering, effects chains, modulation, and resampling techniques in this detailed tutorial.',
      author_id: 'author2',
      featured_image: '/images/blog/ambient-textures.jpg',
      category: 'category3',
      tags: ['tutorial', 'production', 'ambient', 'sound design', 'ableton'],
      is_published: true,
      is_featured: true,
      published_at: '2023-06-05T10:15:00Z',
      created_at: '2023-06-01T13:20:00Z',
      updated_at: '2023-06-05T10:15:00Z',
    },
  ];

  // BLOG COMMENTS
  private blogComments: BlogComment[] = [
    {
      id: 'comment1',
      post_id: 'post1',
      author_name: 'Techno Fan',
      author_email: 'technofan@example.com',
      content:
        "Really excited to hear Alex Grey's new material on echoniq! Been following him since his early releases on Hypnus.",
      is_approved: true,
      created_at: '2023-03-15T14:25:00Z',
    },
    {
      id: 'comment2',
      post_id: 'post1',
      author_name: 'DJ Strata',
      author_email: 'djstrata@example.com',
      content:
        'Great signing! His tracks always work well in my sets. Looking forward to the new EP.',
      is_approved: true,
      created_at: '2023-03-16T09:10:00Z',
    },
    {
      id: 'comment3',
      post_id: 'post3',
      author_name: 'Ambient Producer',
      author_email: 'ambientproducer@example.com',
      content:
        'This tutorial is gold! The resampling technique really takes textures to another level. Would love to see more advanced tutorials like this.',
      is_approved: true,
      avatar: 'https://ui-avatars.com/api/?name=Ambient+Producer&background=random',
      created_at: '2023-06-06T11:45:00Z',
    },
  ];

  // MUSIC GENRES
  private genres: MusicGenre[] = [
    {
      id: 'genre1',
      name: 'Techno',
      slug: 'techno',
      description: 'Hypnotic rhythms and electronic soundscapes',
      color: '#3498db',
      created_at: '2023-01-02T00:00:00Z',
    },
    {
      id: 'genre2',
      name: 'Ambient',
      slug: 'ambient',
      description: 'Atmospheric, textural electronic music',
      color: '#2ecc71',
      created_at: '2023-01-02T00:05:00Z',
    },
    {
      id: 'genre3',
      name: 'House',
      slug: 'house',
      description: 'Soulful electronic dance music',
      color: '#e74c3c',
      created_at: '2023-01-02T00:10:00Z',
    },
    {
      id: 'genre4',
      name: 'Drum & Bass',
      slug: 'drum-and-bass',
      description: 'Fast breakbeats and heavy bass lines',
      color: '#f1c40f',
      created_at: '2023-01-02T00:15:00Z',
    },
    {
      id: 'genre5',
      name: 'Experimental',
      slug: 'experimental',
      description: 'Pushing the boundaries of electronic sound',
      color: '#9b59b6',
      created_at: '2023-01-02T00:20:00Z',
    },
  ];

  // STUDIO SERVICES
  private studioServices: StudioService[] = [
    {
      id: 'service1',
      name: 'Mixing',
      slug: 'mixing',
      description: 'Professional mixing for electronic music by our experienced engineers.',
      price: 250,
      duration: 8, // hours
      is_published: true,
      created_at: '2023-01-03T00:00:00Z',
    },
    {
      id: 'service2',
      name: 'Mastering',
      slug: 'mastering',
      description: 'High-quality mastering to prepare your music for release.',
      price: 150,
      duration: 4, // hours
      is_published: true,
      created_at: '2023-01-03T00:05:00Z',
    },
    {
      id: 'service3',
      name: 'Production Session',
      slug: 'production-session',
      description: 'Work with our producers to develop your tracks from concept to completion.',
      price: 300,
      duration: 6, // hours
      is_published: true,
      created_at: '2023-01-03T00:10:00Z',
    },
    {
      id: 'service4',
      name: 'Recording Session',
      slug: 'recording-session',
      description: 'Professional recording session in our studio with top-quality equipment.',
      price: 200,
      duration: 4, // hours
      is_published: true,
      created_at: '2023-01-03T00:15:00Z',
    },
  ];

  // GETTER METHODS

  // Get all artists
  getArtists(options: FilterOptions = {}): Artist[] {
    let artists = [...this.artists];

    // Apply filters
    if (options.published !== undefined) {
      artists = artists.filter((artist) => artist.is_published === options.published);
    }

    if (options.featured !== undefined) {
      artists = artists.filter((artist) => artist.is_featured === options.featured);
    }

    if (options.genre) {
      artists = artists.filter(
        (artist) => artist.genre && artist.genre.toLowerCase() === options.genre!.toLowerCase()
      );
    }

    if (options.search) {
      const searchLower = options.search.toLowerCase();
      artists = artists.filter(
        (artist) =>
          artist.name.toLowerCase().includes(searchLower) ||
          (artist.bio && artist.bio.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    if (options.orderBy) {
      artists.sort((a, b) => {
        const aValue = a[options.orderBy as keyof Artist];
        const bValue = b[options.orderBy as keyof Artist];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return options.ascending !== false
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return this.compareValues(aValue, bValue, options.ascending !== false);
      });
    } else {
      // Default sort by name
      artists.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Apply limit
    if (options.limit && options.limit > 0) {
      artists = artists.slice(0, options.limit);
    }

    return artists;
  }

  // Get artist by slug
  getArtistBySlug(slug: string): Artist | null {
    return this.artists.find((artist) => artist.slug === slug) || null;
  }

  // Get artist with releases
  getArtistWithReleases(artistId: string): ArtistWithReleases | null {
    const artist = this.artists.find((a) => a.id === artistId);
    if (!artist) return null;

    const artistReleases = this.releases.filter((release) => release.artist_id === artistId);

    // Add tracks to each release
    const releasesWithTracks = artistReleases.map((release) => {
      const releaseTracks = this.tracks.filter((track) => track.release_id === release.id);
      return { ...release, tracks: releaseTracks };
    });

    return { ...artist, releases: releasesWithTracks };
  }

  // Get all releases
  getReleases(options: FilterOptions = {}): Release[] {
    let releases = [...this.releases];

    // Apply filters
    if (options.published !== undefined) {
      releases = releases.filter((release) => release.is_published === options.published);
    }

    if (options.featured !== undefined) {
      releases = releases.filter((release) => release.is_featured === options.featured);
    }

    if (options.genre) {
      releases = releases.filter((release) => release.genre_id === options.genre);
    }

    if (options.search) {
      const searchLower = options.search.toLowerCase();
      releases = releases.filter(
        (release) =>
          release.title.toLowerCase().includes(searchLower) ||
          (release.description && release.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    if (options.orderBy) {
      releases.sort((a, b) => {
        const aValue = a[options.orderBy as keyof Release];
        const bValue = b[options.orderBy as keyof Release];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return options.ascending !== false
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return this.compareValues(aValue, bValue, options.ascending !== false);
      });
    } else {
      // Default sort by release date (newest first)
      releases.sort(
        (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    }

    // Apply limit
    if (options.limit && options.limit > 0) {
      releases = releases.slice(0, options.limit);
    }

    return releases;
  }

  // Get release by slug
  getReleaseBySlug(slug: string): Release | null {
    return this.releases.find((release) => release.slug === slug) || null;
  }

  // Get release with tracks
  getReleaseWithTracks(releaseId: string): (Release & { tracks?: Track[] }) | null {
    const release = this.releases.find((r) => r.id === releaseId);
    if (!release) return null;

    const releaseTracks = this.tracks.filter((track) => track.release_id === releaseId);

    return { ...release, tracks: releaseTracks };
  }

  // Get release with artist
  getReleaseWithArtist(releaseId: string): (Release & { artist?: Artist }) | null {
    const release = this.releases.find((r) => r.id === releaseId);
    if (!release) return null;

    const artist = this.artists.find((artist) => artist.id === release.artist_id);

    return { ...release, artist };
  }

  // Get tracks for a release
  getTracksForRelease(releaseId: string): Track[] {
    return this.tracks.filter((track) => track.release_id === releaseId);
  }

  // Get all blog posts
  getBlogPosts(options: FilterOptions = {}): BlogPost[] {
    let posts = [...this.blogPosts];

    // Apply filters
    if (options.published !== undefined) {
      posts = posts.filter((post) => post.is_published === options.published);
    }

    if (options.featured !== undefined) {
      posts = posts.filter((post) => post.is_featured === options.featured);
    }

    if (options.category) {
      posts = posts.filter((post) => post.category === options.category);
    }

    if (options.tag) {
      posts = posts.filter(
        (post) =>
          post.tags && post.tags.some((tag) => tag.toLowerCase() === options.tag!.toLowerCase())
      );
    }

    if (options.search) {
      const searchLower = options.search.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(searchLower)) ||
          (post.content && post.content.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    if (options.orderBy) {
      posts.sort((a, b) => {
        const aValue = a[options.orderBy as keyof BlogPost];
        const bValue = b[options.orderBy as keyof BlogPost];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return options.ascending !== false
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return this.compareValues(aValue, bValue, options.ascending !== false);
      });
    } else {
      // Default sort by published date (newest first)
      posts.sort((a, b) => {
        const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
        const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;
        return dateB - dateA;
      });
    }

    // Apply limit
    if (options.limit && options.limit > 0) {
      posts = posts.slice(0, options.limit);
    }

    return posts;
  }

  // Get blog post by slug
  getBlogPostBySlug(slug: string): BlogPost | null {
    return this.blogPosts.find((post) => post.slug === slug) || null;
  }

  // Get blog post with author
  getBlogPostWithAuthor(postId: string): (BlogPost & { authors?: Author | null }) | null {
    const post = this.blogPosts.find((p) => p.id === postId);
    if (!post) return null;

    const author = post.author_id
      ? this.authors.find((a) => a.id === post.author_id) || null
      : null;

    return { ...post, authors: author };
  }

  // Get blog post by slug with author
  getBlogPostWithAuthorBySlug(slug: string): (BlogPost & { authors?: Author | null }) | null {
    const post = this.getBlogPostBySlug(slug);
    if (!post) return null;

    const author = post.author_id
      ? this.authors.find((a) => a.id === post.author_id) || null
      : null;

    return { ...post, authors: author };
  }

  // Get blog comments for a post
  getBlogCommentsForPost(postId: string): BlogComment[] {
    return this.blogComments.filter((comment) => comment.post_id === postId && comment.is_approved);
  }

  // Get all blog categories
  getBlogCategories(): BlogCategory[] {
    return [...this.blogCategories];
  }

  // Get blog category by slug
  getBlogCategoryBySlug(slug: string): BlogCategory | null {
    return this.blogCategories.find((category) => category.slug === slug) || null;
  }

  // Get all music genres
  getGenres(): MusicGenre[] {
    return [...this.genres];
  }

  // Get music genre by slug
  getGenreBySlug(slug: string): MusicGenre | null {
    return this.genres.find((genre) => genre.slug === slug) || null;
  }

  // Get all studio services
  getStudioServices(): StudioService[] {
    return [...this.studioServices];
  }

  // Get studio service by slug
  getStudioServiceBySlug(slug: string): StudioService | null {
    return this.studioServices.find((service) => service.slug === slug) || null;
  }
}

const mockData = new MockDataProvider();
export default mockData;
