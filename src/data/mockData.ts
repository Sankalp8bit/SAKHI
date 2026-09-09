import { ArtisanProfile, Product, MarketOpportunity, FundingOpportunity, Mentor } from '../types';

export const DEMO_LAKSHMI_PROFILE: ArtisanProfile = {
  id: 'artisan-lakshmi-01',
  name: 'Lakshmi Devi',
  age: 34,
  location: 'Warangal, Telangana',
  phone: '+91 98480 23456',
  preferredLanguage: 'Telugu & English',
  skills: ['Bamboo crafts', 'Handicrafts', 'Home decor'],
  businessName: 'Sri Lakshmi Natural Bamboo Weaves',
  experienceYears: 8,
  monthlyIncome: '₹8,000 - ₹12,000',
  productCount: 6,
  currentSellingMethod: 'Local weekly village haat & middlemen',
  needs: ['Customers', 'New markets', 'Funding', 'Marketing'],
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
  story: 'Lakshmi is a resilient single mother and master bamboo craftswoman from Warangal, Telangana. She creates intricate, eco-friendly storage baskets and home essentials using sustainably harvested local bamboo, keeping alive a 3-generation heritage craft.',
  badge: 'Verified Master Artisan'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    artisanId: 'artisan-lakshmi-01',
    artisanName: 'Lakshmi Devi',
    artisanLocation: 'Warangal, Telangana',
    title: 'Handwoven Natural Bamboo Fruit & Storage Basket',
    category: 'Bamboo crafts',
    price: 480,
    materials: '100% Seasoned Natural Bamboo, Vegetable Dye Lacquer',
    description: 'Traditional tight-weave storage basket handwoven with organic bamboo fibers. Designed for multi-purpose kitchen fruit storage, bread display, or minimalist living room organizing. 100% biodegradable and sturdy.',
    tags: ['Handmade', 'Bamboo Craft', 'Eco Friendly', 'Women Artisan', 'Zero Plastic'],
    targetMarkets: ['Home Decor', 'Eco-friendly Products', 'Corporate Gifting'],
    targetCustomers: ['Conscious Homeowners', 'Zero-Waste Enthusiasts', 'Eco Gift Shoppers'],
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800',
    isPublished: true,
    createdAt: '2026-09-01',
    rating: 4.9,
    reviewCount: 28
  },
  {
    id: 'prod-02',
    artisanId: 'artisan-lakshmi-01',
    artisanName: 'Lakshmi Devi',
    artisanLocation: 'Warangal, Telangana',
    title: 'Artisanal Bamboo Desk Organizer & Pen Stand',
    category: 'Home decor',
    price: 350,
    materials: 'Treated Forest Bamboo, Polished Brass Accents',
    description: 'Minimalist desktop accessory hand-carved to hold pens, stationery, and smartphones. Brings warmth and green sustainability to any modern office or study desk.',
    tags: ['Desk Decor', 'Sustainable Office', 'Handicraft', 'Bamboo'],
    targetMarkets: ['Corporate Gifting', 'Office Decor', 'Eco Boutiques'],
    targetCustomers: ['Office Workers', 'Corporate Buyers', 'Design Enthusiasts'],
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=800',
    isPublished: true,
    createdAt: '2026-09-03',
    rating: 4.8,
    reviewCount: 14
  },
  {
    id: 'prod-03',
    artisanId: 'artisan-sunita-02',
    artisanName: 'Sunita Devi',
    artisanLocation: 'Bagru, Rajasthan',
    title: 'Hand Block-Printed Dabu Indigo Cotton Throw',
    category: 'Textiles',
    price: 1250,
    materials: 'Organic Cotton, Natural Fermented Indigo Dye',
    description: 'Authentic Bagru mud-resist block printed textile created using wooden blocks carved with traditional floral motifs. Breathable, hypoallergenic, and gentle on sensitive skin.',
    tags: ['Hand Block Print', 'Dabu Indigo', 'Natural Dyes', 'Textile Art'],
    targetMarkets: ['Boutique Fashion', 'Export Handlooms', 'Luxury Sustainable Home'],
    targetCustomers: ['Artisan Fashion Lovers', 'Interior Designers', 'Conscious Shoppers'],
    image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=800',
    isPublished: true,
    createdAt: '2026-08-20',
    rating: 5.0,
    reviewCount: 42
  },
  {
    id: 'prod-04',
    artisanId: 'artisan-radhika-03',
    artisanName: 'Radhika Soren',
    artisanLocation: 'Bishnupur, West Bengal',
    title: 'Terracotta Hand-Painted Festive Diya & Planter Set',
    category: 'Pottery',
    price: 520,
    materials: 'Riverbank Terracotta Clay, Earth Pigments',
    description: 'Hand-thrown on a traditional potters wheel and fired with rice husk kilns. Features ancient folk engravings symbolizing fertility and harmony with nature.',
    tags: ['Terracotta', 'Clay Pottery', 'Festive', 'Home Garden'],
    targetMarkets: ['Festive Retail', 'Garden Decor', 'Cultural Boutiques'],
    targetCustomers: ['Home Decorators', 'Festive Shoppers', 'Plant Lovers'],
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
    isPublished: true,
    createdAt: '2026-08-25',
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: 'prod-05',
    artisanId: 'artisan-meera-04',
    artisanName: 'Meera Bai',
    artisanLocation: 'Kutch, Gujarat',
    title: 'Heirloom Suf Embroidery Mirror-Work Clutch',
    category: 'Embroidery',
    price: 1650,
    materials: 'Raw Silk, Silk Thread, Reflective Glass Mirrors',
    description: 'Detailed counted-thread geometric embroidery done completely by hand without any pre-drawn stencils. A celebration of Kutch pastoralist women folklore.',
    tags: ['Suf Embroidery', 'Mirror Work', 'Heirloom Craft', 'Handmade Bag'],
    targetMarkets: ['Ethnic Fashion', 'Bridal Gifting', 'Global Handcrafts'],
    targetCustomers: ['Fashion Curators', 'Wedding Planners', 'Craft Collectors'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    isPublished: true,
    createdAt: '2026-08-28',
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: 'prod-06',
    artisanId: 'artisan-parvati-05',
    artisanName: 'Parvati Kamble',
    artisanLocation: 'Kolhapur, Maharashtra',
    title: 'Upcycled Brass & Jute Statement Necklace',
    category: 'Jewelry',
    price: 780,
    materials: 'Repurposed Temple Bell Brass, Braided Golden Jute',
    description: 'Hand-hammered brass medallion linked to artisanal jute chords. Highlighting circular sustainable fashion while providing livelihood to rural silversmith daughters.',
    tags: ['Upcycled Jewelry', 'Boho Chic', 'Sustainable Fashion', 'Brass'],
    targetMarkets: ['Fair Trade Boutiques', 'Indie Fashion', 'College Youth'],
    targetCustomers: ['Modern Youth', 'Fair Trade Buyers', 'Stylists'],
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    isPublished: true,
    createdAt: '2026-09-02',
    rating: 4.8,
    reviewCount: 22
  }
];

