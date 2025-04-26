import Image, { ImageProps } from 'next/image';
import React, { useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackAlt?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = '/images/fallback-image.jpg',
  fallbackAlt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src as string);
  const [imgAlt, setImgAlt] = useState<string>(alt as string);
  const [error, setError] = useState<boolean>(false);

  const handleError = () => {
    setError(true);
    setImgSrc(fallbackSrc);
    if (fallbackAlt) {
      setImgAlt(fallbackAlt);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={imgAlt}
      onError={handleError}
      className={`${props.className || ''} ${error ? 'fallback-image' : ''}`}
    />
  );
};

export default ImageWithFallback;
