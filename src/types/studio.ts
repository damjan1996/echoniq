import { Image, SocialLinks } from './common';
// Removed unused import: SEO

export interface StudioRoom {
  id: string;
  name: string;
  description: string;
  images: Image[];
  features: string[];
  size: {
    width: number;
    length: number;
    height: number;
    unit: 'm' | 'ft';
  };
  capacity: number;
  acousticTreatment?: string;
  availability?: {
    weekdays: string; // e.g. "9:00 - 22:00"
    weekends: string; // e.g. "10:00 - 20:00"
    holidays?: string;
  };
  hourlyRate?: number;
  halfDayRate?: number;
  fullDayRate?: number;
}

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  brand: string;
  model: string;
  description: string;
  image?: string;
  specifications?: string[];
  yearAcquired?: number;
  rentalAvailable?: boolean;
  rentalRate?: number;
  rentalPeriod?: 'hour' | 'day' | 'week';
}

export type EquipmentCategory =
  | 'microphone'
  | 'preamp'
  | 'mixer'
  | 'interface'
  | 'converter'
  | 'monitor'
  | 'headphone'
  | 'effect'
  | 'instrument'
  | 'software'
  | 'outboard'
  | 'accessory'
  | 'other';

export interface StudioService {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  features: string[];
  price: number;
  priceUnit: 'hour' | 'day' | 'project' | 'track';
  estimatedDuration?: string;
  image?: string;
  popular?: boolean;
  requirements?: string[];
  deliverables?: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface StudioPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: string; // e.g. "8 hours", "3 days"
  features: string[];
  services: string[]; // service IDs
  image?: string;
  popular?: boolean;
  discount?: number; // percentage discount compared to booking services separately
}

export interface StudioSession {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceId?: string;
  packageId?: string;
  roomId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  totalPrice: number;
  deposit?: number;
  depositPaid?: boolean;
  remainingBalance?: number;
  equipmentRequested?: string[]; // equipment IDs
  engineerRequested?: string; // engineer ID
  specialRequirements?: string;
}

export interface StudioEngineer {
  id: string;
  name: string;
  specialties: string[];
  bio: string;
  image?: string;
  socialLinks?: SocialLinks;
  availability?: {
    weekdays: string;
    weekends: string;
  };
  hourlyRate?: number;
  languages?: string[];
  credits?: Array<{
    artist: string;
    project: string;
    role: string;
    year: number;
  }>;
}

export interface StudioBookingAvailability {
  date: string;
  slots: Array<{
    id: string;
    startTime: string;
    endTime: string;
    available: boolean;
    roomId: string;
  }>;
}

export interface StudioTestimonial {
  id: string;
  clientName: string;
  clientRole?: string;
  clientImage?: string;
  text: string;
  rating: number; // 1-5
  date: string;
  project?: string;
  featured?: boolean;
  socialLink?: string;
}

export interface StudioGalleryItem {
  id: string;
  title: string;
  description?: string;
  image: Image;
  category: 'room' | 'equipment' | 'session' | 'artist';
  featured?: boolean;
}

export interface StudioFAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}
