import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

// Import specific exports instead of default
import { defaultSeo, openGraph, twitter, organizationSchema, metaVerification } from '@/config/seo';

// Define more specific type for structured data instead of any
type StructuredData = Record<string, unknown>;

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'music' | 'profile';
  noindex?: boolean;
  structuredData?: StructuredData;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleTags?: string[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  structuredData,
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleTags = [],
}) => {
  const router = useRouter();

  // Format title with template
  const formattedTitle = title ? defaultSeo.titleTemplate.replace('%s', title) : defaultSeo.title;

  // Get canonical URL
  const canonicalUrl = canonical
    ? canonical
    : `${defaultSeo.canonical}${router.asPath === '/' ? '' : router.asPath}`;

  // Get OG image URL (with fallback)
  const ogImageUrl = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${defaultSeo.canonical}${ogImage}`
    : openGraph.images && openGraph.images.length > 0
      ? openGraph.images[0].url
      : null;

  // Prepare structured data JSON
  const defaultStructuredData = organizationSchema;
  const finalStructuredData = structuredData || defaultStructuredData;

  // Combine SEO description
  const finalDescription = description || defaultSeo.description;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Language tags */}
      <meta property="og:locale" content={defaultSeo.locale} />
      {defaultSeo.localeAlternates.map((locale) => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}
      <meta httpEquiv="Content-Language" content={defaultSeo.language} />

      {/* Robots directives */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content={`
            ${defaultSeo.robotsProps.nosnippet ? 'nosnippet,' : ''}
            ${defaultSeo.robotsProps.notranslate ? 'notranslate,' : ''}
            ${defaultSeo.robotsProps.noimageindex ? 'noimageindex,' : ''}
            ${defaultSeo.robotsProps.noarchive ? 'noarchive,' : ''}
            max-snippet:${defaultSeo.robotsProps.maxSnippet},
            max-image-preview:${defaultSeo.robotsProps.maxImagePreview},
            max-video-preview:${defaultSeo.robotsProps.maxVideoPreview}
          `.trim()}
        />
      )}

      {/* Open Graph Tags */}
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={openGraph.siteName} />

      {ogImageUrl && (
        <>
          <meta property="og:image" content={ogImageUrl} />
          <meta property="og:image:alt" content={formattedTitle} />
          {openGraph.images && openGraph.images[0].width && (
            <meta property="og:image:width" content={openGraph.images[0].width.toString()} />
          )}
          {openGraph.images && openGraph.images[0].height && (
            <meta property="og:image:height" content={openGraph.images[0].height.toString()} />
          )}
        </>
      )}

      {/* Article specific OG tags */}
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {ogType === 'article' && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {ogType === 'article' &&
        articleTags.length > 0 &&
        articleTags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitter.cardType} />
      <meta name="twitter:site" content={twitter.site} />
      <meta name="twitter:creator" content={twitter.handle} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}

      {/* Site verification */}
      {metaVerification.google && (
        <meta name="google-site-verification" content={metaVerification.google} />
      )}
      {metaVerification.bing && <meta name="msvalidate.01" content={metaVerification.bing} />}
      {metaVerification.yandex && (
        <meta name="yandex-verification" content={metaVerification.yandex} />
      )}
      {metaVerification.facebook && (
        <meta name="facebook-domain-verification" content={metaVerification.facebook} />
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalStructuredData) }}
      />
    </Head>
  );
};

export default SEO;
