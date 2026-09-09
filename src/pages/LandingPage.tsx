import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ShoppingBag, 
  TrendingUp, 
  Coins, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Compass, 
  Layers, 
  Store,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentRoute, loadDemoLakshmiProfile, profile } = useApp();

  const handleStartArtisan = () => {
    if (profile) {
      setCurrentRoute('dashboard');
    } else {
      setCurrentRoute('onboarding');
    }
  };

  const handleStartDemoFlow = () => {
    loadDemoLakshmiProfile();
    setCurrentRoute('dashboard');
  };

  const journeySteps = [
    {
      step: '01',
      title: 'Create Profile',
      desc: 'Simple guided onboarding capturing your crafts, regional materials, and business aspirations.',
      icon: <Layers className="w-5 h-5 text-[#80182C]" />
    },
    {
      step: '02',
      title: 'Smart Cataloging',
      desc: 'AI generates market-ready titles, rich storytelling descriptions, and SEO tags from basic inputs.',
      icon: <Sparkles className="w-5 h-5 text-purple-700" />
    },
    {
      step: '03',
      title: 'Find Markets',
      desc: 'Connect with verified corporate gifting buyers, bulk retailers, and sustainable design boutiques.',
      icon: <TrendingUp className="w-5 h-5 text-emerald-700" />
    },
    {
      step: '04',
      title: 'Access Funding',
      desc: 'Tailored matches for PM Vishwakarma, MUDRA loans, and collateral-free women micro-grants.',
      icon: <Coins className="w-5 h-5 text-amber-600" />
    },
    {
      step: '05',
      title: 'Get Mentorship',
      desc: '1-on-1 guidance on fair unit pricing, packaging, and digital marketing in regional languages.',
      icon: <Users className="w-5 h-5 text-blue-600" />
    },
    {
      step: '06',
      title: 'Reach Customers',
      desc: 'Sell directly to ethical consumers across India with complete margin transparency.',
      icon: <Store className="w-5 h-5 text-rose-700" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 pattern-artisan opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* SIH Hackathon Ribbon */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#E8CEBF] text-[#80182C] text-xs font-semibold mb-8 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#80182C] animate-pulse" />
            <span>Smart India Hackathon 2026 Prototype • Statement SIH26090</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#2B1015] tracking-tight leading-[1.12]">
                Her Skills.<br />
                <span className="text-[#80182C] underline decoration-[#D99B26]/60 decoration-wavy decoration-2">
                  Her Business.
                </span><br />
                Her Future.
              </h1>

              <p className="text-lg sm:text-xl text-[#5C4D49] max-w-2xl leading-relaxed font-normal">
                SAKHI connects marginalized women artisans with customers, markets, funding, and mentors — helping their traditional skills become sustainable, self-reliant businesses.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3.5 sm:items-center">
                <button
                  onClick={handleStartArtisan}
                  className="inline-flex items-center justify-center gap-2 bg-[#80182C] hover:bg-[#681323] text-white px-7 py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <span>I'm an Artisan</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setCurrentRoute('marketplace')}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F5EDE3] text-[#3B1119] border border-[#D9CBBF] px-7 py-3.5 rounded-xl font-bold text-base shadow-xs transition cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 text-[#80182C]" />
                  <span>Explore Marketplace</span>
                </button>

                <button
                  onClick={handleStartDemoFlow}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#FAF0E6] hover:bg-[#F3E2D3] text-[#7A1F30] border border-[#DEBAA6] px-4 py-3.5 rounded-xl text-xs font-semibold transition cursor-pointer"
                  title="Directly launch the SIH Demo Journey with Lakshmi Devi"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Quick Demo Flow</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#E8DFD3] grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-serif font-black text-[#80182C]">91%</div>
                  <div className="text-xs text-[#7A6763] font-medium">Example Market Match</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-black text-[#80182C]">100%</div>
                  <div className="text-xs text-[#7A6763] font-medium">Direct Artisan Connection</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-black text-[#80182C]">18+</div>
                  <div className="text-xs text-[#7A6763] font-medium">Craft Categories Supported</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-xl border border-[#E8DFD3] space-y-5">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
                      alt="Lakshmi Devi"
                      className="w-13 h-13 rounded-2xl object-cover ring-2 ring-[#80182C]/20 shadow-xs"
                    />
                    <div>
                      <h3 className="text-base font-bold text-[#2B1015]">Lakshmi Devi</h3>
                      <p className="text-xs text-[#7A6763]">Master Bamboo Artisan • Warangal, TS</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
                    Live Demo Case
                  </span>
                </div>

                {/* Simulated AI Match Scores Card */}
                <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#EFE8DE] space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#7A6763]">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">
                      Prototype Match Scores
                    </span>
                    <span className="flex items-center gap-1 text-purple-800 font-semibold">
                      <Sparkles className="w-3 h-3 text-purple-700" />
                      Rule Engine
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Market */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-[#2B1015]">Market: Eco Corporate Gifting</span>
                        <span className="text-[#80182C] font-bold">91%</span>
                      </div>
                      <div className="w-full bg-[#EADFD3] rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-[#80182C] h-2 rounded-full w-[91%]" />
                      </div>
                    </div>

                    {/* Funding */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-[#2B1015]">Funding: Micro Enterprise MUDRA</span>
                        <span className="text-[#C85A32] font-bold">87%</span>
                      </div>
                      <div className="w-full bg-[#EADFD3] rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-[#C85A32] h-2 rounded-full w-[87%]" />
                      </div>
                    </div>

                    {/* Mentor */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-[#2B1015]">Mentor: Digital Marketing & Brand</span>
                        <span className="text-purple-700 font-bold">94%</span>
                      </div>
                      <div className="w-full bg-[#EADFD3] rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full w-[94%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smart Catalog Snippet */}
                <div className="p-3.5 bg-[#FAF0E6]/60 rounded-2xl border border-[#E8CEBF] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#80182C]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Generated Smart Catalog</span>
                  </div>
                  <p className="text-xs text-[#5C4D49] line-clamp-2 italic">
                    "Bamboo Handcrafted Storage Basket — handwoven by skilled artisan from Telangana. Designed for sustainable home storage and everyday use."
                  </p>
                </div>

                <button
                  onClick={handleStartDemoFlow}
                  className="w-full py-2.5 bg-[#80182C] hover:bg-[#681323] text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Explore Lakshmi's Live Dashboard</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Core Pillars Section */}
      <section className="py-16 bg-white border-y border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#80182C] bg-[#FAF0E6] px-3 py-1 rounded-full border border-[#E8CEBF]">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-serif font-black text-[#2B1015] mt-3">
              Everything an artisan needs to become an entrepreneur
            </h2>
            <p className="text-sm text-[#7A6763] mt-2">
              From informal craftsmanship to verifiable, credit-ready, market-linked micro enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div 
              onClick={() => setCurrentRoute('dashboard')}
              className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] hover:border-[#80182C]/50 hover:shadow-md transition cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#2B1015] mb-2">Find Markets</h3>
              <p className="text-xs text-[#5C4D49] leading-relaxed">
                Connect directly with B2B corporate gifting departments, boutique retail buyers, and export clusters with bulk volume guarantees.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#80182C]">
                <span>View Market Linkages</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2 */}
            <div 
              onClick={() => setCurrentRoute('smart-catalog')}
              className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] hover:border-purple-300 hover:shadow-md transition cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#2B1015] mb-2">Smart Catalog</h3>
              <p className="text-xs text-[#5C4D49] leading-relaxed">
                Transform rough product descriptions into professional e-commerce titles, storytelling narratives, SEO tags, and market channels instantly.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-purple-700">
                <span>Generate Catalog</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3 */}
            <div 
              onClick={() => setCurrentRoute('funding')}
              className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] hover:border-amber-300 hover:shadow-md transition cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#2B1015] mb-2">Find Funding</h3>
              <p className="text-xs text-[#5C4D49] leading-relaxed">
                Discover matched schemes including PM Vishwakarma, MUDRA loans, and women entrepreneur grants with clear eligibility checklists.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-700">
                <span>Explore Schemes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4 */}
            <div 
              onClick={() => setCurrentRoute('mentorship')}
              className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] hover:border-blue-300 hover:shadow-md transition cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#2B1015] mb-2">Get Mentorship</h3>
              <p className="text-xs text-[#5C4D49] leading-relaxed">
                Book 1-on-1 advisory sessions with seasoned craft merchandising specialists, D2C brand experts, and rural finance coaches in regional tongues.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-700">
                <span>Browse Mentors</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The 6-Step Artisan Journey Roadmap */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#80182C] bg-[#FAF0E6] px-3 py-1 rounded-full border border-[#E8CEBF]">
              The Core User Journey
            </span>
            <h2 className="text-3xl font-serif font-black text-[#2B1015] mt-3">
              From Raw Craftsmanship to Thriving Enterprise
            </h2>
            <p className="text-sm text-[#7A6763] mt-2">
              How SAKHI walks alongside an artisan at every step of her economic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeySteps.map((step, idx) => (
              <div 
                key={step.step}
                className="bg-white p-6 rounded-2xl border border-[#E8DFD3] shadow-xs relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute -top-4 -right-2 text-6xl font-serif font-black text-[#FAF0E6] pointer-events-none select-none">
                  {step.step}
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[#2B1015] mb-2">{step.title}</h4>
                  <p className="text-xs text-[#5C4D49] leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F3EBE1] flex items-center text-[11px] font-semibold text-[#80182C]">
                  <span>Step {idx + 1} of 6</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-14 bg-gradient-to-r from-[#80182C] to-[#540B0E] rounded-3xl p-8 sm:p-12 text-white text-center shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl sm:text-3xl font-serif font-black">
                Ready to empower India's heritage creators?
              </h3>
              <p className="text-sm text-rose-100/90">
                Test the complete SIH26090 prototype flow right now — from onboarding to publishing and customer discovery.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleStartArtisan}
                  className="bg-amber-400 hover:bg-amber-300 text-[#2B1015] font-bold px-7 py-3 rounded-xl text-sm transition cursor-pointer shadow-md"
                >
                  Launch Artisan Onboarding
                </button>
                <button
                  onClick={() => setCurrentRoute('marketplace')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-7 py-3 rounded-xl text-sm transition cursor-pointer"
                >
                  View Artisan Marketplace
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
