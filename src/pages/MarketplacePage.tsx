import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Star, 
  MapPin, 
  ShieldCheck, 
  X, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink,
  Package,
  Award,
  Users
} from 'lucide-react';
import { CraftCategory, Product } from '../types';
import { MOCK_ARTISANS } from '../data/mockData';

const MARKETPLACE_CATEGORIES: (CraftCategory | 'All')[] = [
  'All',
  'Bamboo crafts',
  'Textiles',
  'Pottery',
  'Jewelry',
  'Embroidery',
  'Handicrafts',
  'Home decor',
  'Food products'
];

export const MarketplacePage: React.FC = () => {
  const { 
    products, 
    selectedProductId, 
    setSelectedProductId, 
    selectedArtisanId, 
    setSelectedArtisanId,
    setCurrentRoute
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<CraftCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(() => {
    if (selectedProductId) {
      return products.find(p => p.id === selectedProductId) || null;
    }
    return null;
  });

  const [connectModalArtisan, setConnectModalArtisan] = useState<{ name: string; craft: string } | null>(null);
  const [connectInquirySent, setConnectInquirySent] = useState(false);
  const [inquiryType, setInquiryType] = useState('Bulk / Corporate Gifting Order');
  const [inquiryMessage, setInquiryMessage] = useState('Hello Lakshmi, I am looking to purchase 50 units of your handcrafted bamboo baskets for a conference hamper.');

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materials.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artisanLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleOpenProduct = (product: Product) => {
    setActiveProductModal(product);
    setSelectedProductId(product.id);
  };

  const handleOpenConnect = (artisanName: string, craft: string) => {
    setConnectModalArtisan({ name: artisanName, craft });
    setConnectInquirySent(false);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setConnectInquirySent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Marketplace Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#80182C] bg-[#FAF0E6] px-3.5 py-1 rounded-full border border-[#E8CEBF]">
            Ethical Direct-from-Artisan Marketplace
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#2B1015]">
            Handcrafted with Heritage. Sold with Dignity.
          </h1>
          <p className="text-sm text-[#7A6763] leading-relaxed">
            Every product on SAKHI is crafted by verified women artisans and grassroots micro-entrepreneurs. 100% of the sale price goes directly to supporting their livelihoods.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#E8DFD3] shadow-xs space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#7A6763] absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search handcrafted products, artisans, materials (e.g. Bamboo, Indigo, Warangal)..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015] bg-[#FAF8F5]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs text-[#7A6763] hover:text-[#2B1015]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {MARKETPLACE_CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    isSelected 
                      ? 'bg-[#80182C] text-white shadow-xs' 
                      : 'bg-[#FAF8F5] text-[#5C4D49] hover:bg-[#F3EDE6] border border-[#E8DFD3]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-black text-[#2B1015]">
              Featured Artisan Creations ({filteredProducts.length})
            </h2>
            <span className="text-xs text-[#7A6763]">
              Showing authentic handcrafted goods
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DFD3] space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#A89895] mx-auto" />
              <h3 className="text-base font-bold text-[#2B1015]">No products found</h3>
              <p className="text-xs text-[#7A6763]">
                Try adjusting your search query or switching categories.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-[#E8DFD3] overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  {/* Image & Badges */}
                  <div className="relative h-56 overflow-hidden bg-[#F0E6DA]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Women Artisan Badge */}
                    <span className="absolute top-3 left-3 text-[10px] font-bold bg-[#80182C] text-white px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-amber-300" />
                      Women Artisan
                    </span>

                    <span className="absolute bottom-3 left-3 text-[10px] font-bold bg-[#2B1015]/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md">
                      {product.category}
                    </span>

                    {product.rating && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold bg-white/95 text-[#2B1015] px-2 py-1 rounded-full shadow-xs flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {product.rating}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Artisan Mini Bar */}
                      <div className="flex items-center justify-between text-xs text-[#7A6763] mb-1.5">
                        <button
                          onClick={() => {
                            setSelectedArtisanId(product.artisanId);
                            setCurrentRoute('artisan-profile');
                          }}
                          className="font-semibold text-[#80182C] hover:underline flex items-center gap-1 cursor-pointer"
                          title="View Artisan Profile"
                        >
                          <Users className="w-3 h-3 text-[#80182C]" />
                          <span>{product.artisanName}</span>
                        </button>
                        <span className="flex items-center gap-0.5 text-[11px]">
                          <MapPin className="w-3 h-3 text-[#7A6763]" />
                          {product.artisanLocation}
                        </span>
                      </div>

                      <h3 
                        onClick={() => handleOpenProduct(product)}
                        className="text-base font-bold text-[#2B1015] hover:text-[#80182C] cursor-pointer line-clamp-1 transition"
                      >
                        {product.title}
                      </h3>

                      <p className="text-xs text-[#5C4D49] line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {product.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] font-medium bg-[#FAF8F5] text-[#7A6763] px-2 py-0.5 rounded border border-[#E8DFD3]">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Price & Action */}
                    <div className="pt-4 border-t border-[#F0E6DA] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#7A6763]">Direct Price</span>
                        <div className="text-lg font-serif font-black text-[#80182C]">
                          ₹{product.price}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenProduct(product)}
                          className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F3EDE6] text-[#2B1015] border border-[#D9CBBF] font-semibold text-xs rounded-xl transition cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleOpenConnect(product.artisanName, product.category)}
                          className="px-3 py-1.5 bg-[#80182C] hover:bg-[#681323] text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-2xs"
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: "Meet the Women Behind the Products" */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DFD3] shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#80182C] bg-[#FAF0E6] px-3.5 py-1 rounded-full border border-[#E8CEBF]">
              Impact In Real Lives
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#2B1015] mt-2">
              Meet the Women Behind the Products
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6763] mt-1">
              Read the inspiring stories of master artisans forging financial independence and sustaining ancestral craft knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_ARTISANS.map(artisan => (
              <div 
                key={artisan.id}
                className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E8DFD3] flex flex-col justify-between space-y-4 hover:shadow-xs transition"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={artisan.avatar}
                      alt={artisan.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#80182C]/30 shadow-xs"
                    />
                    <div>
                      <h3 className="text-base font-bold text-[#2B1015]">{artisan.name}</h3>
                      <p className="text-xs text-[#7A6763] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#80182C]" />
                        {artisan.location}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-[#80182C] mb-2">
                    {artisan.craft} • {artisan.experience} exp
                  </div>

                  <p className="text-xs text-[#5C4D49] leading-relaxed italic">
                    "{artisan.story}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DFD3] flex items-center justify-between">
                  <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {artisan.impact}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedArtisanId(artisan.id);
                        setCurrentRoute('artisan-profile');
                      }}
                      className="text-xs font-semibold text-[#7A6763] hover:text-[#80182C] cursor-pointer"
                    >
                      View Profile
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => handleOpenConnect(artisan.name, artisan.craft)}
                      className="text-xs font-bold text-[#80182C] hover:underline cursor-pointer"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Product Detail Modal */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD3] space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-[#F0E6DA] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#80182C] bg-[#FAF0E6] px-3 py-1 rounded-full border border-[#E8CEBF]">
                Authentic Craft Detail
              </span>
              <button
                onClick={() => setActiveProductModal(null)}
                className="p-1 rounded-lg text-[#7A6763] hover:bg-[#FAF8F5] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="h-64 rounded-2xl overflow-hidden bg-[#F0E6DA]">
                <img
                  src={activeProductModal.image}
                  alt={activeProductModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-[#7A6763]">
                  <MapPin className="w-3.5 h-3.5 text-[#80182C]" />
                  <span>{activeProductModal.artisanLocation}</span>
                </div>
                <h3 className="text-xl font-serif font-black text-[#2B1015]">
                  {activeProductModal.title}
                </h3>
                <div className="text-2xl font-serif font-black text-[#80182C]">
                  ₹{activeProductModal.price}
                </div>
                <div className="text-xs text-[#5C4D49]">
                  <strong>Materials:</strong> {activeProductModal.materials}
                </div>
                <div className="text-xs text-[#5C4D49]">
                  <strong>Artisan:</strong> {activeProductModal.artisanName}
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {activeProductModal.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-semibold bg-[#FAF8F5] text-[#80182C] px-2 py-0.5 rounded border border-[#E8CEBF]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8DFD3] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A6763]">
                Story & Craft Description
              </h4>
              <p className="text-xs sm:text-sm text-[#423330] leading-relaxed">
                {activeProductModal.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedArtisanId(activeProductModal.artisanId);
                  setActiveProductModal(null);
                  setCurrentRoute('artisan-profile');
                }}
                className="px-5 py-3 bg-[#FAF8F5] hover:bg-[#F3EDE6] text-[#2B1015] border border-[#D9CBBF] font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#80182C]" />
                <span>View {activeProductModal.artisanName.split(' ')[0]}'s Profile</span>
              </button>

              <button
                onClick={() => {
                  const artisan = activeProductModal.artisanName;
                  const craft = activeProductModal.category;
                  setActiveProductModal(null);
                  handleOpenConnect(artisan, craft);
                }}
                className="flex-1 py-3 bg-[#80182C] hover:bg-[#681323] text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Connect Directly</span>
              </button>

              <button
                onClick={() => setActiveProductModal(null)}
                className="px-5 py-3 bg-white border border-[#D9CBBF] text-[#423330] font-semibold rounded-xl text-xs sm:text-sm transition cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Connect with Artisan Modal */}
      {connectModalArtisan && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD3] space-y-5 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-[#F0E6DA] pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#80182C]" />
                <h3 className="text-lg font-bold text-[#2B1015]">
                  Connect with {connectModalArtisan.name}
                </h3>
              </div>
              <button
                onClick={() => setConnectModalArtisan(null)}
                className="p-1 rounded-lg text-[#7A6763] hover:bg-[#FAF8F5] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {connectInquirySent ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-serif font-black text-[#2B1015]">
                  Inquiry Dispatched!
                </h4>
                <p className="text-xs text-[#5C4D49] max-w-sm mx-auto leading-relaxed">
                  Your message has been queued for <strong>{connectModalArtisan.name}</strong>. SAKHI bridges customer orders directly to artisans via SMS audio-prompting and verified coordinator networks.
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFD3] text-[11px] text-[#7A6763]">
                  <strong>Prototype Status:</strong> Demonstration message recorded successfully. Zero platform fees are deducted from artisan sales.
                </div>
                <button
                  onClick={() => setConnectModalArtisan(null)}
                  className="w-full py-2.5 bg-[#80182C] text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#423330] uppercase mb-1">
                    Your Name or Organization *
                  </label>
                  <input
                    type="text"
                    defaultValue="Rajesh Kumar (EcoGifts India)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#423330] uppercase mb-1">
                    Inquiry Intent *
                  </label>
                  <select
                    value={inquiryType}
                    onChange={e => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015] bg-white"
                  >
                    <option value="Bulk / Corporate Gifting Order">Bulk / Corporate Gifting Order</option>
                    <option value="Custom Retail Order">Custom Retail Order</option>
                    <option value="Exhibition / Store Consignment">Exhibition / Store Consignment</option>
                    <option value="Artisan Partnership / Feature">Artisan Partnership / Feature</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#423330] uppercase mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    rows={4}
                    value={inquiryMessage}
                    onChange={e => setInquiryMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-xs sm:text-sm text-[#2B1015]"
                    required
                  />
                </div>

                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                  🛡️ <strong>Fair Trade Guarantee:</strong> Direct buyer-artisan communication ensures fair unit pricing without exploitative haat middlemen.
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#80182C] hover:bg-[#681323] text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Direct Inquiry to {connectModalArtisan.name.split(' ')[0]}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