export const MOCK_ARTISANS = [
  {
    id: 'artisan-lakshmi-01',
    name: 'Lakshmi Devi',
    location: 'Warangal, Telangana',
    craft: 'Natural Bamboo Weaving & Basketry',
    experience: '8 years',
    story: 'After becoming a single mother, Lakshmi transformed her family craft into a livelihood initiative that now trains 12 other young women in her village.',
    productsCount: 6,
    impact: 'Trained 12 rural women, 100% plastic-free products',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'artisan-sunita-02',
    name: 'Sunita Devi',
    location: 'Bagru, Rajasthan',
    craft: 'Natural Dabu & Indigo Textile Printing',
    experience: '14 years',
    story: 'Preserving the heritage of 300-year-old natural mud-resist indigo printing, keeping chemical effluents out of Rajasthan waterways.',
    productsCount: 9,
    impact: 'Zero toxic chemicals used, supports 8 artisan families',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'artisan-radhika-03',
    name: 'Radhika Soren',
    location: 'Bishnupur, West Bengal',
    craft: 'Terracotta Pottery & Clay Sculpting',
    experience: '11 years',
    story: 'Radhika creates earth-friendly terracotta pottery inspired by the famous 17th-century terracotta temples of Bengal.',
    productsCount: 5,
    impact: 'Eco-friendly alternative to plastic planters & tableware',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  }
];

