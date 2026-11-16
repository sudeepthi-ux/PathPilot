import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { careerCategories } from '../data/careersData';
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';
import { RoleDetailModal } from '../components/common/RoleDetailModal';

export const ExplorePage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [selectedCat, setSelectedCat] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [inspectedRole, setInspectedRole] = useState(null);

  // Flatten roles with category metadata
  const allRoles = useMemo(() => {
    return careerCategories.flatMap(cat => 
      cat.roles.map(r => ({
        ...r,
        categoryName: cat.name,
        categoryId: cat.id
      }))
    );
  }, []);

  const filteredRoles = useMemo(() => {
    return allRoles.filter(role => {
      if (selectedCat !== 'all' && role.categoryId !== selectedCat) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = role.title.toLowerCase().includes(query);
        const matchesSkills = role.coreSkills.some(s => s.toLowerCase().includes(query));
        const matchesCategory = role.categoryName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSkills && !matchesCategory) return false;
      }
      return true;
    });
  }, [allRoles, selectedCat, searchQuery]);

  return (
    <div className="pt-24 pb-20 bg-ivory-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="max-w-xl mb-10 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900">
            Discover Career Fields
          </h1>
          <p className="text-sm text-charcoal-600">
            Explore modern careers across design, science, technology, and society in plain, simple terms.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-card p-4 rounded-3xl border border-ivory-200 shadow-sm mb-8 space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role or skill (e.g., 'Design', 'Python', 'Biology')..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-ivory-50 border border-ivory-200 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setSelectedCat('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCat === 'all'
                    ? 'bg-accent text-on-accent'
                    : 'bg-ivory-50 text-charcoal-700 hover:bg-muted'
                }`}
              >
                All Fields
              </button>
              {careerCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCat === cat.id
                      ? 'bg-accent text-on-accent'
                      : 'bg-ivory-50 text-charcoal-700 hover:bg-muted'
                  }`}
                >
                  {cat.name.split(' & ')[0]}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="bg-card rounded-3xl p-6 border border-ivory-200 hover:border-charcoal-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-forest-800">
                  {role.categoryName}
                </span>

                <h3 className="font-bold text-base text-charcoal-900 tracking-tight leading-snug">
                  {role.title}
                </h3>

                <p className="text-xs text-charcoal-600 leading-relaxed">
                  {role.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {role.coreSkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-ivory-50 border border-ivory-200 text-charcoal-600"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-ivory-200 flex items-center justify-between">
                <span className="text-[11px] text-charcoal-400">
                  {role.growth}
                </span>
                <button
                  onClick={() => setInspectedRole(role)}
                  className="text-xs font-semibold text-forest-800 hover:text-forest-900 inline-flex items-center gap-1 group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Role Detail Modal */}
      <RoleDetailModal
        isOpen={!!inspectedRole}
        onClose={() => setInspectedRole(null)}
        role={inspectedRole}
        onStartBlueprint={() => {}}
      />
    </div>
  );
};
