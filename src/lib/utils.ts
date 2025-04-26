// src/lib/utils.ts
import { ClassValue, clsx } from 'clsx';
import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

import { DATE_FORMAT } from './constants';

/**
 * Combines class names with tailwind merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string using date-fns
 */
export function formatDate(
  dateString: string | Date,
  formatStr: string = DATE_FORMAT.FULL
): string {
  if (!dateString) return '';

  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return format(date, formatStr, { locale: de });
}

/**
 * Truncates a string to the specified maximum length
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Generates a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Formats a duration in seconds to MM:SS format
 */
export function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Formats a file size in bytes to a human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Generates an array of page numbers for pagination
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): (number | null)[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const halfVisible = Math.floor(maxVisible / 2);
  let startPage = Math.max(currentPage - halfVisible, 1);
  const endPage = Math.min(startPage + maxVisible - 1, totalPages);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(endPage - maxVisible + 1, 1);
  }

  const pages: (number | null)[] = [];

  // Add first page and ellipsis if needed
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) pages.push(null); // ellipsis
  }

  // Add visible page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add ellipsis and last page if needed
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pages.push(null); // ellipsis
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Debounces a function - simplified version for better compatibility
 */
export function debounce(
  func: (...args: unknown[]) => unknown,
  wait = 300
): (...args: unknown[]) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: unknown[]): void {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args); // Using spread operator instead of .apply()
      timeout = null;
    }, wait);
  };
}

/**
 * Throttles a function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generates a random string of the specified length
 */
export function generateRandomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * Generates a URL-friendly random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export function getYoutubeVideoId(url: string): string | null {
  if (!url) return null;

  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[7].length === 11 ? match[7] : null;
}

/**
 * Creates a shareable URL for social media
 */
export function createShareUrl(platform: string, url: string, text?: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = text ? encodeURIComponent(text) : '';

  switch (platform.toLowerCase()) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'twitter':
    case 'x':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
    case 'telegram':
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'email':
      return `mailto:?subject=${encodedText}&body=${encodedUrl}`;
    default:
      return url;
  }
}

/**
 * Normalizes string for case-insensitive comparison
 */
export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str) as T;
  } catch (error) {
    return fallback;
  }
}

/**
 * Gets the file extension from a URL or filename
 */
export function getFileExtension(filename: string): string | null {
  if (!filename) return null;
  return filename.split('.').pop()?.toLowerCase() || null;
}

/**
 * Checks if a file type is an image
 */
export function isImageFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  return !!ext && ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext);
}

/**
 * Checks if a file type is an audio file
 */
export function isAudioFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  return !!ext && ['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(ext);
}

/**
 * Remove HTML tags from a string
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
}

/**
 * Converts an object to URL query parameters
 */
export function objectToQueryParams(obj: Record<string, unknown>): string {
  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}

/**
 * Get YouTube thumbnail URL from video ID
 */
export function getYoutubeThumbnail(
  videoId: string,
  quality: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'
): string {
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Calculate reading time for text content
 */
export function calculateReadingTime(text: string): number {
  if (!text) return 0;

  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}

/**
 * Check if a URL is external
 */
export function isExternalUrl(url: string): boolean {
  if (!url) return false;

  // If it's a relative URL
  if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('//')) {
    return false;
  }

  // Check if it's the same domain
  try {
    const domain = new URL(url).hostname;
    const currentDomain = window.location.hostname;
    return domain !== currentDomain;
  } catch (e) {
    return false;
  }
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  if (!name) return '';

  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}