export const MOCK_MARKET_OPPORTUNITIES: MarketOpportunity[] = [
  {
    id: 'mkt-01',
    title: 'Eco-Friendly Corporate Gifting Packages',
    category: 'Corporate Gifting',
    matchScore: 91,
    demandLevel: 'Very High',
    avgOrderValue: '₹45,000 - ₹1,20,000 per order',
    description: 'Top IT and corporate enterprises in Hyderabad and Bangalore are mandating zero-plastic sustainable gifting hampers for festive and annual conferences.',
    buyerType: 'Corporate',
    rationale: [
      'High synergy with Bamboo Crafts and natural materials',
      'Artisan selected "New markets" and "Customers" support needs',
      'Bulk purchase potential with upfront 50% purchase advance'
    ],
    tags: ['Zero Plastic', 'Festive Hampers', 'Corporate ESG', 'Pre-Orders']
  },
  {
    id: 'mkt-02',
    title: 'Urban Organic & Sustainable Home Decor Retailers',
    category: 'Home Decor',
    matchScore: 88,
    demandLevel: 'High',
    avgOrderValue: '₹20,000 - ₹60,000',
    description: 'Curated lifestyle boutique stores in metropolitan cities seeking direct-from-artisan minimalist storage baskets and earthy table accessories.',
    buyerType: 'B2B Retailer',
    rationale: [
      'Direct match with product category "Home decor"',
      'Higher profit margins (40-55%) compared to local middlemen',
      'Ongoing repeat seasonal contracts'
    ],
    tags: ['Boutique Stores', 'Sustainable Living', 'High Margin']
  },
  {
    id: 'mkt-03',
    title: 'State Handicrafts Export Cluster Exhibition (T-Hunar)',
    category: 'Handicrafts',
    matchScore: 83,
    demandLevel: 'High',
    avgOrderValue: '₹35,000 - ₹90,000',
    description: 'Government-sponsored artisan pavilion connecting rural clusters directly with international buyers and trade consulates.',
    buyerType: 'Export House',
    rationale: [
      'Artisans based in Telangana receive 80% stall subsidy',
      'Direct GI/Handloom board facilitation'
    ],
    tags: ['Government Pavilion', 'Export Sourcing', 'Stall Subsidy']
  },
  {
    id: 'mkt-04',
    title: 'Zero-Waste Direct-to-Consumer Digital Platforms',
    category: 'E-commerce',
    matchScore: 78,
    demandLevel: 'Growing',
    avgOrderValue: '₹5,000 - ₹15,000 / week',
    description: 'Online conscious consumer marketplaces curating plastic-free kitchenware, bath organizers, and everyday bamboo crafts.',
    buyerType: 'Online Marketplace',
    rationale: [
      'Fulfills requirement for "Digital catalog" and direct customer reach',
      'National delivery integration handled by platform partners'
    ],
    tags: ['D2C', 'Weekly Payouts', 'Digital Footprint']
  }
];

