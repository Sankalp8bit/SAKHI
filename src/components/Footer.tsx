import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { PageRoute } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentRoute } = useApp();

  const handleNav = (route: PageRoute) => {
    setCurrentRoute(route);
  };

  return (
    <footer className="bg-[#2D1217] text-[#E8D7D9] pt-14 pb-10 border-t border-[#4A222A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#4A222A]">
          
          {/* Column 1: Brand & SIH Alignment */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-[#2D1217] font-black text-xl shadow-md">
                स
              </div>
              <div>
                <span className="text-2xl font-serif font-black tracking-tight text-white">SAKHI</span>
                <span className="ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-400/20 text-amber-200 border border-amber-300/30 rounded-md">
                  सखी
                </span>
              </div>
            </div>
            <p className="text-sm text-rose-200/80 font-serif italic">
              "Her Skills. Her Business. Her Future."
            </p>
            <p className="text-xs text-rose-200/60 leading-relaxed">
              Empowering marginalized women artisans and grassroots micro-entrepreneurs to transition from vulnerable piece-rate labor to sustainable, self-reliant digital businesses.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-300/90 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SIH 2026 • Problem SIH26090</span>
            </div>
          </div>

          {/* Column 2: Artisan Pathways */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-300 mb-4">
              Artisan Pathways
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleNav('onboarding')}
                  className="text-rose-100/80 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Artisan Onboarding</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('dashboard')}
                  className="text-rose-100/80 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Artisan Dashboard</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('smart-catalog')}
                  className="text-rose-100/80 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-purple-300" />
                  <span>Smart Catalog Studio</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('funding')}
                  className="text-rose-100/80 hover:text-white transition cursor-pointer"
                >
                  Government & Mudra Schemes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('mentorship')}
                  className="text-rose-100/80 hover:text-white transition cursor-pointer"
                >
                  Find a Mentor
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Marketplace & Customers */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-300 mb-4">
              Ethical Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleNav('marketplace')}
                  className="text-rose-100/80 hover:text-white transition cursor-pointer"
                >
                  Browse All Handcrafted Goods
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('marketplace')}
                  className="text-rose-100/80 hover:text-white transition cursor-pointer"
                >
                  Bamboo & Cane Crafts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('marketplace')}
                  className="text-rose-100/80 hover:text-white transition cursor-pointer"
                >
                  Handloom & Block Print Textiles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('marketplace')}
                  className="text-rose-100/80 hover:text-white transition cursor-pointer"
                >
                  Terracotta & Traditional Pottery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('marketplace')}
                  className="text-rose-100/80 hover:text-white transition cursor-pointer"
                >
                  Corporate ESG Gifting Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Transparent Prototype Note */}
          <div className="bg-[#3D1A21] p-5 rounded-2xl border border-[#5A2832] space-y-3">
            <div className="flex items-center space-x-2 text-amber-300 font-semibold text-xs">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Smart Recommendation Engine</span>
            </div>
            <p className="text-xs text-rose-200/80 leading-relaxed">
              SAKHI utilizes an explainable rule-based multi-factor scoring model. Match percentages for Market (91%), Funding (87%), and Mentors (94%) are calculated deterministically against artisan craft skills, location logistics, and declared business needs.
            </p>
            <div className="pt-2 text-[11px] text-amber-200/60 flex items-center gap-1">
              <span>Prototype Version 1.0</span>
              <span>•</span>
              <span>Built for SIH 2026 Evaluation</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-rose-200/60 gap-4">
          <div className="flex items-center space-x-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>for Indian Marginalized Women Artisans</span>
          </div>
          <div>
            <span>Smart India Hackathon 2026 • Prototype Demonstration Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
