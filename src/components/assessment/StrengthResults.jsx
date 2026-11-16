import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw, CheckCircle2, Zap, Compass } from 'lucide-react';
import { Button } from '../common/Button';

export const StrengthResults = ({ result, onRetake }) => {
  if (!result || !result.rankedPillars) return null;

  const {
    signatureTitle,
    summary,
    rankedPillars,
    topStrengths = [],
    preferences = {},
    recommendedCareers = []
  } = result;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Signature Strengths Card */}
      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold tracking-wider text-forest-800 inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-forest-700" />
            <span>Your Capability Signature</span>
          </span>
          <span className="text-[11px] font-mono text-charcoal-400">
            Answer-Based Analysis
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight">
          {signatureTitle}
        </h2>

        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
          {summary}
        </p>

        {/* Four Strength Pillar Bars */}
        <div className="pt-4 border-t border-ivory-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {rankedPillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className={`p-3.5 rounded-2xl border space-y-1.5 ${
                idx === 0
                  ? 'bg-forest-50/70 border-forest-300'
                  : 'bg-ivory-50 border-ivory-200'
              }`}
            >
              <div className="flex justify-between items-center text-xs font-medium text-charcoal-800 gap-2">
                <span className="truncate">{pillar.label}</span>
                <span className="font-mono text-forest-800 font-bold shrink-0">
                  {pillar.score}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-ivory-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${pillar.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Identified Strengths & Work Preferences */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-charcoal-900">Your Identified Strengths</h3>
          <ul className="space-y-2 text-xs text-charcoal-700">
            {topStrengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-charcoal-900">Work &amp; Learning Preferences</h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-2xl bg-ivory-50 border border-ivory-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block">
                Team Role
              </span>
              <p className="font-semibold text-charcoal-900 mt-0.5">{preferences.teamRole}</p>
            </div>
            <div className="p-3 rounded-2xl bg-ivory-50 border border-ivory-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block">
                Ideal Environment
              </span>
              <p className="text-charcoal-700 mt-0.5 leading-snug">{preferences.workingEnvironment}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suitable Career Matches */}
      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 inline-flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-forest-700" />
            <span>Strength-Matched Career Paths</span>
          </span>
          <h3 className="text-lg font-bold text-charcoal-900 mt-0.5">
            Roles Built Around What You Do Best
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recommendedCareers.map((career) => (
            <div
              key={career.id}
              className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-xs text-charcoal-900">{career.title}</h4>
                  <span className="text-[10px] font-mono font-bold text-forest-800 shrink-0">
                    {career.match}
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-600 leading-snug">{career.reason}</p>
              </div>
              <Link
                to={`/careers/${career.id}`}
                className="text-[11px] font-semibold text-forest-800 hover:text-forest-900 inline-flex items-center gap-1 pt-1"
              >
                <span>View Career Profile →</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onRetake}
          className="text-xs text-charcoal-500 hover:text-charcoal-800 flex items-center gap-1.5 transition-colors px-2 py-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake strength assessment</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <Link to="/recommendations">
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              View Personalized Recommendations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
