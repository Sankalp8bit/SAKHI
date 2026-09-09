import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ShoppingBag, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Coins, 
  Menu, 
  X, 
  Heart,
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { PageRoute } from '../types';

export const Navbar: React.FC = () => {
  const { currentRoute, setCurrentRoute, profile, loadDemoLakshmiProfile } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; route: PageRoute; icon: React.ReactNode; badge?: string }[] = [
    { label: 'Home', route: 'landing', icon: <Heart className="w-4 h-4 text-rose-600" /> },
    { label: 'Artisan Dashboard', route: 'dashboard', icon: <LayoutDashboard className="w-4 h-4 text-amber-700" />, badge: profile ? 'Active' : undefined },
    { label: 'Smart Catalog', route: 'smart-catalog', icon: <Sparkles className="w-4 h-4 text-purple-700" /> },
    { label: 'Marketplace', route: 'marketplace', icon: <ShoppingBag className="w-4 h-4 text-emerald-700" /> },
    { label: 'Funding', route: 'funding', icon: <Coins className="w-4 h-4 text-amber-600" /> },
    { label: 'Mentorship', route: 'mentorship', icon: <Users className="w-4 h-4 text-blue-600" /> },
  ];

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-[#E8DFD3] shadow-xs">
      {/* Top SIH Problem Statement Bar */}
      <div className="bg-[#80182C] text-amber-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded font-semibold text-[11px] uppercase tracking-wide border border-amber-300/30">
              SIH 2026 • SIH26090
            </span>
            <span className="hidden sm:inline font-medium text-amber-100/90 text-xs truncate">
              AI-Driven Market Linkage & Smart Cataloging for Marginalized Artisans
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={() => {
                loadDemoLakshmiProfile();
                setCurrentRoute('dashboard');
              }}
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-[#540B0E] font-semibold px-2.5 py-0.5 rounded-full text-[11px] transition shadow-xs cursor-pointer"
              title="Load Lakshmi Devi demo profile with 91% market match"
            >
              <UserCheck className="w-3 h-3" />
              <span>Load Lakshmi Demo</span>
            </button>
            <span className="hidden md:inline-flex items-center text-amber-200/80 text-[11px] gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-300" />
              Transparent Rule-Based Prototype
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => handleNavigate('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#80182C] to-[#C85A32] flex items-center justify-center text-white shadow-md shadow-[#80182C]/15 group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl font-bold tracking-tight">स</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-[#3B1119] font-serif">SAKHI</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-[#FAF0E6] text-[#80182C] border border-[#EACBB8] rounded-md">
                  सखी
                </span>
              </div>
              <p className="text-[11px] text-[#785E59] font-medium tracking-tight">
                Her Skills. Her Business. Her Future.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavigate(item.route)}
                  className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition cursor-pointer ${
                    isActive 
                      ? 'bg-[#80182C] text-white shadow-sm' 
                      : 'text-[#5C4D49] hover:bg-[#F3EBE1] hover:text-[#2E1F1C]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : ''}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="ml-1 text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded-full border border-emerald-300">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA & Language Toggle */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex items-center bg-[#FAF0E6] p-1 rounded-xl border border-[#E8CEBF] text-xs font-semibold text-[#80182C]">
              <span className="px-2 py-0.5 rounded-lg bg-white shadow-2xs font-bold text-[#80182C]">EN</span>
              <span className="px-2 py-0.5 text-[#7A6763] hover:text-[#2B1015] cursor-pointer" title="हिंदी">हिं</span>
              <span className="px-2 py-0.5 text-[#7A6763] hover:text-[#2B1015] cursor-pointer" title="తెలుగు">తె</span>
            </div>

            <button
              onClick={() => handleNavigate(profile ? 'dashboard' : 'onboarding')}
              className="inline-flex items-center space-x-2 bg-[#80182C] hover:bg-[#681323] text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition hover:shadow-md cursor-pointer"
            >
              <span>{profile ? `Dashboard (${profile.name.split(' ')[0]})` : "I'm an Artisan"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#5C4D49] hover:bg-[#F3EBE1] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFD3] bg-[#FCFAF7] px-4 pt-3 pb-6 space-y-2">
          {navItems.map(item => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavigate(item.route)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition ${
                  isActive 
                    ? 'bg-[#80182C] text-white' 
                    : 'text-[#4A3B37] hover:bg-[#F5EDE3]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={isActive ? 'text-white' : ''}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#E8DFD3] flex flex-col space-y-2">
            <button
              onClick={() => handleNavigate(profile ? 'dashboard' : 'onboarding')}
              className="w-full py-3 bg-[#80182C] text-white font-semibold rounded-xl text-center shadow-sm"
            >
              {profile ? `Go to Dashboard (${profile.name})` : "I'm an Artisan — Start Here"}
            </button>
            <button
              onClick={() => {
                loadDemoLakshmiProfile();
                handleNavigate('dashboard');
              }}
              className="w-full py-2.5 bg-amber-100 text-[#540B0E] font-medium border border-amber-300 rounded-xl text-center text-sm"
            >
              ✨ Load Lakshmi Devi Demo Flow
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
