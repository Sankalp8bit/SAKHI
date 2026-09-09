import { CraftCategory } from '../types';

export interface CatalogInput {
  name: string;
  category: CraftCategory;
  materials: string;
  location: string;
  rawDescription: string;
  basePrice: number;
  artisanName: string;
}

export interface GeneratedCatalog {
  enhancedTitle: string;
  marketingDescription: string;
  tags: string[];
  targetMarkets: string[];
  targetCustomers: string[];
  suggestedRetailPrice: { min: number; max: number; bulkWholesale: number };
  sustainabilityHighlights: string[];
}

export function generateSmartCatalog(input: CatalogInput): GeneratedCatalog {
  const cleanName = input.name.trim() || 'Artisanal Craft Product';
  const materials = input.materials.trim() || 'Natural artisanal materials';
  const location = input.location.trim() || 'India';
  const artisanName = input.artisanName.trim() || 'Skilled Women Artisan';
  const rawNotes = input.rawDescription.trim() || 'Handmade item created with traditional craft techniques.';
  const basePrice = Number(input.basePrice) || 350;

  // Specific check for Bamboo / Basket
  const isBamboo = input.category === 'Bamboo crafts' || cleanName.toLowerCase().includes('bamboo');
  const isTextile = input.category === 'Textiles' || input.category === 'Embroidery';
  const isPottery = input.category === 'Pottery';

  let enhancedTitle = '';
  let marketingDescription = '';
  let tags: string[] = [];
  let targetMarkets: string[] = [];
  let targetCustomers: string[] = [];

  if (isBamboo) {
    enhancedTitle = cleanName.toLowerCase().includes('handcrafted') 
      ? cleanName 
      : `${cleanName.replace(/basket/i, '').trim()} Handcrafted Storage Basket`.replace(/\s+/g, ' ').trim();
    if (!enhancedTitle.toLowerCase().includes('bamboo')) {
      enhancedTitle = `Bamboo ${enhancedTitle}`;
    }

    marketingDescription = `Handwoven bamboo basket made by a skilled artisan from ${location}. Designed for sustainable home storage and everyday use. Crafted using seasoned organic bamboo fibers, this piece brings natural warmth and eco-conscious minimalism to any modern living space.`;

    tags = ['Handmade', 'Bamboo Craft', 'Eco Friendly', 'Women Artisan', 'Zero Plastic', 'Sustainable Living'];
    targetMarkets = ['Home Decor', 'Eco-friendly Products', 'Corporate Gifting', 'Boutique Lifestyle Stores'];
    targetCustomers = ['Conscious Homeowners', 'Zero-Waste Enthusiasts', 'Corporate Gift Buyers', 'Interior Decorators'];
  } else if (isTextile) {
    enhancedTitle = `Artisanal Handwoven ${cleanName}`;
    marketingDescription = `Exquisite heirloom textile handcrafted by ${artisanName} in ${location}. Featuring traditional hand-loom weaving and pure ${materials}, celebrating generations of slow sustainable fashion and ethical artisan livelihoods.`;
    tags = ['Handloom', 'Textile Heritage', 'Slow Fashion', 'Women Artisan', 'Fair Trade'];
    targetMarkets = ['Sustainable Fashion Boutiques', 'Export Handlooms', 'Ethical Retail Platforms'];
    targetCustomers = ['Artisan Fashion Enthusiasts', 'Conscious Wardrobe Curators', 'Eco Stylists'];
  } else if (isPottery) {
    enhancedTitle = `Earth-Fired Terracotta ${cleanName}`;
    marketingDescription = `Wheel-thrown natural terracotta craft created by ${artisanName} in ${location}. Free from artificial synthetic glazes, allowing natural breathability and bringing earthy Indian heritage to festive celebrations and everyday home corners.`;
    tags = ['Terracotta', 'Earth Friendly', 'Clay Pottery', 'Handmade in India', 'Cultural Craft'];
    targetMarkets = ['Home & Garden Retail', 'Festive Gift Hampers', 'Urban Lifestyle Studios'];
    targetCustomers = ['Plant Lovers', 'Home Decorators', 'Cultural Heritage Collectors'];
  } else {
    enhancedTitle = `Artisanal Handcrafted ${cleanName}`;
    marketingDescription = `Lovingly created by master artisan ${artisanName} in ${location}. Fashioned with genuine ${materials}, each piece reflects hours of intricate manual dexterity and sustainable grassroots entrepreneurship. ${rawNotes}`;
    tags = ['Handcrafted', 'Authentic Indian Craft', 'Women Artisan', 'Eco Conscious', 'Direct from Artisan'];
    targetMarkets = ['Specialty Craft Exhibitions', 'Conscious E-Commerce', 'Bespoke Gifting'];
    targetCustomers = ['Craft Appreciators', 'Conscious Consumers', 'Corporate Impact Buyers'];
  }

  const suggestedRetailPrice = {
    min: Math.round(basePrice * 1.35),
    max: Math.round(basePrice * 1.75),
    bulkWholesale: Math.round(basePrice * 1.15)
  };

  const sustainabilityHighlights = [
    '100% Biodegradable / Zero Synthetic Microplastics',
    'Low Carbon Footprint: Manually Crafted without Heavy Machinery',
    'Direct Livelihood Impact: 80%+ value stays directly with the woman artisan'
  ];

  return {
    enhancedTitle,
    marketingDescription,
    tags,
    targetMarkets,
    targetCustomers,
    suggestedRetailPrice,
    sustainabilityHighlights
  };
}
