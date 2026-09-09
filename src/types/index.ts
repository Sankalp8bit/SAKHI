export type CraftCategory = 
  | 'Handicrafts'
  | 'Bamboo crafts'
  | 'Textiles'
  | 'Pottery'
  | 'Jewelry'
  | 'Embroidery'
  | 'Food products'
  | 'Home decor'
  | 'Other';

export type HelpNeed = 
  | 'Customers'
  | 'New markets'
  | 'Funding'
  | 'Marketing'
  | 'Mentorship'
  | 'Digital catalog'
  | 'Pricing';

export interface ArtisanProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  phone: string;
  preferredLanguage: string;
  skills: CraftCategory[];
  businessName: string;
  experienceYears: number;
  monthlyIncome: string;
  productCount: number;
  currentSellingMethod: string;
  needs: HelpNeed[];
  avatar?: string;
  story?: string;
  badge?: string;
}

export interface Product {
  id: string;
  artisanId: string;
  artisanName: string;
  artisanLocation: string;
  title: string;
  category: CraftCategory;
  price: number;
  materials: string;
  description: string;
  tags: string[];
  targetMarkets: string[];
  targetCustomers: string[];
  image: string;
  isPublished: boolean;
  createdAt: string;
  rating?: number;
  reviewCount?: number;
}

export interface MarketOpportunity {
  id: string;
  title: string;
  category: string;
  matchScore: number;
  demandLevel: 'High' | 'Very High' | 'Growing';
  avgOrderValue: string;
  description: string;
  buyerType: 'Corporate' | 'B2B Retailer' | 'Online Marketplace' | 'Export House';
  rationale: string[];
  tags: string[];
}

export interface FundingOpportunity {
  id: string;
  name: string;
  schemeType: 'Government Scheme' | 'Micro Enterprise MUDRA' | 'NABARD Scheme' | 'CSR Impact Grant';
  amountRange: string;
  matchScore: number;
  purpose: string;
  eligibility: string[];
  interestRate: string;
  keyBenefits: string[];
  applicationStatus?: 'Eligible' | 'Applied' | 'In Review';
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  organization: string;
  expertise: string[];
  experienceYears: number;
  bio: string;
  languages: string[];
  rating: number;
  reviewsCount: number;
  matchScore: number;
  avatar: string;
  availability: string;
  isRequested?: boolean;
}

export type PageRoute = 
  | 'landing'
  | 'onboarding'
  | 'dashboard'
  | 'smart-catalog'
  | 'marketplace'
  | 'funding'
  | 'mentorship'
  | 'artisan-profile';
