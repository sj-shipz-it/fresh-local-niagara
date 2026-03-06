export interface Purveyor {
  id: number;
  name: string;
  category: CategoryId;
  city: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  hours: string;
  lat: number;
  lng: number;
  tags: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  googleMapsUrl?: string; // Direct link to Google Maps listing / reviews
  verified?: boolean; // false = flagged for review; omit when unset
}

export type CategoryId =
  | 'all'
  | 'farm-stands'
  | 'cheese'
  | 'butcher-meats'
  | 'bakeries'
  | 'orchards-upick'
  | 'maple-honey'
  | 'specialty'
  | 'markets';

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export type SortOption = 'featured' | 'rating' | 'reviews' | 'name' | 'distance';

export interface LocalComment {
  purveyorId: number;
  comment: string;
  date: string;
  name: string;
}

export interface ListingImprovement {
  purveyorId: number;
  purveyorName: string;
  field: string;
  currentValue: string;
  suggestedValue: string;
  submitterName: string;
  date: string;
}

export interface ListingClaim {
  purveyorId: number;
  purveyorName: string;
  ownerName: string;
  ownerRole: string;
  email: string;
  date: string;
  status: 'pending';
}

export interface UserLocation {
  lat: number;
  lng: number;
}
