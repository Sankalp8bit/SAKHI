import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  RefreshCw, 
  Layers, 
  Tag, 
  Target, 
  Share2,
  Check,
  PackageCheck,
  AlertCircle
} from 'lucide-react';
import { CraftCategory } from '../types';
import { generateSmartCatalog, GeneratedCatalog } from '../utils/catalogGenerator';
import confetti from 'canvas-confetti';

export const SmartCatalogPage: React.FC = () => {
  const { profile, publishProduct, setCurrentRoute, setSelectedProductId } = useApp();

  // Input states
  const [productName, setProductName] = useState('Bamboo Basket');
  const [category, setCategory] = useState<CraftCategory>('Bamboo crafts');
  const [materials, setMaterials] = useState('Seasoned local bamboo');
  const [location, setLocation] = useState(profile?.location || 'Telangana');
  const [rawDescription, setRawDescription] = useState('Handmade storage basket for everyday home use');
  const [basePrice, setBasePrice] = useState<number>(450);
  const [productImage, setProductImage] = useState('https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<GeneratedCatalog | null>(() => {
    return generateSmartCatalog({
      name: 'Bamboo Basket',
      category: 'Bamboo crafts',
      materials: 'Bamboo',
      location: 'Telangana',
      rawDescription: 'Handmade storage basket',
      basePrice: 450,
      artisanName: profile?.name || 'Lakshmi Devi'
    });
  });

  const [editableTitle, setEditableTitle] = useState(generatedOutput?.enhancedTitle || 'Bamboo Handcrafted Storage Basket');
  const [editableDescription, setEditableDescription] = useState(generatedOutput?.marketingDescription || 'Handwoven bamboo basket made by a skilled artisan from Telangana. Designed for sustainable home storage and everyday use.');
  const [isEditingCopy, setIsEditingCopy] = useState(false);

  const [isPublished, setIsPublished] = useState(false);
  const [newlyPublishedId, setNewlyPublishedId] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const result = generateSmartCatalog({
        name: productName,
        category,
        materials,
        location,
        rawDescription,
        basePrice,
        artisanName: profile?.name || 'Lakshmi Devi'
      });
      setGeneratedOutput(result);
      setEditableTitle(result.enhancedTitle);
      setEditableDescription(result.marketingDescription);
      setIsGenerating(false);
      setIsPublished(false);
    }, 400);
  };

  const handleLoadSample = () => {
    setProductName('Bamboo Basket');
    setCategory('Bamboo crafts');
    setMaterials('Bamboo');
    setLocation('Telangana');
    setRawDescription('Handmade storage basket');
    setBasePrice(450);
    setProductImage('https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800');
    setIsPublished(false);

    const result = generateSmartCatalog({
      name: 'Bamboo Basket',
      category: 'Bamboo crafts',
      materials: 'Bamboo',
      location: 'Telangana',
      rawDescription: 'Handmade storage basket',
      basePrice: 450,
      artisanName: profile?.name || 'Lakshmi Devi'
    });
    setGeneratedOutput(result);
  };

  const handlePublish = () => {
    if (!generatedOutput) return;

    const finalTitle = editableTitle.trim() || generatedOutput.enhancedTitle;
    const finalDescription = editableDescription.trim() || generatedOutput.marketingDescription;

    const published = publishProduct({
      artisanId: profile?.id || 'artisan-lakshmi-01',
      artisanName: profile?.name || 'Lakshmi Devi',
      artisanLocation: location,
      title: finalTitle,
      category,
      price: basePrice,
      materials,
      description: finalDescription,
      tags: generatedOutput.tags,
      targetMarkets: generatedOutput.targetMarkets,
      targetCustomers: generatedOutput.targetCustomers,
      image: productImage,
      isPublished: true,
      rating: 5.0,
      reviewCount: 1
    });

    setNewlyPublishedId(published.id);
    setIsPublished(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // fallback
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFD3] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#80182C] bg-[#FAF0E6] px-3 py-1 rounded-full border border-[#E8CEBF]">
                AI-Driven Smart Cataloging
              </span>
              <span className="text-[11px] text-purple-800 font-semibold bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                Rule-Based Copy Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2B1015] mt-2">
              Transform Raw Notes into E-Commerce Catalogs
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6763] mt-1">
              Input simple craft notes in your own words. SAKHI automatically synthesizes professional titles, customer narratives, SEO tags, and market channels.
            </p>
          </div>

          <button
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-[#FAF0E6] hover:bg-[#F3E2D3] text-[#80182C] border border-[#DEBAA6] px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Load Lakshmi Sample Input</span>
          </button>
        </div>

        {/* Studio Workspace: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Artisan Input Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#F0E6DA] pb-3">
              <h2 className="text-base font-bold text-[#2B1015] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#80182C]" />
                <span>Artisan Input Details</span>
              </h2>
              <span className="text-[11px] text-[#7A6763]">Raw Notes</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#423330] uppercase mb-1">
                  Product Name / Item
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                  placeholder="e.g. Bamboo Basket"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#423330] uppercase mb-1">
                    Craft Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as CraftCategory)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-xs sm:text-sm text-[#2B1015] bg-white"
                  >
                    <option value="Bamboo crafts">Bamboo crafts</option>
                    <option value="Handicrafts">Handicrafts</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Pottery">Pottery</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Embroidery">Embroidery</option>
                    <option value="Home decor">Home decor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#423330] uppercase mb-1">
                    Base Price (₹)
                  </label>
                  <input
                    type="number"
                    value={basePrice}
                    onChange={e => setBasePrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                    placeholder="450"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#423330] uppercase mb-1">
                  Materials Used
                </label>
                <input
                  type="text"
                  value={materials}
                  onChange={e => setMaterials(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                  placeholder="e.g. Bamboo"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#423330] uppercase mb-1">
                  Artisan Region / Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-sm text-[#2B1015]"
                  placeholder="e.g. Telangana"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#423330] uppercase mb-1">
                  Artisan Notes / Description
                </label>
                <textarea
                  rows={3}
                  value={rawDescription}
                  onChange={e => setRawDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-[#80182C] focus:outline-none text-xs sm:text-sm text-[#2B1015]"
                  placeholder="e.g. Handmade storage basket"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 bg-[#80182C] hover:bg-[#681323] text-white font-bold rounded-xl text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Smart Copy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Smart Catalog</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: Generated Output Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {generatedOutput && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD3] shadow-md space-y-6">
                
                {/* Result Status Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0E6DA] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="text-base font-bold text-[#2B1015]">
                      Smart Catalog Generated
                    </h3>
                  </div>

                  {isPublished ? (
                    <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-xs border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Published to Marketplace!</span>
                    </div>
                  ) : (
                    <button
                      onClick={handlePublish}
                      className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-xs cursor-pointer"
                    >
                      <PackageCheck className="w-4 h-4" />
                      <span>Publish to Marketplace</span>
                    </button>
                  )}
                </div>

                {/* Published Notice Banner */}
                {isPublished && (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
                    <div className="flex items-center gap-2 text-xs text-emerald-900 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>This product is now live and discoverable by ethical buyers across India!</span>
                    </div>
                    <button
                      onClick={() => {
                        if (newlyPublishedId) setSelectedProductId(newlyPublishedId);
                        setCurrentRoute('marketplace');
                      }}
                      className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <span>View in Marketplace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Generated Fields */}
                <div className="space-y-5">
                  
                  {/* Title */}
                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] space-y-1 relative group">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#7A6763]">
                      <span>E-Commerce Product Title</span>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsEditingCopy(!isEditingCopy)}
                          className="text-[#80182C] hover:underline cursor-pointer"
                        >
                          {isEditingCopy ? 'Save Edits' : 'Edit Copy'}
                        </button>
                        <span>•</span>
                        <button
                          onClick={() => copyToClipboard(editableTitle, 'title')}
                          className="text-[#80182C] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === 'title' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'title' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    {isEditingCopy ? (
                      <input
                        type="text"
                        value={editableTitle}
                        onChange={e => setEditableTitle(e.target.value)}
                        className="w-full mt-1 p-2 border border-[#80182C] rounded-xl text-base font-bold bg-white text-[#2B1015] focus:outline-none"
                      />
                    ) : (
                      <div className="text-base sm:text-lg font-serif font-black text-[#2B1015]">
                        "{editableTitle}"
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] space-y-1 relative group">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#7A6763]">
                      <span>Storytelling Marketing Description</span>
                      <button
                        onClick={() => copyToClipboard(editableDescription, 'desc')}
                        className="text-[#80182C] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedField === 'desc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === 'desc' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    {isEditingCopy ? (
                      <textarea
                        rows={3}
                        value={editableDescription}
                        onChange={e => setEditableDescription(e.target.value)}
                        className="w-full mt-1 p-2 border border-[#80182C] rounded-xl text-xs sm:text-sm bg-white text-[#2B1015] focus:outline-none"
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-[#423330] leading-relaxed italic">
                        "{editableDescription}"
                      </p>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] space-y-2">
                    <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#7A6763]">
                      <Tag className="w-3.5 h-3.5 text-[#80182C]" />
                      <span>Product Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {generatedOutput.tags.map(t => (
                        <span key={t} className="text-xs font-semibold bg-white text-[#80182C] px-3 py-1 rounded-full border border-[#E8CEBF]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Target Markets & Customers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] space-y-2">
                      <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                        <Target className="w-3.5 h-3.5" />
                        <span>Target Markets</span>
                      </div>
                      <ul className="space-y-1 text-xs text-[#423330]">
                        {generatedOutput.targetMarkets.map((m, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3] space-y-2">
                      <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-purple-800">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Target Customers</span>
                      </div>
                      <ul className="space-y-1 text-xs text-[#423330]">
                        {generatedOutput.targetCustomers.map((c, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing Strategy Suggestion */}
                  <div className="p-4 bg-[#FAF0E6] rounded-2xl border border-[#E8CEBF] space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#80182C]">
                      Fair Trade Pricing Intelligence
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center pt-1">
                      <div className="bg-white p-2 rounded-xl border border-[#E8DFD3]">
                        <div className="text-[10px] text-[#7A6763]">Artisan Base</div>
                        <div className="text-sm font-bold text-[#2B1015]">₹{basePrice}</div>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-emerald-300 bg-emerald-50/50">
                        <div className="text-[10px] text-emerald-800 font-semibold">Rec. Retail Price</div>
                        <div className="text-sm font-bold text-emerald-800">
                          ₹{generatedOutput.suggestedRetailPrice.min} - ₹{generatedOutput.suggestedRetailPrice.max}
                        </div>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-[#E8DFD3]">
                        <div className="text-[10px] text-[#7A6763]">Bulk Corporate</div>
                        <div className="text-sm font-bold text-[#80182C]">
                          ₹{generatedOutput.suggestedRetailPrice.bulkWholesale}/unit
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Big Action Publish Button */}
                {!isPublished && (
                  <button
                    onClick={handlePublish}
                    className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PackageCheck className="w-5 h-5" />
                    <span>Publish Directly to SAKHI Marketplace</span>
                  </button>
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
