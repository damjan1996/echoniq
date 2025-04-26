import { useCallback } from 'react';

import { sharingConfig } from '@/config/social';

import { useAnalytics } from './use-analytics';

interface ShareOptions {
  title?: string;
  text?: string;
  hashtags?: string[];
  via?: string;
  dialogTitle?: string;
}

/**
 * Hook for sharing content on social media platforms
 *
 * @returns Social sharing utility functions
 */
export const useSocialShare = () => {
  const { trackEvent } = useAnalytics();

  /**
   * Check if navigator.share API is available
   */
  const isNativeShareAvailable = typeof navigator !== 'undefined' && !!navigator.share;

  /**
   * Copy text to clipboard
   */
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  }, []);

  /**
   * Share URL via native browser share API
   */
  const shareUrl = useCallback(
    async (url: string, options: ShareOptions = {}) => {
      const shareData = {
        url,
        title: options.title || document.title,
        text: options.text || '',
      };

      try {
        if (isNativeShareAvailable) {
          // Use native share dialog if available
          await navigator.share(shareData);
          trackEvent('SHARE_TRACK', { platform: 'native_share', url });
          return true;
        } else {
          // Fallback to custom share dialog or copy to clipboard
          return copyToClipboard(url);
        }
      } catch (error) {
        console.error('Error sharing URL:', error);
        return false;
      }
    },
    [isNativeShareAvailable, trackEvent, copyToClipboard]
  );

  /**
   * Share content on Twitter/X
   */
  const shareOnTwitter = useCallback(
    (url: string, options: ShareOptions = {}) => {
      const twitterUrl = new URL('https://twitter.com/intent/tweet');
      twitterUrl.searchParams.append('url', url);

      if (options.text) {
        twitterUrl.searchParams.append('text', options.text);
      }

      if (options.hashtags && options.hashtags.length > 0) {
        twitterUrl.searchParams.append('hashtags', options.hashtags.join(','));
      }

      if (options.via) {
        twitterUrl.searchParams.append('via', options.via);
      }

      window.open(twitterUrl.toString(), 'share-twitter', 'width=550,height=400');
      trackEvent('SHARE_TRACK', { platform: 'twitter', url });
      return true;
    },
    [trackEvent]
  );

  /**
   * Share content on Facebook
   */
  const shareOnFacebook = useCallback(
    (url: string, options: ShareOptions = {}) => {
      const facebookUrl = new URL('https://www.facebook.com/sharer/sharer.php');
      facebookUrl.searchParams.append('u', url);

      if (options.hashtags && options.hashtags.length > 0) {
        facebookUrl.searchParams.append(
          'hashtag',
          options.hashtags.map((tag) => `#${tag}`).join(' ')
        );
      }

      window.open(facebookUrl.toString(), 'share-facebook', 'width=550,height=400');
      trackEvent('SHARE_TRACK', { platform: 'facebook', url });
      return true;
    },
    [trackEvent]
  );

  /**
   * Share content on WhatsApp
   */
  const shareOnWhatsApp = useCallback(
    (url: string, options: ShareOptions = {}) => {
      const whatsappText = options.text ? `${options.text} ${url}` : url;
      const whatsappUrl = new URL('https://wa.me/');
      whatsappUrl.searchParams.append('text', whatsappText);

      window.open(whatsappUrl.toString(), '_blank');
      trackEvent('SHARE_TRACK', { platform: 'whatsapp', url });
      return true;
    },
    [trackEvent]
  );

  /**
   * Share content via email
   */
  const shareViaEmail = useCallback(
    (url: string, options: ShareOptions = {}) => {
      const subject = options.title || document.title;
      const body = options.text ? `${options.text}\n\n${url}` : url;
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
      trackEvent('SHARE_TRACK', { platform: 'email', url });
      return true;
    },
    [trackEvent]
  );

  /**
   * Share content on LinkedIn
   */
  const shareOnLinkedIn = useCallback(
    (url: string, options: ShareOptions = {}) => {
      const linkedInUrl = new URL('https://www.linkedin.com/shareArticle');
      linkedInUrl.searchParams.append('mini', 'true');
      linkedInUrl.searchParams.append('url', url);

      if (options.title) {
        linkedInUrl.searchParams.append('title', options.title);
      }

      if (options.text) {
        linkedInUrl.searchParams.append('summary', options.text);
      }

      window.open(linkedInUrl.toString(), 'share-linkedin', 'width=550,height=400');
      trackEvent('SHARE_TRACK', { platform: 'linkedin', url });
      return true;
    },
    [trackEvent]
  );

  /**
   * Share content on specified platform
   */
  const shareOn = useCallback(
    (platform: string, url: string, options: ShareOptions = {}) => {
      switch (platform.toLowerCase()) {
        case 'twitter':
        case 'x':
          return shareOnTwitter(url, options);
        case 'facebook':
          return shareOnFacebook(url, options);
        case 'whatsapp':
          return shareOnWhatsApp(url, options);
        case 'email':
          return shareViaEmail(url, options);
        case 'linkedin':
          return shareOnLinkedIn(url, options);
        case 'clipboard':
          return copyToClipboard(url);
        default:
          return shareUrl(url, options);
      }
    },
    [
      shareUrl,
      shareOnTwitter,
      shareOnFacebook,
      shareOnWhatsApp,
      shareViaEmail,
      shareOnLinkedIn,
      copyToClipboard,
    ]
  );

  /**
   * Get recommended share platforms based on content type
   */
  const getSharePlatforms = useCallback(
    (contentType: 'music' | 'artist' | 'blog' | 'studio' = 'music') => {
      return sharingConfig[contentType]?.platforms || [];
    },
    []
  );

  /**
   * Generate social share message based on content type
   */
  const generateShareMessage = useCallback(
    (
      contentType: 'music' | 'artist' | 'blog' | 'studio' = 'music',
      data: Record<string, string> = {}
    ) => {
      const config = sharingConfig[contentType];
      if (!config) return '';

      let message = config.title;

      // Replace template variables
      for (const [key, value] of Object.entries(data)) {
        message = message.replace(`{${key}}`, value);
      }

      return message;
    },
    []
  );

  return {
    isNativeShareAvailable,
    shareUrl,
    copyToClipboard,
    shareOnTwitter,
    shareOnFacebook,
    shareOnWhatsApp,
    shareViaEmail,
    shareOnLinkedIn,
    shareOn,
    getSharePlatforms,
    generateShareMessage,
  };
};

export default useSocialShare;
