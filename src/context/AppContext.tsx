import React, { createContext, useContext, useState, useEffect } from 'react';
import { ArtisanProfile, Product, Mentor, FundingOpportunity, PageRoute } from '../types';
import { DEMO_LAKSHMI_PROFILE, INITIAL_PRODUCTS, MOCK_MENTORS, MOCK_FUNDING_OPPORTUNITIES } from '../data/mockData';

interface AppContextType {
  currentRoute: PageRoute;
  setCurrentRoute: (route: PageRoute) => void;
  profile: ArtisanProfile | null;
  setProfile: (profile: ArtisanProfile | null) => void;
  loadDemoLakshmiProfile: () => void;
  resetToFreshArtisan: () => void;
  products: Product[];
  publishProduct: (newProduct: Omit<Product, 'id' | 'createdAt'>) => Product;
  mentors: Mentor[];
  requestMentorship: (mentorId: string) => boolean;
  fundingList: FundingOpportunity[];
  applyFundingInquiry: (fundId: string) => boolean;
  selectedArtisanId: string | null;
  setSelectedArtisanId: (id: string | null) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  showDemoNotice: boolean;
  setShowDemoNotice: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRouteState] = useState<PageRoute>(() => {
    const hash = window.location.hash.replace('#', '') as PageRoute;
    return ['landing', 'onboarding', 'dashboard', 'smart-catalog', 'marketplace', 'funding', 'mentorship', 'artisan-profile'].includes(hash)
      ? hash
      : 'landing';
  });

  const [profile, setProfileState] = useState<ArtisanProfile | null>(() => {
    const saved = localStorage.getItem('sakhi_artisan_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Default to Lakshmi so reviewers who jump to dashboard immediately see complete experience
    return DEMO_LAKSHMI_PROFILE;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sakhi_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PRODUCTS;
  });

  const [mentors, setMentors] = useState<Mentor[]>(() => {
    const saved = localStorage.getItem('sakhi_mentors');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return MOCK_MENTORS;
  });

  const [fundingList, setFundingList] = useState<FundingOpportunity[]>(() => {
    const saved = localStorage.getItem('sakhi_funding');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return MOCK_FUNDING_OPPORTUNITIES;
  });

  const [selectedArtisanId, setSelectedArtisanId] = useState<string | null>('artisan-lakshmi-01');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showDemoNotice, setShowDemoNotice] = useState<boolean>(true);

  const setCurrentRoute = (route: PageRoute) => {
    setCurrentRouteState(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (['landing', 'onboarding', 'dashboard', 'smart-catalog', 'marketplace', 'funding', 'mentorship', 'artisan-profile'].includes(hash)) {
        setCurrentRouteState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setProfile = (newProfile: ArtisanProfile | null) => {
    setProfileState(newProfile);
    if (newProfile) {
      localStorage.setItem('sakhi_artisan_profile', JSON.stringify(newProfile));
    } else {
      localStorage.removeItem('sakhi_artisan_profile');
    }
  };

  const loadDemoLakshmiProfile = () => {
    setProfile(DEMO_LAKSHMI_PROFILE);
  };

  const resetToFreshArtisan = () => {
    setProfileState(null);
    localStorage.removeItem('sakhi_artisan_profile');
  };

  const publishProduct = (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-custom-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      isPublished: true,
      rating: 5.0,
      reviewCount: 1
    };

    setProducts(prev => {
      const updated = [newProduct, ...prev];
      localStorage.setItem('sakhi_products', JSON.stringify(updated));
      return updated;
    });

    return newProduct;
  };

  const requestMentorship = (mentorId: string): boolean => {
    setMentors(prev => {
      const updated = prev.map(m => m.id === mentorId ? { ...m, isRequested: true } : m);
      localStorage.setItem('sakhi_mentors', JSON.stringify(updated));
      return updated;
    });
    return true;
  };

  const applyFundingInquiry = (fundId: string): boolean => {
    setFundingList(prev => {
      const updated = prev.map(f => f.id === fundId ? { ...f, applicationStatus: 'In Review' as const } : f);
      localStorage.setItem('sakhi_funding', JSON.stringify(updated));
      return updated;
    });
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        profile,
        setProfile,
        loadDemoLakshmiProfile,
        resetToFreshArtisan,
        products,
        publishProduct,
        mentors,
        requestMentorship,
        fundingList,
        applyFundingInquiry,
        selectedArtisanId,
        setSelectedArtisanId,
        selectedProductId,
        setSelectedProductId,
        showDemoNotice,
        setShowDemoNotice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
