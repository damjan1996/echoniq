export interface Image {
  id?: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
  credit?: string;
  blurDataUrl?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  spotify?: string;
  appleMusic?: string;
  soundcloud?: string;
  bandcamp?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
  linkedIn?: string;
  email?: string;
}

export interface SEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  robots?: string;
  jsonLd?: string | Record<string, unknown>;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  isExternal?: boolean;
  children?: MenuItem[];
  featured?: boolean;
}

export interface NavigationItem extends MenuItem {
  isActive?: boolean;
}

export interface Breadcrumb {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ContactInfo {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  latitude?: number;
  longitude?: number;
}

export interface MetaData {
  [key: string]: string | number | boolean | null | undefined;
}

export type SortDirection = 'asc' | 'desc';

export type SortOrder = {
  field: string;
  direction: SortDirection;
};

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface Dimensions {
  width: number;
  height: number;
}

export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
  dimensions?: Dimensions;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  read: boolean;
  url?: string;
}
