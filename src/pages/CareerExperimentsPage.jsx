import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  careerExperiments, 
  experimentCategories,
  getRecommendedExperiments 
} from '../data/careerExperimentsData';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Play, 
  Compass, 
  Search,
  Filter,
  Award,
  RotateCcw,
  BookOpen,
  Check
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const CareerExperimentsPage = () => {
  const { studentProfile, toggleCompleteExperiment } = useAuth();
  const completedExperiments = studentProfile.completedExperiments || [];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'completed', 'uncompleted'

  // Top recommendations based on student's assessment profile
  const recommendedExperiments = useMemo(() => {
    return getRecommendedExperiments(studentProfile);
  }, [studentProfile]);

  // Filtered experiments
  const filteredExperiments = useMemo(() => {
    return careerExperiments.filter((exp) => {
      // Category filter
      if (selectedCategory !== 'all' && exp.categoryId !== selectedCategory) {
        return false;
      }

      // Status filter
      const isCompleted = completedExperiments.includes(exp.id);
      if (statusFilter === 'completed' && !isCompleted) return false;
      if (statusFilter === 'uncompleted' && isCompleted) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = exp.title.toLowerCase().includes(query);
        const matchesRole = exp.roleName.toLowerCase().includes(query);
        const matchesCategory = exp.categoryName.toLowerCase().includes(query);
        const matchesSkills = exp.skillsGained.some((s) => s.toLowerCase().includes(query));
        const matchesTagline = exp.tagline.toLowerCase().includes(query);
        return matchesTitle || matchesRole || matchesCategory || matchesSkills || matchesTagline;
      }

      return true;
    });
  }, [selectedCategory, statusFilter, searchQuery, completedExperiments]);

  const totalCount = careerExperiments.length;
  const completedCount = completedExperiments.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Collect all unique skills discovered through completed experiments
  const skillsDiscovered = useMemo(() => {
    const skills = new Set();
    completedExperiments.forEach((expId) => {
      const exp = careerExperiments.find((e) => e.id === expId);
      if (exp && exp.skillsGained) {
        exp.skillsGained.forEach((s) => skills.add(s));
      }
    });
    return Array.from(skills);
  }, [completedExperiments]);

  return (
    <div className="pt-24 pb-20 bg-ivory-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200/80 text-forest-800 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-forest-700" />
            <span>Career Exploration Lab • 10 Fields</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-charcoal-900 leading-[1.15]">
            Test-drive a career <br />
            <span className="font-serif italic font-normal text-forest-800">
              before choosing one.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            Step into real-world challenges faced by engineers, designers, analysts, and founders. Experience the day-to-day decisions, discover your natural strengths, and build verified skills in 4-minute interactive simulations.
          </p>
        </div>

        {/* Lab Progress & Skills Summary Card */}
        <div className="bg-card rounded-3xl p-6 sm:p-7 border border-ivory-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-sm shrink-0">
                <Sparkles className="w-5 h-5 text-forest-700" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-charcoal-900">
                  Your Exploration Progress
                </h3>
                <p className="text-xs text-charcoal-500">
                  {completedCount} of {totalCount} career simulations completed ({progressPercent}%)
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-ivory-50 border border-ivory-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Discovered Skills Tag Preview */}
            {skillsDiscovered.length > 0 && (
              <div className="pt-1 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 mr-1">
                  Skills Discovered:
                </span>
                {skillsDiscovered.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-forest-50 border border-forest-200 text-forest-800 font-medium"
                  >
                    ✓ {skill}
                  </span>
                ))}
                {skillsDiscovered.length > 6 && (
                  <span className="text-[10px] text-charcoal-400 font-medium">
                    +{skillsDiscovered.length - 6} more
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <Link to="/recommendations">
              <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                View Recommendations
              </Button>
            </Link>
          </div>
        </div>

        {/* Recommended For You Section */}
        {recommendedExperiments.length > 0 && (
          <div className="bg-card rounded-3xl p-6 sm:p-7 border border-forest-200/70 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-forest-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                <span>Recommended Based on Your Interests</span>
              </div>
              <span className="text-[11px] font-mono text-charcoal-400">
                Curated Lab Picks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedExperiments.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 flex flex-col justify-between space-y-3 hover:border-forest-600/40 transition-all"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-forest-800">
                      <span>{exp.categoryName}</span>
                      <span className="text-charcoal-500">{exp.timeEstimate}</span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-charcoal-900 leading-snug">
                      {exp.title}
                    </h4>
                    <p className="text-[11px] text-charcoal-600 line-clamp-2 leading-relaxed">
                      {exp.tagline}
                    </p>
                  </div>

                  <Link to={`/experiments/${exp.id}`}>
                    <Button variant="primary" size="sm" icon={Play} iconPosition="left" className="w-full text-xs">
                      Try Simulation
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters & 10 Category Tabs */}
        <div className="space-y-5">
          
          {/* Top Search & Status Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search experiments by role, title, or skill..."
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-card border border-ivory-200 text-xs font-medium text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30 focus:border-accent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-400 hover:text-charcoal-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Segment Control */}
            <div className="flex items-center gap-1 p-1 bg-card border border-ivory-200 rounded-2xl shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  statusFilter === 'all'
                    ? 'bg-accent text-on-accent shadow-xs'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('completed')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  statusFilter === 'completed'
                    ? 'bg-accent text-on-accent shadow-xs'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                Completed ({completedCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('uncompleted')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  statusFilter === 'uncompleted'
                    ? 'bg-accent text-on-accent shadow-xs'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                In Progress ({totalCount - completedCount})
              </button>
            </div>

          </div>

          {/* 10 Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all shrink-0 border ${
                selectedCategory === 'all'
                  ? 'bg-accent text-on-accent border-accent shadow-sm'
                  : 'bg-card text-charcoal-700 border-ivory-200 hover:border-charcoal-300'
              }`}
            >
              All Labs ({careerExperiments.length})
            </button>

            {experimentCategories.map((cat, idx) => {
              const count = careerExperiments.filter((e) => e.categoryId === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all shrink-0 border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-accent text-on-accent border-accent shadow-sm'
                      : 'bg-card text-charcoal-700 border-ivory-200 hover:border-charcoal-300'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-70">{idx + 1}.</span>
                  <span>{cat.name}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-accent-soft' : 'text-charcoal-400'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Experiment Cards Grid */}
        {filteredExperiments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredExperiments.map((exp) => {
              const isCompleted = completedExperiments.includes(exp.id);
              return (
                <div
                  key={exp.id}
                  className={`rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between space-y-5 ${
                    isCompleted
                      ? 'bg-ivory-50 border-forest-600/30 shadow-xs'
                      : 'bg-card border-ivory-200 hover:border-charcoal-300 shadow-sm'
                  }`}
                >
                  <div className="space-y-3.5">
                    
                    {/* Top Meta Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-200">
                          {exp.categoryName}
                        </span>
                        <span className="text-xs font-semibold text-charcoal-700">
                          {exp.roleName}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] font-medium text-charcoal-500 bg-ivory-50 border border-ivory-200 px-2 py-0.5 rounded-full">
                          {exp.timeEstimate}
                        </span>
                        <span className="text-[10px] font-medium text-charcoal-500 bg-ivory-50 border border-ivory-200 px-2 py-0.5 rounded-full">
                          {exp.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg text-charcoal-900 tracking-tight leading-snug">
                      {exp.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs text-charcoal-600 leading-relaxed">
                      {exp.tagline}
                    </p>

                    {/* Objective Box */}
                    {exp.objective && (
                      <div className="p-3 rounded-2xl bg-ivory-50 border border-ivory-200/80 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block">
                          Mission Objective:
                        </span>
                        <p className="text-[11px] text-charcoal-700 leading-relaxed">
                          {exp.objective}
                        </p>
                      </div>
                    )}

                    {/* Skills Discovered Badges */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">
                        Skills Discovered:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skillsGained.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] px-2.5 py-0.5 rounded-full bg-card border border-ivory-200 text-charcoal-600 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-4 border-t border-ivory-200 flex items-center justify-between gap-2">
                    
                    {/* Toggle Completion directly */}
                    <button
                      type="button"
                      onClick={() => toggleCompleteExperiment(exp.id, exp.title)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl transition-all ${
                        isCompleted
                          ? 'text-forest-800 hover:text-forest-900 bg-forest-50 border border-forest-200'
                          : 'text-charcoal-400 hover:text-charcoal-700 hover:bg-ivory-50'
                      }`}
                      title={isCompleted ? "Mark incomplete" : "Mark as completed"}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isCompleted ? 'bg-accent border-accent text-on-accent' : 'border-charcoal-300 bg-card'
                      }`}>
                        {isCompleted && <Check className="w-2.5 h-2.5 text-on-accent" />}
                      </div>
                      <span className="text-[11px]">{isCompleted ? 'Completed' : 'Mark Done'}</span>
                    </button>

                    {/* Start / Play Simulation Button */}
                    <Link to={`/experiments/${exp.id}`}>
                      <Button
                        variant={isCompleted ? "secondary" : "primary"}
                        size="sm"
                        icon={isCompleted ? RotateCcw : Play}
                        iconPosition="left"
                      >
                        {isCompleted ? "Play Again" : "Start Simulation"}
                      </Button>
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card rounded-3xl p-12 text-center border border-ivory-200 shadow-sm space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-forest-50 text-forest-800 flex items-center justify-center mx-auto">
              <Search className="w-5 h-5 text-forest-700" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-charcoal-900">
                No experiments match your search
              </h3>
              <p className="text-xs text-charcoal-500">
                Try searching for another skill, or clear your category filter.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-forest-800 hover:text-forest-900 underline"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Motivational note */}
        <p className="text-center text-xs text-charcoal-400 font-serif italic pt-4">
          "Try before you decide. Your natural curiosity will reveal your path."
        </p>

      </div>
    </div>
  );
};
