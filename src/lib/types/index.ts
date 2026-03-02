export interface Wine {
  id: string;
  sku: string;
  name: string;
  vintage: number;
  type: 'red' | 'white' | 'rose' | 'sparkling' | 'gift-card';
  body: 'light' | 'medium' | 'full';
  sweetness: 'dry' | 'off-dry' | 'sweet';
  price: number;
  memberPrice: number;
  description: string;
  tastingNotes: string;
  foodPairings: string[];
  image: string | null;
  badges: ('club-exclusive' | 'new-release' | 'limited')[];
  inStock: boolean;
  inventoryCount?: number;
  vinoshipperUrl?: string;
  clubOnly?: boolean;
}

export interface Experience {
  id: string;
  serviceVariationId: string; // Square API compatible
  name: string;
  subtitle: string;
  price: number;
  memberPrice: number;
  duration: string;
  description: string;
  includes: string[];
  image: string | null;
  maxGuests: number;
}

export interface TimeSlot {
  id: string;
  startAt: string; // ISO datetime - Square API compatible
  spotsLeft: number;
  maxSpots: number;
}

export interface BookingFormData {
  experienceId: string;
  date: string;
  timeSlotId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guests: number;
  notes?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  price: number;
  description: string;
  longDescription: string;
  image: string | null;
  capacity: number;
  spotsLeft: number;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tier: 'classic' | 'collection';
  joinDate: string;
  nextShipment: {
    date: string;
    wines: { name: string; type: string }[];
    status: 'preparing' | 'shipped' | 'delivered';
  };
  orderHistory: {
    id: string;
    date: string;
    total: number;
    items: number;
  }[];
  benefits: {
    discount: number;
    freeTaskings: number;
    freeGuests: number;
    vipEvents: boolean;
  };
}

export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: 'finger-lakes-guide' | 'french-winemaking' | 'experience' | 'seasonal' | 'wine-education';
  image: string | null;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  relatedSlugs: string[];
}
