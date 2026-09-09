import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  ArrowRight, 
  FileText, 
  ExternalLink, 
  HelpCircle,
  Clock,
  Info
} from 'lucide-react';
import { calculateFundingMatches, ScoredFundingOpportunity } from '../utils/matchingEngine';

export const FundingPage: React.FC = () => {
  const { profile, fundingList, applyFundingInquiry } = useApp();
  const scoredFunding = calculateFundingMatches(profile);

  const [activeModalFund, setActiveModalFund] = useState<ScoredFundingOpportunity | null>(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleOpenModal = (fund: ScoredFundingOpportunity) => {
    setActiveModalFund(fund);
    setInquirySubmitted(false);
  };

  const handleApplyDemo = (fundId: string) => {
    applyFundingInquiry(fundId);
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FAF0E6] text-[#80182C] px-3.5 py-1 rounded-full text-xs font-bold border border-[#E8CEBF]">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span>Government & Micro-Grant Opportunities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#2B1015]">
            Collateral-Free Capital & Tool Grants
          </h1>
          <p className="text-sm text-[#7A6763] leading-relaxed">
            Personalized discovery of Indian public schemes and microfinance options aligned with your craft trade, experience, and working capital needs.
          </p>

          {/* Prototype disclaimer banner */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 inline-flex items-center gap-2 text-left">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Demonstration Notice:</strong> Scheme data and match percentages are curated prototype representations for SIH 2026. Official formal applications occur through designated government banking portals.
            </span>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scoredFunding.map(scheme => (
            <div
              key={scheme.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Top Badge & Match Score */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {scheme.schemeType}
                  </span>
                  
                  <div className="flex items-center gap-1.5 bg-[#FAF0E6] px-3 py-1 rounded-full border border-[#E8CEBF]">
                    <Sparkles className="w-3.5 h-3.5 text-[#80182C]" />
                    <span className="text-sm font-black font-serif text-[#80182C]">
                      {scheme.matchScore}% Match
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#2B1015] line-clamp-1">
                  {scheme.name}
                </h3>
                <p className="text-xs text-[#5C4D49] mt-2 leading-relaxed">
                  {scheme.purpose}
                </p>

                {/* Capital & Interest Bar */}
                <div className="mt-4 grid grid-cols-2 gap-3 p-3 bg-[#FAF8F5] rounded-2xl border border-[#F0E6DA] text-xs">
                  <div>
                    <span className="text-[10px] text-[#7A6763] uppercase font-bold">Funding Range</span>
                    <div className="text-sm font-serif font-black text-[#2B1015] mt-0.5">
                      {scheme.amountRange}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A6763] uppercase font-bold">Concessional Rate</span>
                    <div className="text-sm font-serif font-bold text-emerald-700 mt-0.5">
                      {scheme.interestRate}
                    </div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase text-[#7A6763]">Key Benefits:</span>
                  <ul className="space-y-1 text-xs text-[#423330]">
                    {scheme.keyBenefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-[#F0E6DA] flex items-center justify-between">
                <span className="text-xs text-[#7A6763]">
                  Status: <strong className="text-emerald-700">{scheme.applicationStatus || 'Eligible'}</strong>
                </span>
                <button
                  onClick={() => handleOpenModal(scheme)}
                  className="inline-flex items-center gap-1.5 bg-[#80182C] hover:bg-[#681323] text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  <span>View Eligibility & Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Scheme Detail & Eligibility Modal */}
      {activeModalFund && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD3] space-y-5 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-[#F0E6DA] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                  {activeModalFund.schemeType}
                </span>
                <h3 className="text-lg font-bold text-[#2B1015] mt-1">
                  {activeModalFund.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalFund(null)}
                className="p-1 rounded-lg text-[#7A6763] hover:bg-[#FAF8F5] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {inquirySubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-serif font-black text-[#2B1015]">
                  Demo Application Logged!
                </h4>
                <p className="text-xs text-[#5C4D49] leading-relaxed">
                  Your interest in <strong>{activeModalFund.name}</strong> has been logged to your SAKHI dashboard for document preparation assistance.
                </p>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                  ⚠️ <strong>Prototype Note:</strong> No actual financial transaction or official government filing has occurred. SAKHI serves as a readiness and matching tool.
                </div>
                <button
                  onClick={() => setActiveModalFund(null)}
                  className="w-full py-2.5 bg-[#80182C] text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-[#2B1015] uppercase text-[11px] mb-2">
                    Eligibility Checklist:
                  </h4>
                  <ul className="space-y-2 text-[#423330]">
                    {activeModalFund.eligibility.map((crit, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E8DFD3]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{crit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-[#FAF0E6] rounded-xl border border-[#E8CEBF] space-y-1">
                  <div className="font-bold text-[#80182C]">Required Documents for Bank Verification:</div>
                  <p className="text-[11px] text-[#5C4D49]">
                    1. Aadhaar Card • 2. Active Savings Bank Account • 3. Traditional Artisan Trade Proof / SAKHI Product Catalog • 4. Passport Photograph
                  </p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => handleApplyDemo(activeModalFund.id)}
                    className="flex-1 py-3 bg-[#80182C] hover:bg-[#681323] text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition cursor-pointer"
                  >
                    Submit Demo Readiness Inquiry
                  </button>
                  <button
                    onClick={() => setActiveModalFund(null)}
                    className="px-4 py-3 bg-white border border-[#D9CBBF] text-[#423330] font-semibold rounded-xl text-xs transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
