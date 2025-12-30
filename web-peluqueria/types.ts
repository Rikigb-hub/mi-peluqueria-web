
export type Role = 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
}

export interface AuthorizedAdmin {
  email: string;
  addedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  imageUrl: string;
  category: 'hair' | 'beard' | 'combo' | 'other';
}

export interface Appointment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceId: string;
  serviceName: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // HH:mm
  status: 'pending' | 'confirmed' | 'cancelled';
  price: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
}

export interface Testimonial {
  id: string;
  author: string;
  content: string;
  rating: number;
}

export interface DaySchedule {
  open: string;
  close: string;
  isOpen: boolean;
}

export interface BusinessHours {
  [key: number]: DaySchedule; // 0 for Sunday, 1 for Monday, etc.
}

export interface BrandConfig {
  logo?: string;
  salonName: string;
  address?: string;
  whatsapp?: string;
  mapUrl?: string;
  // Social
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  // UI Texts
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  aboutTitle?: string;
  aboutText?: string;
  servicesTitle?: string;
  aiTitle?: string;
  aiDescription?: string;
  galleryTitle?: string;
  footerDescription?: string;
  // Dynamic Content
  testimonials?: Testimonial[];
}
