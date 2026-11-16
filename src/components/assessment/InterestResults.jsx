import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

export const InterestResults = ({ result, onRetake }) => {
  if (!result || !result.categoryScores) return null;

  const { sortedCategories, topThree, matchingFields, patternSummary } = result;

  // Group categories into intuitive curiosity tiers
  const corePassions = sortedCategories.filter((c) => c.percentage >= 70);
  const supportingInterests = sortedCategories.filter((c) => c.percentage >= 40 && c.percentage < 70);
  const lowFocus = sortedCategories.filter((c) => c.percentage < 40);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 1. Top Banner: Top 3 Curiosities */}
      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-4">
        
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold tracking-wider text-forest-800">
            Your Natural Curiosity Spectrum
          </span>
          <span className="text-[11px] font-mono text-charcoal-400">
            Real Answer-Based Results
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight">
          Where Your Interests Peak
        </h2>

        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed max-w-2xl">
          Based entirely on your answers, here is your genuine interest distribution across 10 core fields. Your scores reveal where you naturally spend mental energy and feel energized.
        </p>

        {/* Top 3 Pills with exact differentiated percentages */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {topThree.map((cat, idx) => (
            <div
              key={cat.id}
              className="px-4 py-2 rounded-2xl bg-forest-50 border border-forest-200 text-forest-900 text-xs font-semibold flex items-center gap-2 shadow-xs"
            >
              <span className="w-5 h-5 rounded-full bg-accent text-on-accent font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                #{idx + 1}
              </span>
              <span>{cat.name}</span>
              <span className="font-mono text-forest-700 font-bold">({cat.percentage}%)</span>
            </div>
          ))}
        </div>

      </div>

      {/* 2. Personalized Interest Pattern Summary */}
      {patternSummary && (
        <div className="bg-card rounded-3xl p-6 sm:p-7 border border-ivory-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-forest-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-forest-700" />
            <span>Your Curiosity Pattern</span>
          </div>

          <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed bg-ivory-50 p-4 rounded-2xl border border-ivory-200">
            {patternSummary}
          </p>

          {/* Curiosity Tiers Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            
            {/* Core Passions */}
            <div className="p-3.5 rounded-2xl border border-forest-200/80 bg-forest-50/50 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 block">
                Core Passions (70%+)
              </span>
              <p className="text-xs font-semibold text-charcoal-800">
                {corePassions.length > 0
                  ? corePassions.map((c) => c.name.split(' & ')[0]).join(', ')
                  : 'Varied focus'}
              </p>
              <p className="text-[11px] text-charcoal-500 leading-snug">
                Your primary sources of intellectual engagement.
              </p>
            </div>

            {/* Supporting Interests */}
            <div className="p-3.5 rounded-2xl border border-ivory-200 bg-ivory-50 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-600 block">
                Supporting (40%–69%)
              </span>
              <p className="text-xs font-semibold text-charcoal-800">
                {supportingInterests.length > 0
                  ? supportingInterests.map((c) => c.name.split(' & ')[0]).join(', ')
                  : 'Balanced across domains'}
              </p>
              <p className="text-[11px] text-charcoal-500 leading-snug">
                Valuable complementary skills and context.
              </p>
            </div>

            {/* Low Daily Focus */}
            <div className="p-3.5 rounded-2xl border border-ivory-200 bg-ivory-50 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">
                Low Daily Focus (&lt;40%)
              </span>
              <p className="text-xs font-semibold text-charcoal-600">
                {lowFocus.length > 0
                  ? lowFocus.map((c) => c.name.split(' & ')[0]).join(', ')
                  : 'None excluded'}
              </p>
              <p className="text-[11px] text-charcoal-500 leading-snug">
                Areas you prefer not to focus on day-to-day.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* 3. All 10 Interest Categories Distribution */}
      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-4">
        
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
            Complete Distribution
          </span>
          <h3 className="text-lg font-bold text-charcoal-900 mt-0.5">
            Interest Spectrum Across All 10 Fields
          </h3>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Ordered from highest to lowest engagement based on your responses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {sortedCategories.map((cat, idx) => {
            const isTop = idx < 3;
            return (
              <div
                key={cat.id}
                className={`p-3.5 rounded-2xl border space-y-1.5 transition-all ${
                  isTop
                    ? 'bg-ivory-50 border-forest-600/30'
                    : 'bg-card border-ivory-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-1.5 truncate pr-2">
                    <span className="font-mono text-[11px] text-charcoal-400">
                      {idx + 1}.
                    </span>
                    <span className={`font-semibold ${isTop ? 'text-charcoal-900' : 'text-charcoal-700'}`}>
                      {cat.name}
                    </span>
                  </div>
                  <span className="font-mono text-forest-800 font-bold shrink-0">
                    {cat.percentage}%
                  </span>
                </div>

                {/* Progress Meter */}
                <div className="w-full h-1.5 bg-ivory-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isTop ? 'bg-accent' : 'bg-charcoal-400'
                    }`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-charcoal-400 pt-0.5">
                  <span className="truncate pr-2">{cat.tagline?.split(',')[0]}</span>
                  <span className="font-medium shrink-0 text-charcoal-500">{cat.tier}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 4. Matching Career Intersections */}
      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
            Exciting Intersections
          </span>
          <h3 className="text-lg font-bold text-charcoal-900 mt-0.5">
            Matching Career Fields
          </h3>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Career paths where your highest curiosity areas naturally blend together.
          </p>
        </div>

        <div className="space-y-3">
          {matchingFields.map((field, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800">
                  {field.synergy}
                </span>
                <span className="font-mono text-[10px] font-bold text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-200">
                  {field.matchPercentage} Fit
                </span>
              </div>

              <h4 className="font-bold text-sm sm:text-base text-charcoal-900">
                {field.title}
              </h4>
              
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {field.explanation}
              </p>

              <div className="pt-1">
                <Link
                  to={field.exploreUrl || `/explore?q=${encodeURIComponent(field.title)}`}
                  className="text-xs font-semibold text-forest-800 hover:text-forest-900 inline-flex items-center gap-1 group"
                >
                  <span>Explore this career path</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={onRetake}
          className="text-xs text-charcoal-500 hover:text-charcoal-800 flex items-center gap-1.5 transition-colors px-2 py-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake interest assessment</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <Link to="/recommendations">
            <Button variant="secondary" size="sm">
              View Recommendations
            </Button>
          </Link>
          <Link to="/assessment/strengths">
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Continue to Strength Assessment
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};
