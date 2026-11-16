import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { careerLibraryCategories, allCareers } from '../data/careerLibraryData';
import { useAuth } from '../context/AuthContext';
import { Search, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';

export const CareerLibraryPage = () => {
  const [searchParams] = useSearchParams();
  const { studentProfile, toggleSaveCareer } = useAuth();
  const savedCareers = studentProfile?.savedCareers || [];

  const [selectedCat, setSelectedCat] = useState(searchParams.get('cat') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const urlCat = searchParams.get('cat');
    const urlQuery = searchParams.get('q');
    if (urlCat) setSelectedCat(urlCat);
    if (urlQuery !== null) setSearchQuery(urlQuery);
  }, [searchParams]);

  const filteredCareers = useMemo(() => {
    return allCareers.filter((career) => {
      // Category filter
      if (selectedCat !== 'all' && career.categoryId !== selectedCat) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = career.title.toLowerCase().includes(query);
        const matchesTagline = career.tagline.toLowerCase().includes(query);
        const matchesCategory = career.categoryName.toLowerCase().includes(query);
        const matchesSkills = (career.technicalSkills || []).concat(career.softSkills || []).some(s => s.toLowerCase().includes(query));
        if (!matchesTitle && !matchesTagline && !matchesCategory && !matchesSkills) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCat, searchQuery]);

  return (
    <div className="pt-24 pb-20 bg-ivory-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
            Career Discovery Library
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-charcoal-900 leading-tight">
            Explore 15 Career Fields <br />
            <span className="font-serif italic font-normal text-forest-800">
              in simple, plain language.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            Browse through real professions across design, science, technology, public service, and the arts. Learn what people actually do, the tools they use, and beginner projects you can try.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-card rounded-3xl p-5 border border-ivory-200 shadow-sm space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search careers by name or skill (e.g. 'Product Designer', 'Python', 'Biology', 'Architecture')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-200 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-forest-800"
            />
          </div>

          {/* 15 Category Horizontal Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCat === 'all'
                  ? 'bg-accent text-on-accent'
                  : 'bg-ivory-50 text-charcoal-700 hover:bg-muted'
              }`}
            >
              All Careers ({allCareers.length})
            </button>
            {careerLibraryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCat === cat.id
                    ? 'bg-accent text-on-accent'
                    : 'bg-ivory-50 text-charcoal-700 hover:bg-muted'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-charcoal-500">
          <span>Showing {filteredCareers.length} career options</span>
          {selectedCat !== 'all' && (
            <button
              onClick={() => setSelectedCat('all')}
              className="text-forest-800 font-semibold hover:underline"
            >
              Reset category filter
            </button>
          )}
        </div>

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => {
            const isSaved = savedCareers.some((c) => c.id === career.id || c.title === career.title);
            return (
              <Link
                key={career.id}
                to={`/careers/${career.id}`}
                className="bg-card rounded-3xl p-6 border border-ivory-200 hover:border-charcoal-400 hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-forest-800">
                      {career.categoryName}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSaveCareer(career);
                      }}
                      aria-label={isSaved ? `Remove ${career.title} from saved careers` : `Save ${career.title}`}
                      className={`p-1.5 rounded-full border transition-colors ${
                        isSaved
                          ? 'bg-accent text-on-accent border-accent'
                          : 'bg-ivory-50 text-charcoal-500 border-ivory-200 hover:text-charcoal-900'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-accent-soft" /> : <Bookmark className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <h3 className="font-bold text-base text-charcoal-900 group-hover:text-forest-900 transition-colors">
                    {career.title}
                  </h3>

                  <p className="text-xs text-charcoal-600 leading-relaxed line-clamp-2">
                    {career.tagline}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {(career.technicalSkills || []).slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-ivory-50 border border-ivory-200 text-charcoal-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-ivory-200 flex items-center justify-between">
                  <span className="text-[11px] text-charcoal-400">
                    Read full overview
                  </span>
                  <span className="text-xs font-semibold text-forest-800 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Motivational Quote */}
        <p className="text-center text-xs text-charcoal-400 font-serif italic pt-6">
          "Your future has more possibilities than you think."
        </p>

      </div>
    </div>
  );
};
