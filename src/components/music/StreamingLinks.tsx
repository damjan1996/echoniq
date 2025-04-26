import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

export interface StreamingLinksProps {
  // Diese Props werden individuell übergeben
  spotify?: string | null;
  appleMusic?: string | null;
  soundcloud?: string | null;
  bandcamp?: string | null;
  beatport?: string | null;
  youtube?: string | null;

  // Alternative: Ein Record-Objekt für die Links
  links?: Record<string, string>;

  className?: string;
  showLabels?: boolean;
}

// Mapping von Keys zu Icons und Farben
const streamingServices = {
  spotify: { color: '#1DB954', icon: 'spotify', label: 'Spotify' },
  apple_music: { color: '#FB233B', icon: 'apple-music', label: 'Apple Music' },
  soundcloud: { color: '#FF5500', icon: 'soundcloud', label: 'SoundCloud' },
  bandcamp: { color: '#629aa9', icon: 'bandcamp', label: 'Bandcamp' },
  beatport: { color: '#01FF95', icon: 'beatport', label: 'Beatport' },
  youtube: { color: '#FF0000', icon: 'youtube', label: 'YouTube' },
};

// Interface für einen Link-Eintrag für konsistente Typisierung
interface LinkEntry {
  name: string;
  url: string;
  color: string;
  icon: string;
}

export const StreamingLinks: React.FC<StreamingLinksProps> = ({
  spotify,
  appleMusic,
  soundcloud,
  bandcamp,
  beatport,
  youtube,
  links = {}, // Default zu leeres Objekt
  className,
  showLabels = true,
}) => {
  // Kombiniere individuelle Props und links-Objekt
  const allLinks: LinkEntry[] = [
    ...(spotify
      ? [
          {
            name: 'Spotify',
            url: spotify,
            color: streamingServices.spotify.color,
            icon: streamingServices.spotify.icon,
          },
        ]
      : []),
    ...(appleMusic
      ? [
          {
            name: 'Apple Music',
            url: appleMusic,
            color: streamingServices.apple_music.color,
            icon: streamingServices.apple_music.icon,
          },
        ]
      : []),
    ...(soundcloud
      ? [
          {
            name: 'SoundCloud',
            url: soundcloud,
            color: streamingServices.soundcloud.color,
            icon: streamingServices.soundcloud.icon,
          },
        ]
      : []),
    ...(bandcamp
      ? [
          {
            name: 'Bandcamp',
            url: bandcamp,
            color: streamingServices.bandcamp.color,
            icon: streamingServices.bandcamp.icon,
          },
        ]
      : []),
    ...(beatport
      ? [
          {
            name: 'Beatport',
            url: beatport,
            color: streamingServices.beatport.color,
            icon: streamingServices.beatport.icon,
          },
        ]
      : []),
    ...(youtube
      ? [
          {
            name: 'YouTube',
            url: youtube,
            color: streamingServices.youtube.color,
            icon: streamingServices.youtube.icon,
          },
        ]
      : []),
  ];

  // Füge links vom links-Objekt hinzu
  if (links && typeof links === 'object') {
    Object.entries(links).forEach(([key, url]) => {
      if (url && streamingServices[key as keyof typeof streamingServices]) {
        const service = streamingServices[key as keyof typeof streamingServices];
        // Nur hinzufügen, wenn nicht bereits durch individuelle Props gesetzt
        const exists = allLinks.some(
          (link) => link.name.toLowerCase() === service.label.toLowerCase()
        );
        if (!exists) {
          allLinks.push({
            name: service.label,
            url,
            color: service.color,
            icon: service.icon,
          });
        }
      }
    });
  }

  // Wenn keine Links verfügbar sind
  if (allLinks.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={cn('flex flex-wrap gap-3', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {allLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center rounded-full transition-all duration-300',
            showLabels ? 'px-4 py-2 hover:shadow-md' : 'p-3 hover:scale-110'
          )}
          style={{
            backgroundColor: `${link.color}20`, // 20% opacity of the color
            color: link.color,
          }}
          variants={itemVariants}
          whileHover={{
            backgroundColor: `${link.color}30`, // 30% opacity on hover
            y: -3,
            transition: { duration: 0.2 },
          }}
        >
          <span className={`icon-${link.icon} text-lg`} aria-hidden="true" />

          {showLabels && (
            <>
              <span className="ml-2 text-sm font-medium">{link.name}</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </>
          )}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default StreamingLinks;
