import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Award, 
  ShieldCheck, 
  Star, 
  MessageSquare, 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  CheckCircle2, 
  Users, 
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { MOCK_ARTISANS, DEMO_LAKSHMI_PROFILE } from '../data/mockData';
import { Product } from '../types';

export const ArtisanProfilePage: React.FC = () => {
  const { 
    selectedArtisanId, 
    setCurrentRoute, 
    products, 
    setSelectedProductId,
    profile: currentProfile 
  } = useApp();

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryType, setInquiryType] = useState('Bulk / Corporate Gifting Order');
  const [inquiryNotes, setInquiryNotes] = useState('We are interested in sourcing handcrafted pieces for our annual ESG corporate gifts.');

  // Find the artisan by ID, defaulting to Lakshmi Devi
  const artisanData = MOCK_ARTISANS.find(a => a.id === selectedArtisanId) || {
    id: currentProfile?.id || 'artisan-lakshmi-01',
    name: currentProfile?.name || 'Lakshmi Devi',
    location: currentProfile?.location || 'Warangal, Telangana',
    craft: currentProfile?.skills.join(' • ') || 'Natural Bamboo Weaving & Basketry',
    experience: `${currentProfile?.experienceYears || 8} years`,
    story: currentProfile?.story || 'Lakshmi transformed traditional bamboo weaving into a community livelihood initiative that now trains other women in her village.',
    productsCount: currentProfile?.productCount || 6,
    impact: 'Trained 12 rural women, 100% plastic-free products',
    avatar: currentProfile?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
  };

  // Find all products created by this artisan
  const artisanProducts = products.filter(p => 
    p.artisanId === artisanData.id || 
    p.artisanName.toLowerCase().includes(artisanData.name.toLowerCase().split(' ')[0])
  );

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back navigation */}
        <button
          onClick={() => setCurrentRoute('marketplace')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A6763] hover:text-[#80182C] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        {/* Hero Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD3] shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FAF0E6]/60 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <img
                  src={artisanData.avatar}
                  alt={artisanData.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-[#FAF0E6] shadow-md"
                />
                <span className="absolute -bottom-2 -right-2 bg-[#80182C] text-white p-1.5 rounded-xl shadow-xs" title="Verified Artisan">
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#80182C] bg-[#FAF0E6] px-3 py-0.5 rounded-full border border-[#E8CEBF]">
                    Verified Master Artisan
                  </span>
                  <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Direct Producer
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2B1015]">
                  {artisanData.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#7A6763]">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#80182C]" />
                    {artisanData.location}
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-[#80182C]">{artisanData.craft}</span>
                  <span>•</span>
                  <span>{artisanData.experience} Experience</span>
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    🌱 {artisanData.impact}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => {
                  setInquiryModalOpen(true);
                  setInquirySent(false);
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#80182C] hover:bg-[#681323] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Connect with {artisanData.name.split(' ')[0]}</span>
              </button>

              <button
                onClick={() => setCurrentRoute('marketplace')}
                className="inline-flex items-center justify-center gap-2 bg-[#FAF8F5] hover:bg-[#F3EDE6] text-[#2B1015] border border-[#D9CBBF] px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#80182C]" />
                <span>Browse Products</span>
              </button>
            </div>
          </div>

          {/* Artisan Biography / Heritage Story */}
          <div className="mt-8 pt-6 border-t border-[#F0E6DA] grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#7A6763]">
                Artisan Story & Heritage
              </h3>
              <p className="text-sm text-[#423330] leading-relaxed italic">
                "{artisanData.story}"
              </p>
              <p className="text-xs text-[#5C4D49] leading-relaxed">
                By sourcing materials directly from sustainable agro-forest reserves and training single women in her village cluster, {artisanData.name.split(' ')[0]} preserves indigenous Indian craftsmanship while fostering economic resilience for the next generation.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8DFD3] space-y-3 text-xs">
              <h4 className="font-bold text-[#2B1015] uppercase text-[11px]">
                Artisan Credentials
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#7A6763]">Artisan Verification:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Aadhaar & Craft Verified
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7A6763]">Selling Through SAKHI:</span>
                  <span className="font-bold text-[#2B1015]">100% Direct to Artisan</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7A6763]">Customer Rating:</span>
                  <span className="font-bold text-[#80182C] flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    4.9 / 5.0 (42 orders)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Created by this Artisan */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#2B1015]">
                Creations by {artisanData.name} ({artisanProducts.length})
              </h2>
              <p className="text-xs text-[#7A6763] mt-0.5">
                Handmade pieces available for individual orders or corporate bulk inquiry.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisanProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-[#E8DFD3] overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div className="relative h-52 overflow-hidden bg-[#F0E6DA]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold bg-[#80182C] text-white px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-300" />
                    Women Artisan
                  </span>
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold bg-[#2B1015]/80 text-white px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setCurrentRoute('marketplace');
                      }}
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

                  <div className="pt-4 border-t border-[#F0E6DA] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#7A6763]">Direct Price</span>
                      <div className="text-lg font-serif font-black text-[#80182C]">
                        ₹{product.price}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setCurrentRoute('marketplace');
                      }}
                      className="px-4 py-1.5 bg-[#80182C] hover:bg-[#681323] text-white font-bold text-xs rounded-xl transition cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Connect with Artisan Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD3] space-y-5 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-[#F0E6DA] pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#80182C]" />
                <h3 className="text-lg font-bold text-[#2B1015]">
                  Send Inquiry to {artisanData.name}
                </h3>
              </div>
              <button
                onClick={() => setInquiryModalOpen(false)}
                className="p-1 rounded-lg text-[#7A6763] hover:bg-[#FAF8F5] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {inquirySent ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-serif font-black text-[#2B1015]">
                  Message Successfully Delivered!
                </h4>
                <p className="text-xs text-[#5C4D49] leading-relaxed">
                  Your inquiry has been relayed to <strong>{artisanData.name}</strong>. SAKHI bridges customer orders directly to artisans without commissions or intermediaries.
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFD3] text-[11px] text-[#7A6763]">
                  <strong>Prototype Demonstration:</strong> In the production platform, notifications are transmitted via WhatsApp and regional language IVR phone prompts.
                </div>
                <button
                  onClick={() => setInquiryModalOpen(false)}
                  className="w-full py-2.5 bg-[#80182C] text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Close
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
                    Inquiry Nature *
                  </label>
                  <select
                    value={inquiryType}
                    onChange={e => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015] bg-white"
                  >
                    <option value="Bulk / Corporate Gifting Order">Bulk / Corporate Gifting Order</option>
                    <option value="Custom Bespoke Order">Custom Bespoke Order</option>
                    <option value="Store Consignment / Partnership">Store Consignment / Partnership</option>
                    <option value="Artisan Interview / Media">Artisan Interview / Media</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#423330] uppercase mb-1">
                    Message to {artisanData.name.split(' ')[0]} *
                  </label>
                  <textarea
                    rows={4}
                    value={inquiryNotes}
                    onChange={e => setInquiryNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-xs sm:text-sm text-[#2B1015]"
                    required
                  />
                </div>

                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                  🛡️ <strong>Direct Linkage:</strong> All payments and terms are negotiated directly with the artisan.
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#80182C] hover:bg-[#681323] text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition cursor-pointer"
                  >
                    Send Direct Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-4 py-3 bg-white border border-[#D9CBBF] text-[#423330] font-semibold rounded-xl text-xs transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