export const MOCK_FUNDING_OPPORTUNITIES: FundingOpportunity[] = [
  {
    id: 'fnd-01',
    name: 'Micro Enterprise Expansion (PMMY MUDRA - Kishore)',
    schemeType: 'Micro Enterprise MUDRA',
    amountRange: '₹50,000 - ₹5,00,000',
    matchScore: 87,
    purpose: 'Working capital and tools procurement for expanding production scale from home-unit to micro-workshop.',
    eligibility: [
      'Engaged in craft manufacturing or micro enterprise',
      'Valid Aadhaar and bank account',
      'Prior craft experience of >2 years'
    ],
    interestRate: '8.4% - 10.2% p.a. (Collateral-free)',
    keyBenefits: [
      'Zero collateral or third-party guarantee required',
      'Subsidized processing fees for women entrepreneurs',
      'Flexible 3 to 5 years repayment tenure'
    ],
    applicationStatus: 'Eligible'
  },
  {
    id: 'fnd-02',
    name: 'PM Vishwakarma Artisan Financial Support Scheme',
    schemeType: 'Government Scheme',
    amountRange: '₹15,000 Tool Kit + ₹1,00,000 (Tranche 1)',
    matchScore: 92,
    purpose: 'Skill up-gradation, modern tool-kit incentive, and concessional interest credit for traditional artisans.',
    eligibility: [
      'Practicing one of 18 traditional artisan trades (including Basket/Mat/Broom maker)',
      'Minimum age 18 years',
      'Not availed similar government credit in past 5 years'
    ],
    interestRate: '5.0% subsidized interest rate',
    keyBenefits: [
      'Free 5-day basic skill training with ₹500/day stipend',
      '₹15,000 digital voucher for advanced modern tools',
      'PM Vishwakarma Certificate & National ID Card'
    ],
    applicationStatus: 'Eligible'
  },
  {
    id: 'fnd-03',
    name: 'Stand-Up India Scheme for Women Entrepreneurs',
    schemeType: 'Government Scheme',
    amountRange: '₹10,00,000 - ₹1,00,00,000',
    matchScore: 81,
    purpose: 'Greenfield enterprise setup in manufacturing, processing, or trading sector for women-led ventures.',
    eligibility: [
      'Woman entrepreneur holding at least 51% stake',
      'Project must be greenfield/expansion project'
    ],
    interestRate: 'MCLR + 3% + Tenor Premium',
    keyBenefits: [
      'Handholding support through Lead District Managers',
      'Credit Guarantee Scheme coverage'
    ],
    applicationStatus: 'Eligible'
  },
  {
    id: 'fnd-04',
    name: 'NABARD Rural Women Artisan Development Fund (RWADF)',
    schemeType: 'NABARD Scheme',
    amountRange: '₹25,000 - ₹1,50,000 (Grant + Soft Loan)',
    matchScore: 89,
    purpose: 'Assistance for marketing infrastructure, raw material bank access, and local design intervention.',
    eligibility: [
      'Individual women artisans or SHG members in rural/semi-urban areas',
      'Engagement in indigenous art/craft'
    ],
    interestRate: '0% grant portion + 4% soft revolving fund',
    keyBenefits: [
      'Bulk raw material procurement discount',
      'Free stall allocation at regional Gram Mela fairs'
    ],
    applicationStatus: 'Eligible'
  }
];

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'mnt-01',
    name: 'Ananya Rao',
    role: 'Head of Brand Strategy & D2C Growth',
    organization: 'CraftRoots Collective (Ex-FabIndia)',
    expertise: ['Digital Marketing', 'Branding', 'Social Media', 'Storytelling'],
    experienceYears: 12,
    bio: 'Passionate champion of Indian indigenous craft heritage. Helped over 80 rural artisan collectives establish direct Instagram and marketplace presence, increasing their net earnings by 240%.',
    languages: ['Telugu', 'Hindi', 'English'],
    rating: 4.95,
    reviewsCount: 38,
    matchScore: 94,
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    availability: 'Available this week (2 slots open)'
  },
  {
    id: 'mnt-02',
    name: 'Rajeshwari Iyer',
    role: 'Senior Handicrafts Merchandiser & Pricing Strategist',
    organization: 'Dakshin Heritage Guild',
    expertise: ['Product Pricing', 'E-commerce', 'Cost Accounting', 'Packaging'],
    experienceYears: 15,
    bio: 'Specialist in fair craft valuation and unit economics. Guides artisans on separating raw material, labor hour wages, and healthy markup so they stop selling at under-market prices to intermediaries.',
    languages: ['Tamil', 'Telugu', 'English'],
    rating: 4.88,
    reviewsCount: 29,
    matchScore: 89,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    availability: 'Available on weekends'
  },
  {
    id: 'mnt-03',
    name: 'Vikramaditya Sethi',
    role: 'Corporate Procurement Director',
    organization: 'SustainB2B Network',
    expertise: ['Business Planning', 'Corporate Gifting', 'New markets', 'Quality Standards'],
    experienceYears: 11,
    bio: 'Connects corporate ESG budgets with authentic grassroots craft enterprises. Advises on bulk production timelines, batch quality consistency, and GST invoicing.',
    languages: ['Hindi', 'English'],
    rating: 4.82,
    reviewsCount: 22,
    matchScore: 86,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    availability: 'Available next Tuesday'
  },
  {
    id: 'mnt-04',
    name: 'Dr. Pooja Sharma',
    role: 'Rural Microfinance & SHG Capacity Builder',
    organization: 'Umeed Micro Livelihoods',
    expertise: ['Finance', 'Entrepreneurship', 'MUDRA Loans', 'Bookkeeping'],
    experienceYears: 14,
    bio: 'Dedicated to financial empowerment for women micro-entrepreneurs. Mentors on simple smartphone bookkeeping, bank loan documentation, and working capital cash flow management.',
    languages: ['Hindi', 'English', 'Marathi'],
    rating: 4.91,
    reviewsCount: 45,
    matchScore: 82,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    availability: 'Available on Friday'
  }
];
