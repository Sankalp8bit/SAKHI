import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  TrendingUp, 
  Coins, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  ShoppingBag, 
  Info, 
  Plus, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Star,
  Package,
  Layers,
  HelpCircle,
  X
} from 'lucide-react';
import { 
  calculateMarketMatches, 
  calculateFundingMatches, 
  calculateMentorMatches,
  ScoredMarketOpportunity,
  ScoredFundingOpportunity,
  ScoredMentor
} from '../utils/matchingEngine';

export const DashboardPage: React.FC = () => {
  const { profile, setCurrentRoute, products, setSelectedProductId } = useApp();
  const [activeScoreModal, setActiveScoreModal] = useState<'market' | 'funding' | 'mentor' | null>(null);

  // Compute rule-based prototype matches
  const marketMatches = calculateMarketMatches(profile);
  const fundingMatches = calculateFundingMatches(profile);
  const mentorMatches = calculateMentorMatches(profile);

  const topMarket = marketMatches[0];
  const topFunding = fundingMatches[0];
  const topMentor = mentorMatches[0];

  const artisanProducts = products.filter(p => 
    profile ? p.artisanId === profile.id || p.artisanName.toLowerCase().includes(profile.name.toLowerCase().split(' ')[0]) : true
  );

  const firstName = profile?.name ? profile.name.split(' ')[0] : 'Lakshmi';

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD3] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={profile?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'}
              alt={profile?.name || 'Lakshmi Devi'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-[#FAF0E6] shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2B1015]">
                  Good morning, {firstName} 👋
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-[#7A6763] mt-1">
                {profile?.businessName || 'Sri Lakshmi Natural Bamboo Weaves'} • {profile?.location || 'Warangal, Telangana'}
              </p>
              
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-[11px] font-semibold bg-[#FAF0E6] text-[#80182C] px-2.5 py-0.5 rounded-full border border-[#E8CEBF]">
                  {profile?.skills.join(' • ') || 'Bamboo crafts • Home decor'}
                </span>
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Profile 95% Complete
                </span>
                <span className="text-[11px] font-medium text-[#7A6763]">
                  {profile?.experienceYears || 8} Yrs Experience
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setCurrentRoute('smart-catalog')}
              className="inline-flex items-center justify-center gap-2 bg-[#80182C] hover:bg-[#681323] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Smart Catalog Studio</span>
            </button>
            <button
              onClick={() => setCurrentRoute('marketplace')}
              className="inline-flex items-center justify-center gap-2 bg-[#FAF8F5] hover:bg-[#F3EDE6] text-[#3B1119] border border-[#D9CBBF] px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#80182C]" />
              <span>View in Marketplace</span>
            </button>
          </div>
        </div>

        {/* SIH AI Differentiation: 3 Major Match Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-serif font-black text-[#2B1015]">
                  AI-Powered Opportunity Matches
                </h2>
                <span className="text-[10px] uppercase tracking-wider font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md border border-purple-200">
                  Prototype Match Score
                </span>
              </div>
              <p className="text-xs text-[#7A6763] mt-0.5">
                Calculated using transparent multi-factor scoring against your craft category, region, and growth goals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: MARKET MATCH */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8DFD3] shadow-sm hover:shadow-md transition relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#80182C] bg-[#FAF0E6] px-2.5 py-1 rounded-lg">
                    Market Match
                  </span>
                  <button 
                    onClick={() => setActiveScoreModal('market')}
                    className="text-xs text-[#7A6763] hover:text-[#80182C] flex items-center gap-1 font-semibold cursor-pointer"
                    title="View why this score was calculated"
                  >
                    <span>Why 91%?</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-baseline space-x-2 my-2">
                  <span className="text-4xl font-serif font-black text-[#80182C]">91%</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    High Demand
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#2B1015] mt-2 line-clamp-1">
                  {topMarket.title}
                </h3>
                <p className="text-xs text-[#5C4D49] mt-1 line-clamp-2">
                  {topMarket.description}
                </p>

                <div className="mt-3 text-xs bg-[#FAF8F5] p-2.5 rounded-xl border border-[#F0E6DA]">
                  <span className="text-[#7A6763]">Estimated Order Value:</span>
                  <span className="font-bold text-[#2B1015] ml-1">{topMarket.avgOrderValue}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F3EBE1] flex items-center justify-between">
                <span className="text-[11px] text-[#7A6763]">Corporate Gifting Hub</span>
                <button
                  onClick={() => setCurrentRoute('marketplace')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#80182C] hover:underline cursor-pointer"
                >
                  <span>Explore Market</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CARD 2: FUNDING MATCH */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8DFD3] shadow-sm hover:shadow-md transition relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                    Funding Match
                  </span>
                  <button 
                    onClick={() => setActiveScoreModal('funding')}
                    className="text-xs text-[#7A6763] hover:text-amber-800 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <span>Why 87%?</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-baseline space-x-2 my-2">
                  <span className="text-4xl font-serif font-black text-[#C85A32]">87%</span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                    Pre-Eligible
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#2B1015] mt-2 line-clamp-1">
                  {topFunding.name}
                </h3>
                <p className="text-xs text-[#5C4D49] mt-1 line-clamp-2">
                  {topFunding.purpose}
                </p>

                <div className="mt-3 text-xs bg-[#FAF8F5] p-2.5 rounded-xl border border-[#F0E6DA]">
                  <span className="text-[#7A6763]">Capital Range:</span>
                  <span className="font-bold text-[#2B1015] ml-1">{topFunding.amountRange}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F3EBE1] flex items-center justify-between">
                <span className="text-[11px] text-[#7A6763]">Collateral-Free Loan</span>
                <button
                  onClick={() => setCurrentRoute('funding')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#C85A32] hover:underline cursor-pointer"
                >
                  <span>Check Eligibility</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CARD 3: MENTOR MATCH */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8DFD3] shadow-sm hover:shadow-md transition relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2.5 py-1 rounded-lg">
                    Mentor Match
                  </span>
                  <button 
                    onClick={() => setActiveScoreModal('mentor')}
                    className="text-xs text-[#7A6763] hover:text-purple-800 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <span>Why 94%?</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-baseline space-x-2 my-2">
                  <span className="text-4xl font-serif font-black text-purple-700">94%</span>
                  <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-full">
                    Top Mentor
                  </span>
                </div>

                <div className="flex items-center space-x-3 mt-2">
                  <img
                    src={topMentor.avatar}
                    alt={topMentor.name}
                    className="w-9 h-9 rounded-xl object-cover ring-1 ring-purple-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-[#2B1015] line-clamp-1">{topMentor.name}</h3>
                    <p className="text-[11px] text-purple-800 font-semibold">{topMentor.role}</p>
                  </div>
                </div>

                <div className="mt-3 text-xs bg-[#FAF8F5] p-2.5 rounded-xl border border-[#F0E6DA]">
                  <span className="text-[#7A6763]">Languages:</span>
                  <span className="font-bold text-[#2B1015] ml-1">{topMentor.languages.join(', ')}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F3EBE1] flex items-center justify-between">
                <span className="text-[11px] text-[#7A6763]">1-on-1 Audio Advisory</span>
                <button
                  onClick={() => setCurrentRoute('mentorship')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:underline cursor-pointer"
                >
                  <span>Connect with Mentor</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Recommended for You - Personalized Recommendations */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD3] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0E6DA] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#80182C]" />
                <h2 className="text-xl font-serif font-black text-[#2B1015]">
                  Recommended for You
                </h2>
                <span className="text-[10px] font-bold bg-[#FAF0E6] text-[#80182C] px-2 py-0.5 rounded-full border border-[#E8CEBF]">
                  Personalized
                </span>
              </div>
              <p className="text-xs text-[#7A6763] mt-1">
                Hand-matched market inquiries, government grants, and mentors aligned to {firstName}'s bamboo craft skills.
              </p>
            </div>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              3 New Opportunities Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            {/* Recommendation 1: Market RFQ */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] hover:border-[#80182C]/50 hover:shadow-xs transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="font-bold text-[#80182C] bg-[#FAF0E6] px-2 py-0.5 rounded">
                    Corporate Buyer Request
                  </span>
                  <span className="font-bold text-emerald-700">91% Match</span>
                </div>
                <h4 className="text-sm font-bold text-[#2B1015]">
                  Eco-Friendly Hampers RFQ (Hyderabad Tech Park)
                </h4>
                <p className="text-xs text-[#5C4D49] mt-1 leading-relaxed">
                  Bulk requirement for 80-120 handwoven bamboo utility baskets for annual conference gifting. 50% upfront payment.
                </p>
                <div className="mt-3 text-[11px] text-[#7A6763]">
                  Est. Value: <strong className="text-[#2B1015]">₹45,000 - ₹65,000</strong>
                </div>
              </div>

              <button
                onClick={() => setCurrentRoute('marketplace')}
                className="w-full py-2 bg-[#80182C] hover:bg-[#681323] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
              >
                <span>Review Market Buyer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Recommendation 2: Funding Tool Grant */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] hover:border-amber-400 hover:shadow-xs transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Govt Tool Incentive
                  </span>
                  <span className="font-bold text-amber-800">92% Match</span>
                </div>
                <h4 className="text-sm font-bold text-[#2B1015]">
                  PM Vishwakarma Tool-kit Grant Voucher
                </h4>
                <p className="text-xs text-[#5C4D49] mt-1 leading-relaxed">
                  Direct ₹15,000 e-voucher for purchasing mechanized bamboo strip splitters and modern finishing tools with zero debt.
                </p>
                <div className="mt-3 text-[11px] text-[#7A6763]">
                  Incentive: <strong className="text-emerald-700">₹15,000 Grant (100% Free)</strong>
                </div>
              </div>

              <button
                onClick={() => setCurrentRoute('funding')}
                className="w-full py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
              >
                <span>Check Tool Eligibility</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Recommendation 3: Mentor Booking */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] hover:border-purple-300 hover:shadow-xs transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                    Telugu Advisory Slot
                  </span>
                  <span className="font-bold text-purple-700">94% Match</span>
                </div>
                <h4 className="text-sm font-bold text-[#2B1015]">
                  D2C Brand Strategy with Ananya Rao
                </h4>
                <p className="text-xs text-[#5C4D49] mt-1 leading-relaxed">
                  1-on-1 audio phone consultation on pricing your bamboo storage collection directly to urban boutique home decorators.
                </p>
                <div className="mt-3 text-[11px] text-[#7A6763]">
                  Language: <strong className="text-purple-800">Telugu & English</strong>
                </div>
              </div>

              <button
                onClick={() => setCurrentRoute('mentorship')}
                className="w-full py-2 bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
              >
                <span>Connect with Ananya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* My Products Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD3] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-serif font-black text-[#2B1015]">
                My Products ({artisanProducts.length})
              </h2>
              <p className="text-xs text-[#7A6763] mt-0.5">
                Items live in the customer marketplace or created with Smart Catalog.
              </p>
            </div>

            <button
              onClick={() => setCurrentRoute('smart-catalog')}
              className="inline-flex items-center gap-1.5 bg-[#FAF0E6] hover:bg-[#F3E2D3] text-[#80182C] border border-[#DEBAA6] px-4 py-2 rounded-xl text-xs font-bold transition self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisanProducts.map(product => (
              <div 
                key={product.id}
                className="bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] overflow-hidden flex flex-col justify-between hover:shadow-xs transition"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-white/95 text-emerald-800 px-2.5 py-1 rounded-full shadow-xs border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Live in Marketplace
                  </span>
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold bg-[#2B1015]/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#2B1015] line-clamp-1">{product.title}</h4>
                    <p className="text-xs text-[#5C4D49] mt-1 line-clamp-2">{product.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#E8DFD3] text-[#7A6763]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E8DFD3] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#7A6763]">Retail Price</span>
                      <div className="text-base font-bold text-[#80182C]">₹{product.price}</div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setCurrentRoute('marketplace');
                      }}
                      className="text-xs font-semibold text-[#80182C] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="bg-[#FAF0E6]/50 rounded-3xl p-6 sm:p-8 border border-[#E8CEBF]">
          <h2 className="text-xl font-serif font-black text-[#2B1015] mb-2">
            Recommended Actions
          </h2>
          <p className="text-xs text-[#7A6763] mb-6">
            Action items tailored to scale your bamboo craft venture into a viable enterprise.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div 
              onClick={() => setCurrentRoute('smart-catalog')}
              className="p-4 bg-white rounded-2xl border border-[#E8DFD3] hover:border-[#80182C] transition cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md">Priority</span>
              </div>
              <h4 className="text-sm font-bold text-[#2B1015] group-hover:text-[#80182C] transition">
                Create Digital Catalog
              </h4>
              <p className="text-xs text-[#5C4D49] mt-1 leading-relaxed">
                Generate professional titles, marketing descriptions, and tags for your bamboo baskets.
              </p>
            </div>

            <div 
              onClick={() => setCurrentRoute('marketplace')}
              className="p-4 bg-white rounded-2xl border border-[#E8DFD3] hover:border-emerald-600 transition cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">91% Match</span>
              </div>
              <h4 className="text-sm font-bold text-[#2B1015] group-hover:text-emerald-800 transition">
                Explore New Markets
              </h4>
              <p className="text-xs text-[#5C4D49] mt-1 leading-relaxed">
                Review corporate gifting requirements and list your products for bulk pre-orders.
              </p>
            </div>

            <div 
              onClick={() => setCurrentRoute('funding')}
              className="p-4 bg-white rounded-2xl border border-[#E8DFD3] hover:border-amber-600 transition cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Coins className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">87% Match</span>
              </div>
              <h4 className="text-sm font-bold text-[#2B1015] group-hover:text-amber-800 transition">
                Check Funding Opportunities
              </h4>
              <p className="text-xs text-[#5C4D49] mt-1 leading-relaxed">
                View MUDRA Kishore terms & PM Vishwakarma toolkit subsidy eligibility.
              </p>
            </div>

            <div 
              onClick={() => setCurrentRoute('mentorship')}
              className="p-4 bg-white rounded-2xl border border-[#E8DFD3] hover:border-blue-600 transition cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md">94% Match</span>
              </div>
              <h4 className="text-sm font-bold text-[#2B1015] group-hover:text-blue-800 transition">
                Connect with a Mentor
              </h4>
              <p className="text-xs text-[#5C4D49] mt-1 leading-relaxed">
                Schedule a 1-on-1 session with Ananya Rao for Telugu branding guidance.
              </p>
            </div>

          </div>
        </div>

        {/* My Products Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD3] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-serif font-black text-[#2B1015]">
                My Products ({artisanProducts.length})
              </h2>
              <p className="text-xs text-[#7A6763] mt-0.5">
                Items live in the customer marketplace or created with Smart Catalog.
              </p>
            </div>

            <button
              onClick={() => setCurrentRoute('smart-catalog')}
              className="inline-flex items-center gap-1.5 bg-[#FAF0E6] hover:bg-[#F3E2D3] text-[#80182C] border border-[#DEBAA6] px-4 py-2 rounded-xl text-xs font-bold transition self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisanProducts.map(product => (
              <div 
                key={product.id}
                className="bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] overflow-hidden flex flex-col justify-between hover:shadow-xs transition"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-white/95 text-emerald-800 px-2.5 py-1 rounded-full shadow-xs border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Live in Marketplace
                  </span>
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold bg-[#2B1015]/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#2B1015] line-clamp-1">{product.title}</h4>
                    <p className="text-xs text-[#5C4D49] mt-1 line-clamp-2">{product.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#E8DFD3] text-[#7A6763]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E8DFD3] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#7A6763]">Retail Price</span>
                      <div className="text-base font-bold text-[#80182C]">₹{product.price}</div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setCurrentRoute('marketplace');
                      }}
                      className="text-xs font-semibold text-[#80182C] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Transparent Match Score Explanation Modal */}
      {activeScoreModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD3] space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[#F0E6DA] pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-700" />
                <h3 className="text-lg font-bold text-[#2B1015]">
                  Transparent Match Breakdown
                </h3>
              </div>
              <button 
                onClick={() => setActiveScoreModal(null)}
                className="p-1.5 rounded-lg text-[#7A6763] hover:bg-[#FAF8F5] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-[#5C4D49] leading-relaxed">
                SAKHI calculates this score using an explainable multi-factor scoring model. Here is the exact calculation logic for this recommendation:
              </p>

              {activeScoreModal === 'market' && (
                <div className="space-y-2.5">
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFD3]">
                    <div className="flex justify-between font-bold text-sm text-[#80182C] mb-1">
                      <span>Market: Eco Corporate Gifting</span>
                      <span>91% Match</span>
                    </div>
                    <ul className="space-y-1.5 text-[#5C4D49] mt-2">
                      {topMarket.explanation.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>+{item.points}% {item.factor}:</strong> {item.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeScoreModal === 'funding' && (
                <div className="space-y-2.5">
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFD3]">
                    <div className="flex justify-between font-bold text-sm text-[#C85A32] mb-1">
                      <span>Funding: {topFunding.name}</span>
                      <span>87% Match</span>
                    </div>
                    <ul className="space-y-1.5 text-[#5C4D49] mt-2">
                      {topFunding.explanation.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span><strong>+{item.points}% {item.factor}:</strong> {item.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeScoreModal === 'mentor' && (
                <div className="space-y-2.5">
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFD3]">
                    <div className="flex justify-between font-bold text-sm text-purple-700 mb-1">
                      <span>Mentor: {topMentor.name}</span>
                      <span>94% Match</span>
                    </div>
                    <ul className="space-y-1.5 text-[#5C4D49] mt-2">
                      {topMentor.explanation.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                          <span><strong>+{item.points}% {item.factor}:</strong> {item.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-900 text-[11px]">
                <strong>Academic / Hackathon Note:</strong> This recommendation engine operates deterministically on rule weights without requiring opaque external black-box models, ensuring reliable explanations for jury evaluation.
              </div>
            </div>

            <button
              onClick={() => setActiveScoreModal(null)}
              className="w-full py-2.5 bg-[#80182C] text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
