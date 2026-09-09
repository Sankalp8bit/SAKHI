import React from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { LandingPage } from './pages/LandingPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { DashboardPage } from './pages/DashboardPage'
import { SmartCatalogPage } from './pages/SmartCatalogPage'
import { MarketplacePage } from './pages/MarketplacePage'
import { FundingPage } from './pages/FundingPage'
import { MentorshipPage } from './pages/MentorshipPage'
import { ArtisanProfilePage } from './pages/ArtisanProfilePage'
import { Sparkles, Compass, CheckCircle2, ChevronRight, X } from 'lucide-react'

const MainContent: React.FC = () => {
  const { currentRoute, setCurrentRoute, loadDemoLakshmiProfile, showDemoNotice, setShowDemoNotice } = useApp()

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'landing':
        return <LandingPage />
      case 'onboarding':
        return <OnboardingPage />
      case 'dashboard':
        return <DashboardPage />
      case 'smart-catalog':
        return <SmartCatalogPage />
      case 'marketplace':
        return <MarketplacePage />
      case 'artisan-profile':
        return <ArtisanProfilePage />
      case 'funding':
        return <FundingPage />
      case 'mentorship':
        return <MentorshipPage />
      default:
        return <LandingPage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2B1015]">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />

      {/* Floating Demo Navigator Bar for SIH Evaluation */}
      {showDemoNotice && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[94%] bg-[#2B1015]/95 backdrop-blur-md text-white p-3 sm:px-5 sm:py-2.5 rounded-2xl shadow-xl border border-amber-400/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-[#2B1015] font-black text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wide">
              SIH 2026 Demo Bar
            </span>
            <span className="hidden md:inline text-amber-100/90 text-xs">
              Direct presentation shortcuts:
            </span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => setCurrentRoute('landing')}
              className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                currentRoute === 'landing' ? 'bg-amber-400 text-[#2B1015] font-bold' : 'hover:bg-white/10 text-amber-200'
              }`}
            >
              1. Hero
            </button>
            <button
              onClick={() => setCurrentRoute('onboarding')}
              className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                currentRoute === 'onboarding' ? 'bg-amber-400 text-[#2B1015] font-bold' : 'hover:bg-white/10 text-amber-200'
              }`}
            >
              2. Onboarding
            </button>
            <button
              onClick={() => {
                loadDemoLakshmiProfile()
                setCurrentRoute('dashboard')
              }}
              className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                currentRoute === 'dashboard' ? 'bg-amber-400 text-[#2B1015] font-bold' : 'hover:bg-white/10 text-amber-200'
              }`}
            >
              3. Dashboard (91%)
            </button>
            <button
              onClick={() => setCurrentRoute('smart-catalog')}
              className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                currentRoute === 'smart-catalog' ? 'bg-amber-400 text-[#2B1015] font-bold' : 'hover:bg-white/10 text-amber-200'
              }`}
            >
              4. Smart Catalog
            </button>
            <button
              onClick={() => setCurrentRoute('marketplace')}
              className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                currentRoute === 'marketplace' ? 'bg-amber-400 text-[#2B1015] font-bold' : 'hover:bg-white/10 text-amber-200'
              }`}
            >
              5. Marketplace
            </button>
          </div>

          <button
            onClick={() => setShowDemoNotice(false)}
            className="text-amber-300 hover:text-white p-1 rounded-lg"
            title="Hide demo bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  )
}

export default App

