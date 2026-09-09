import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  Globe, 
  X, 
  ShieldCheck, 
  ChevronRight,
  Filter,
  Info
} from 'lucide-react';
import { calculateMentorMatches, ScoredMentor } from '../utils/matchingEngine';

const MENTOR_CATEGORIES = [
  'All',
  'Digital Marketing',
  'Finance',
  'Business Planning',
  'Branding',
  'Social Media',
  'Product Pricing',
  'E-commerce',
  'Entrepreneurship'
];

export const MentorshipPage: React.FC = () => {
  const { profile, requestMentorship } = useApp();
  const scoredMentors = calculateMentorMatches(profile);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeMentorModal, setActiveMentorModal] = useState<ScoredMentor | null>(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [preferredDay, setPreferredDay] = useState('Saturday Afternoon (3:00 PM - 4:00 PM)');
  const [sessionTopic, setSessionTopic] = useState('How to price my handcrafted bamboo baskets fairly for corporate gifting buyers');

  const filteredMentors = useMemo(() => {
    if (selectedCategory === 'All') return scoredMentors;
    return scoredMentors.filter(m => 
      m.expertise.some(exp => exp.toLowerCase().includes(selectedCategory.toLowerCase()))
    );
  }, [scoredMentors, selectedCategory]);

  const handleOpenRequest = (mentor: ScoredMentor) => {
    setActiveMentorModal(mentor);
    setRequestSubmitted(false);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeMentorModal) {
      requestMentorship(activeMentorModal.id);
      setRequestSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FAF0E6] text-[#80182C] px-3.5 py-1 rounded-full text-xs font-bold border border-[#E8CEBF]">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Empowerment & Business Coaching</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#2B1015]">
            Learn from Industry Leaders in Your Language
          </h1>
          <p className="text-sm text-[#7A6763] leading-relaxed">
            Connect with seasoned craft merchandisers, D2C brand experts, and rural finance coaches dedicated to helping women micro-entrepreneurs thrive.
          </p>

          {/* Prototype Notice */}
          <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 inline-flex items-center gap-2 text-left">
            <Info className="w-4 h-4 text-blue-700 shrink-0" />
            <span>
              <strong>Demonstration Notice:</strong> Mentorship requests generate prototype confirmations for jury evaluation. SAKHI plans to route sessions via regional audio phone bridges for low-literacy accessibility.
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {MENTOR_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isSelected 
                    ? 'bg-purple-800 text-white shadow-xs' 
                    : 'bg-white text-[#5C4D49] hover:bg-[#F3EDE6] border border-[#E8DFD3]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMentors.map(mentor => (
            <div
              key={mentor.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Top Avatar & Match Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-100 shadow-xs"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-[#2B1015]">{mentor.name}</h3>
                      <p className="text-xs font-medium text-purple-800">{mentor.role}</p>
                      <p className="text-[11px] text-[#7A6763]">{mentor.organization}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                    <span className="text-sm font-black font-serif text-purple-800">
                      {mentor.matchScore}% Match
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-[#5C4D49] leading-relaxed italic">
                  "{mentor.bio}"
                </p>

                {/* Expertise Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {mentor.expertise.map(exp => (
                    <span key={exp} className="text-[10px] font-semibold bg-[#FAF8F5] text-[#2B1015] px-2.5 py-0.5 rounded-md border border-[#E8DFD3]">
                      {exp}
                    </span>
                  ))}
                </div>

                {/* Rating & Languages Bar */}
                <div className="mt-4 grid grid-cols-2 gap-2 p-3 bg-[#FAF8F5] rounded-2xl border border-[#F0E6DA] text-xs">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-[#2B1015]">{mentor.rating}</span>
                    <span className="text-[10px] text-[#7A6763]">({mentor.reviewsCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#5C4D49]">
                    <Globe className="w-3.5 h-3.5 text-purple-700" />
                    <span className="truncate">{mentor.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#F0E6DA] flex items-center justify-between">
                <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {mentor.availability}
                </span>

                <button
                  onClick={() => handleOpenRequest(mentor)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    mentor.isRequested 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-purple-800 hover:bg-purple-900 text-white shadow-xs'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{mentor.isRequested ? 'Session Requested' : 'Request Mentorship'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Request Mentorship Modal */}
      {activeMentorModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD3] space-y-5 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-[#F0E6DA] pb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={activeMentorModal.avatar}
                  alt={activeMentorModal.name}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-base font-bold text-[#2B1015]">
                    Request Mentorship with {activeMentorModal.name}
                  </h3>
                  <p className="text-xs text-purple-800">{activeMentorModal.role}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveMentorModal(null)}
                className="p-1 rounded-lg text-[#7A6763] hover:bg-[#FAF8F5] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {requestSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-serif font-black text-[#2B1015]">
                  Mentorship Request Confirmed!
                </h4>
                <p className="text-xs text-[#5C4D49] max-w-sm mx-auto leading-relaxed">
                  Your 1-on-1 advisory slot request has been sent to <strong>{activeMentorModal.name}</strong>.
                </p>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-[11px] text-purple-900 text-left space-y-1">
                  <div><strong>Preferred Language:</strong> {activeMentorModal.languages.join(', ')}</div>
                  <div><strong>Topic:</strong> {sessionTopic}</div>
                  <div><strong>Slot:</strong> {preferredDay}</div>
                </div>
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                  💡 <strong>Prototype Confirmation:</strong> This demo confirmation illustrates the seamless booking flow designed for marginalized women artisans.
                </div>
                <button
                  onClick={() => setActiveMentorModal(null)}
                  className="w-full py-2.5 bg-purple-800 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Return to Mentors
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#423330] uppercase mb-1">
                    What would you like guidance on? *
                  </label>
                  <textarea
                    rows={3}
                    value={sessionTopic}
                    onChange={e => setSessionTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-purple-700 focus:outline-none text-xs sm:text-sm text-[#2B1015]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#423330] uppercase mb-1">
                    Preferred Session Timing *
                  </label>
                  <select
                    value={preferredDay}
                    onChange={e => setPreferredDay(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBBF] focus:ring-2 focus:ring-purple-700 focus:outline-none text-sm text-[#2B1015] bg-white"
                  >
                    <option value="Saturday Afternoon (3:00 PM - 4:00 PM)">Saturday Afternoon (3:00 PM - 4:00 PM)</option>
                    <option value="Sunday Morning (11:00 AM - 12:00 PM)">Sunday Morning (11:00 AM - 12:00 PM)</option>
                    <option value="Tuesday Evening (6:00 PM - 7:00 PM)">Tuesday Evening (6:00 PM - 7:00 PM)</option>
                    <option value="Thursday Morning (10:00 AM - 11:00 AM)">Thursday Morning (10:00 AM - 11:00 AM)</option>
                  </select>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFD3] space-y-1">
                  <div className="font-semibold text-purple-800">Regional Language Voice Call Support:</div>
                  <p className="text-[11px] text-[#7A6763]">
                    {activeMentorModal.name} can conduct this consultation in {activeMentorModal.languages.join(', ')} via low-bandwidth phone bridge.
                  </p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-purple-800 hover:bg-purple-900 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition cursor-pointer"
                  >
                    Confirm Mentorship Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMentorModal(null)}
                    className="px-4 py-3 bg-white border border-[#D9CBBF] text-[#423330] font-semibold rounded-xl text-xs transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
