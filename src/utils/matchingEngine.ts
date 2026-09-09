import { ArtisanProfile, MarketOpportunity, FundingOpportunity, Mentor } from '../types';
import { MOCK_MARKET_OPPORTUNITIES, MOCK_FUNDING_OPPORTUNITIES, MOCK_MENTORS } from '../data/mockData';

export interface ScoreExplanation {
  factor: string;
  points: number;
  description: string;
}

export interface ScoredMarketOpportunity extends MarketOpportunity {
  explanation: ScoreExplanation[];
}

export interface ScoredFundingOpportunity extends FundingOpportunity {
  explanation: ScoreExplanation[];
}

export interface ScoredMentor extends Mentor {
  explanation: ScoreExplanation[];
}

export function calculateMarketMatches(profile?: ArtisanProfile | null): ScoredMarketOpportunity[] {
  if (!profile) {
    return MOCK_MARKET_OPPORTUNITIES.map(item => ({
      ...item,
      explanation: [
        { factor: 'Sector Alignment', points: 40, description: 'Matches standard craft artisan categories' },
        { factor: 'General Market Demand', points: Math.max(20, item.matchScore - 40), description: 'High buyer inquiries on platform' }
      ]
    }));
  }

  return MOCK_MARKET_OPPORTUNITIES.map(item => {
    const explanations: ScoreExplanation[] = [];
    let score = 50; // base score

    const hasBamboo = profile.skills.some(s => s.toLowerCase().includes('bamboo'));
    const hasHomeDecor = profile.skills.some(s => s.toLowerCase().includes('decor'));
    const hasTextile = profile.skills.some(s => s.toLowerCase().includes('textile'));
    const needsMarkets = profile.needs.includes('New markets') || profile.needs.includes('Customers');

    if (item.id === 'mkt-01') { // Corporate Gifting
      if (hasBamboo) {
        score += 20;
        explanations.push({ factor: 'Skill Match (Bamboo Crafts)', points: 20, description: 'Corporate gifting has high demand for eco-friendly woven bamboo hampers' });
      }
      if (needsMarkets) {
        score += 12;
        explanations.push({ factor: 'Artisan Priority Match', points: 12, description: 'Artisan explicitly requested new customer and corporate markets' });
      }
      if (profile.location.toLowerCase().includes('telangana')) {
        score += 9;
        explanations.push({ factor: 'Regional Logistics Hub', points: 9, description: 'Proximity to Hyderabad corporate tech parks enables low-cost delivery' });
      }
      // Target calibrated demo score = 91%
      return { ...item, matchScore: Math.min(99, Math.max(70, score)), explanation: explanations };
    }

    if (item.id === 'mkt-02') { // Sustainable Home Decor
      if (hasHomeDecor || hasBamboo) {
        score += 22;
        explanations.push({ factor: 'Product Utility Alignment', points: 22, description: 'Handcrafted baskets and storage products align with urban decor trends' });
      }
      if (profile.experienceYears >= 5) {
        score += 16;
        explanations.push({ factor: 'Artisan Experience', points: 16, description: `${profile.experienceYears} years experience ensures finish quality demanded by boutique buyers` });
      }
      return { ...item, matchScore: 88, explanation: explanations };
    }

    return {
      ...item,
      explanation: [
        { factor: 'Category Relevance', points: 40, description: 'Matches artisan handcrafted product focus' },
        { factor: 'Market Reach', points: item.matchScore - 40, description: 'Active buyer network on SAKHI' }
      ]
    };
  });
}

export function calculateFundingMatches(profile?: ArtisanProfile | null): ScoredFundingOpportunity[] {
  if (!profile) {
    return MOCK_FUNDING_OPPORTUNITIES.map(f => ({
      ...f,
      explanation: [{ factor: 'Public Scheme Eligibility', points: f.matchScore, description: 'Standard government criteria for rural craft micro-enterprises' }]
    }));
  }

  return MOCK_FUNDING_OPPORTUNITIES.map(fund => {
    const explanations: ScoreExplanation[] = [];

    if (fund.id === 'fnd-01') { // MUDRA Kishore
      explanations.push({ factor: 'Enterprise Stage', points: 35, description: 'Ideal for transitioning from informal haat selling to formal micro-enterprise' });
      explanations.push({ factor: 'Collateral-Free Preference', points: 30, description: 'Tailored for women micro-entrepreneurs without commercial land ownership' });
      if (profile.needs.includes('Funding')) {
        explanations.push({ factor: 'Urgent Capital Need', points: 22, description: 'Artisan flagged working capital and tool procurement as key priority' });
      }
      // Demo score: 87%
      return { ...fund, matchScore: 87, explanation: explanations };
    }

    if (fund.id === 'fnd-02') { // PM Vishwakarma
      explanations.push({ factor: 'Traditional Trade Recognition', points: 45, description: 'Basket weaving and cane craftsmanship is officially recognized under PM Vishwakarma' });
      explanations.push({ factor: 'Tool Voucher Incentive', points: 30, description: 'Direct ₹15,000 grant for modern splitters and weaving frames' });
      explanations.push({ factor: 'Concessional Interest', points: 17, description: '5% interest rate minimizes debt burden for solo women producers' });
      // Demo score: 92%
      return { ...fund, matchScore: 92, explanation: explanations };
    }

    return {
      ...fund,
      explanation: [
        { factor: 'Scheme Criteria', points: 45, description: 'Applicable for registered women artisan clusters' },
        { factor: 'Financial Readiness', points: fund.matchScore - 45, description: 'Favorable term eligibility' }
      ]
    };
  });
}

export function calculateMentorMatches(profile?: ArtisanProfile | null): ScoredMentor[] {
  if (!profile) {
    return MOCK_MENTORS.map(m => ({
      ...m,
      explanation: [{ factor: 'Domain Expertise', points: m.matchScore, description: 'Expert in craft enterprise development' }]
    }));
  }

  return MOCK_MENTORS.map(mentor => {
    const explanations: ScoreExplanation[] = [];

    if (mentor.id === 'mnt-01') { // Ananya Rao
      if (profile.needs.includes('Marketing') || profile.needs.includes('Customers')) {
        explanations.push({ factor: 'Direct Goal Alignment', points: 40, description: 'Artisan requested Marketing & Customer growth; Ananya specializes in craft brand storytelling' });
      }
      if (profile.preferredLanguage.toLowerCase().includes('telugu')) {
        explanations.push({ factor: 'Language Compatibility', points: 28, description: 'Mentor speaks Telugu fluently, enabling comfortable 1-on-1 audio advisory' });
      }
      explanations.push({ factor: 'Sector Track Record', points: 26, description: 'Proven impact helping 80+ grassroots women craft producers double income' });
      // Demo score: 94%
      return { ...mentor, matchScore: 94, explanation: explanations };
    }

    if (mentor.id === 'mnt-02') { // Rajeshwari Iyer
      explanations.push({ factor: 'Pricing Transparency', points: 45, description: 'Guides artisans on fair hourly labor costing rather than middleman dictated rates' });
      explanations.push({ factor: 'Language Bridge', points: 24, description: 'Speaks Telugu and English for easy communication' });
      explanations.push({ factor: 'Unit Economics Mastery', points: 20, description: '15 years specialized experience in South Indian handicraft pricing' });
      return { ...mentor, matchScore: 89, explanation: explanations };
    }

    return {
      ...mentor,
      explanation: [
        { factor: 'Business Mentorship', points: 45, description: 'Specialized domain guidance for scaling artisans' },
        { factor: 'Availability', points: mentor.matchScore - 45, description: 'Regular open advisory office hours' }
      ]
    };
  });
}
