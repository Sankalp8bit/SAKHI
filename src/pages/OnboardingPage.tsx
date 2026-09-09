import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  UserCheck, 
  ShoppingBag, 
  Layers, 
  HelpCircle,
  Upload,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CraftCategory, HelpNeed, ArtisanProfile } from '../types';
import { DEMO_LAKSHMI_PROFILE } from '../data/mockData';

const ALL_SKILLS: CraftCategory[] = [
  'Bamboo crafts',
  'Handicrafts',
  'Textiles',
  'Pottery',
  'Jewelry',
  'Embroidery',
  'Food products',
  'Home decor',
  'Other'
];

const ALL_NEEDS: HelpNeed[] = [
  'Customers',
  'New markets',
  'Funding',
  'Marketing',
  'Mentorship',
  'Digital catalog',
  'Pricing'
];

export const OnboardingPage: React.FC = () => {
  const { setProfile, setCurrentRoute, publishProduct } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Step 1: Personal info
  const [name, setName] = useState('Lakshmi Devi');
  const [age, setAge] = useState<number>(34);
  const [location, setLocation] = useState('Warangal, Telangana');
  const [phone, setPhone] = useState('+91 98480 23456');
  const [preferredLanguage, setPreferredLanguage] = useState('Telugu & English');

  // Step 2: Skills
  const [selectedSkills, setSelectedSkills] = useState<CraftCategory[]>(['Bamboo crafts', 'Handicrafts', 'Home decor']);

  // Step 3: Business info
  const [businessName, setBusinessName] = useState('Sri Lakshmi Natural Bamboo Weaves');
  const [experienceYears, setExperienceYears] = useState<number>(8);
  const [monthlyIncome, setMonthlyIncome] = useState('₹8,000 - ₹12,000');
  const [productCount, setProductCount] = useState<number>(6);
  const [currentSellingMethod, setCurrentSellingMethod] = useState('Local weekly haat & middlemen');

  // Step 4: What help does she need?
  const [selectedNeeds, setSelectedNeeds] = useState<HelpNeed[]>(['Customers', 'New markets', 'Funding', 'Marketing']);

  // Step 5: Product info
  const [productName, setProductName] = useState('Bamboo Storage Basket');
  const [productCategory, setProductCategory] = useState<CraftCategory>('Bamboo crafts');
  const [productPrice, setProductPrice] = useState<number>(450);
  const [productMaterials, setProductMaterials] = useState('Natural seasoned bamboo, vegetable lacquer');
  const [productDescription, setProductDescription] = useState('Handmade tight-weave multi-purpose storage basket for home and office organizing.');
  const [productImage, setProductImage] = useState('https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800');

  const toggleSkill = (skill: CraftCategory) => {
    if (selectedSkills.includes(skill)) {
      if (selectedSkills.length > 1) {
        setSelectedSkills(selectedSkills.filter(s => s !== skill));
      }
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const toggleNeed = (need: HelpNeed) => {
    if (selectedNeeds.includes(need)) {
      if (selectedNeeds.length > 1) {
        setSelectedNeeds(selectedNeeds.filter(n => n !== need));
      }
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  const handleApplyDemoPreset = () => {
    setName('Lakshmi Devi');
    setAge(34);
    setLocation('Warangal, Telangana');
    setPhone('+91 98480 23456');
    setPreferredLanguage('Telugu & English');
    setSelectedSkills(['Bamboo crafts', 'Handicrafts', 'Home decor']);
    setBusinessName('Sri Lakshmi Natural Bamboo Weaves');
    setExperienceYears(8);
    setMonthlyIncome('₹8,000 - ₹12,000');
    setProductCount(6);
    setCurrentSellingMethod('Local weekly haat & middlemen');
    setSelectedNeeds(['Customers', 'New markets', 'Funding', 'Marketing']);
    setProductName('Bamboo Storage Basket');
    setProductCategory('Bamboo crafts');
    setProductPrice(450);
    setProductMaterials('Natural seasoned bamboo, vegetable lacquer');
    setProductDescription('Handmade tight-weave multi-purpose storage basket for home and office organizing.');
    setProductImage('https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800');
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // confetti fallback
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateOpportunities = () => {
    const newProfile: ArtisanProfile = {
      id: `artisan-${Date.now()}`,
      name: name.trim() || 'Lakshmi Devi',
      age: age || 34,
      location: location.trim() || 'Warangal, Telangana',
      phone: phone.trim() || '+91 98480 23456',
      preferredLanguage: preferredLanguage || 'Telugu & English',
      skills: selectedSkills,
      businessName: businessName.trim() || 'Lakshmi Bamboo Creations',
      experienceYears: experienceYears || 8,
      monthlyIncome: monthlyIncome || '₹8,000 - ₹12,000',
      productCount: productCount || 6,
      currentSellingMethod: currentSellingMethod || 'Local haat',
      needs: selectedNeeds,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      story: `${name} is an artisan from ${location} specializing in ${selectedSkills.join(', ')}. She is moving towards digital self-reliance with SAKHI.`,
      badge: 'Verified Artisan'
    };

    setProfile(newProfile);

    // Also seed the first product into the marketplace if provided
    if (productName) {
      publishProduct({
        artisanId: newProfile.id,
        artisanName: newProfile.name,
        artisanLocation: newProfile.location,
        title: productName,
        category: productCategory,
        price: productPrice || 450,
        materials: productMaterials,
        description: productDescription,
        tags: ['Handmade', productCategory, 'Women Artisan', 'Eco Friendly'],
        targetMarkets: ['Home Decor', 'Eco-friendly Products', 'Corporate Gifting'],
        targetCustomers: ['Conscious Homeowners', 'Eco Buyers'],
        image: productImage,
        isPublished: true,
        rating: 5.0,
        reviewCount: 1
      });
    }

    setCurrentRoute('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Onboarding Header & Quick Fill Bar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#80182C] bg-[#FAF0E6] px-3 py-1 rounded-full border border-[#E8CEBF]">
              Artisan Profile Builder
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2B1015] mt-2">
              Join SAKHI in 5 Simple Steps
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6763] mt-1">
              Your answers help our rule-based engine find the best markets, funding schemes, and mentors for your craft.
            </p>
          </div>

          <button
            onClick={handleApplyDemoPreset}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-[#FAF0E6] hover:bg-[#F3E2D3] text-[#80182C] border border-[#DEBAA6] px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
            title="Auto-fill with official Lakshmi Devi demonstration values"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Fill Lakshmi's Profile</span>
          </button>
        </div>

        {/* Progress Bar */}
        {!isCompleted && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-[#7A6763] mb-2">
              <span>Step {currentStep} of 5: {
                currentStep === 1 ? 'Personal Information' :
                currentStep === 2 ? 'Craft Skills' :
                currentStep === 3 ? 'Business Details' :
                currentStep === 4 ? 'What Help Do You Need?' : 'Your Product'
              }</span>
              <span className="text-[#80182C] font-bold">{Math.round((currentStep / 5) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-[#EADFD3] rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-[#80182C] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Multi-Step Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD3] shadow-md relative">
          
          {/* STEP 1: Personal Information */}
          {currentStep === 1 && !isCompleted && (
            <div className="space-y-6">
              <div className="border-b border-[#F0E6DA] pb-4">
                <h2 className="text-xl font-bold text-[#2B1015]">Step 1: Personal Information</h2>
                <p className="text-xs text-[#7A6763] mt-1">Tell us who you are and where your craft originates.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                    placeholder="e.g. Lakshmi Devi"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                    Age *
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                    min={18}
                    max={90}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                    Location (City / District, State) *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                    placeholder="e.g. Warangal, Telangana"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                    Contact Phone Number *
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                    placeholder="+91 98480 23456"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                    Preferred Language(s)
                  </label>
                  <select
                    value={preferredLanguage}
                    onChange={e => setPreferredLanguage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015] bg-white"
                  >
                    <option value="Telugu & English">Telugu & English</option>
                    <option value="Hindi & English">Hindi & English</option>
                    <option value="Tamil & English">Tamil & English</option>
                    <option value="Bengali & English">Bengali & English</option>
                    <option value="Marathi & English">Marathi & English</option>
                    <option value="Gujarati & English">Gujarati & English</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Skills */}
          {currentStep === 2 && !isCompleted && (
            <div className="space-y-6">
              <div className="border-b border-[#F0E6DA] pb-4">
                <h2 className="text-xl font-bold text-[#2B1015]">Step 2: Your Craft Skills</h2>
                <p className="text-xs text-[#7A6763] mt-1">Select all traditional and modern crafts you practice.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ALL_SKILLS.map(skill => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-[#80182C] text-white border-[#80182C] shadow-xs' 
                          : 'bg-[#FAF8F5] text-[#423330] border-[#E8DFD3] hover:border-[#C85A32]'
                      }`}
                    >
                      <span>{skill}</span>
                      {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                💡 <strong>Demo tip:</strong> Keep <em>Bamboo crafts</em> selected to experience the 91% Corporate Gifting match in your dashboard.
              </div>
            </div>
          )}

          {/* STEP 3: Business Information */}
          {currentStep === 3 && !isCompleted && (
            <div className="space-y-6">
              <div className="border-b border-[#F0E6DA] pb-4">
                <h2 className="text-xl font-bold text-[#2B1015]">Step 3: Business Information</h2>
                <p className="text-xs text-[#7A6763] mt-1">Provide baseline details about your current craft venture.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                    Business or Product Brand Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                    placeholder="e.g. Sri Lakshmi Natural Bamboo Weaves"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                      Years of Craft Experience
                    </label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={e => setExperienceYears(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                      min={0}
                      max={60}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                      Approximate Monthly Income
                    </label>
                    <select
                      value={monthlyIncome}
                      onChange={e => setMonthlyIncome(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015] bg-white"
                    >
                      <option value="Below ₹5,000">Below ₹5,000</option>
                      <option value="₹5,000 - ₹8,000">₹5,000 - ₹8,000</option>
                      <option value="₹8,000 - ₹12,000">₹8,000 - ₹12,000</option>
                      <option value="₹12,000 - ₹20,000">₹12,000 - ₹20,000</option>
                      <option value="Above ₹20,000">Above ₹20,000</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                      Number of Unique Products Created
                    </label>
                    <input
                      type="number"
                      value={productCount}
                      onChange={e => setProductCount(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                      min={1}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                      Current Selling Method
                    </label>
                    <input
                      type="text"
                      value={currentSellingMethod}
                      onChange={e => setCurrentSellingMethod(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                      placeholder="e.g. Local weekly haat & middlemen"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: What help does she need? */}
          {currentStep === 4 && !isCompleted && (
            <div className="space-y-6">
              <div className="border-b border-[#F0E6DA] pb-4">
                <h2 className="text-xl font-bold text-[#2B1015]">Step 4: What Help Do You Need?</h2>
                <p className="text-xs text-[#7A6763] mt-1">Select the key barriers you want SAKHI to help solve.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ALL_NEEDS.map(need => {
                  const isSelected = selectedNeeds.includes(need);
                  return (
                    <button
                      type="button"
                      key={need}
                      onClick={() => toggleNeed(need)}
                      className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-xs' 
                          : 'bg-[#FAF8F5] text-[#423330] border-[#E8DFD3] hover:border-[#C85A32]'
                      }`}
                    >
                      <span>{need}</span>
                      {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900">
                ✨ Choosing <strong>Customers</strong>, <strong>Funding</strong>, and <strong>Marketing</strong> will activate our high-confidence prototype matches.
              </div>
            </div>
          )}

          {/* STEP 5: Product Information */}
          {currentStep === 5 && !isCompleted && (
            <div className="space-y-6">
              <div className="border-b border-[#F0E6DA] pb-4">
                <h2 className="text-xl font-bold text-[#2B1015]">Step 5: Add Your First Product</h2>
                <p className="text-xs text-[#7A6763] mt-1">Enter raw details. SAKHI will generate professional catalog copy next.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={productName}
                      onChange={e => setProductName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                      placeholder="e.g. Bamboo Basket"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                      Category *
                    </label>
                    <select
                      value={productCategory}
                      onChange={e => setProductCategory(e.target.value as CraftCategory)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015] bg-white"
                    >
                      {ALL_SKILLS.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                      Base Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={productPrice}
                      onChange={e => setProductPrice(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                      placeholder="450"
                      min={10}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                      Raw Materials Used *
                    </label>
                    <input
                      type="text"
                      value={productMaterials}
                      onChange={e => setProductMaterials(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                      placeholder="e.g. Seasoned forest bamboo"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#423330] uppercase mb-1.5">
                    Basic Description / Artisan Notes
                  </label>
                  <textarea
                    rows={3}
                    value={productDescription}
                    onChange={e => setProductDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                    placeholder="e.g. Handmade storage basket made from bamboo in Telangana"
                  />
                </div>
              </div>
            </div>
          )}

          {/* COMPLETED SUCCESS SCREEN */}
          {isCompleted && (
            <div className="text-center py-8 space-y-6">
              <div className="w-18 h-18 bg-emerald-100 text-emerald-700 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  Profile Complete
                </span>
                <h2 className="text-3xl font-serif font-black text-[#2B1015] mt-3">
                  Your SAKHI profile is ready!
                </h2>
                <p className="text-sm text-[#5C4D49] max-w-md mx-auto mt-2">
                  Welcome aboard, <strong>{name}</strong>. Our rule-based recommendation engine has analyzed your craft skills and identified matched market, funding, and mentorship opportunities.
                </p>
              </div>

              {/* Profile Card Summary */}
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8DFD3] max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#7A6763]">Craft Specialization:</span>
                  <span className="font-bold text-[#2B1015]">{selectedSkills.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6763]">Location:</span>
                  <span className="font-bold text-[#2B1015]">{location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6763]">Key Priority:</span>
                  <span className="font-bold text-[#2B1015]">{selectedNeeds.join(', ')}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleGenerateOpportunities}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#80182C] hover:bg-[#681323] text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-md transition cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Generate My Opportunities</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls (when not completed) */}
          {!isCompleted && (
            <div className="mt-8 pt-6 border-t border-[#F0E6DA] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A6763] hover:text-[#2B1015] px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 bg-[#80182C] hover:bg-[#681323] text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition cursor-pointer"
              >
                <span>{currentStep === 5 ? 'Finish Profile' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
