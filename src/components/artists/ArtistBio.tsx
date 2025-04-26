import React from 'react';

export interface ArtistBioProps {
  /** Biografie-Text des Künstlers */
  bio: string;
  /** Optionales Styling über Tailwind-Klassen */
  className?: string;
}

/**
 * Komponente zur Anzeige der Künstler-Biografie mit optionalem `className`.
 */
export const ArtistBio: React.FC<ArtistBioProps> = ({ bio, className }) => {
  return <div className={className}>{bio}</div>;
};

export default ArtistBio;
