import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

export const PersonalityResults = ({ result, onRetake }) => {
  if (!result || !result.archetype) return null;

  const { archetype, scores } = result;

  const dimensions = [
    { label: "Systems & Logical Thinking", score: scores.systems },
    { label: "Creativity & Innovation", score: scores.ambiguity },
    { label: "Empathy & Teamwork", score: scores.empathy },
    { label: "Focus & Craftsmanship", score: scores.grit }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Card: Archetype */}
      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-4">
        
        <span className="text-xs uppercase font-bold tracking-wider text-forest-800">
          Your Natural Profile
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight">
          {archetype.title}
        </h2>

        <p className="font-serif italic text-base text-charcoal-700 leading-relaxed">
          "{archetype.quote}"
        </p>

        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
          {archetype.overview}
        </p>

        {/* Dimension Bars */}
        <div className="pt-4 border-t border-ivory-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dimensions.map((dim) => (
            <div key={dim.label} className="p-3 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-1">
              <div className="flex justify-between text-xs font-medium text-charcoal-700">
                <span>{dim.label}</span>
                <span className="font-mono text-forest-800 font-bold">{dim.score}%</span>
              </div>
              <div className="w-full h-1.5 bg-ivory-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${dim.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Strengths & Working Style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Core Strengths */}
        <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-charcoal-900">Your Natural Strengths</h3>
          <ul className="space-y-2 text-xs text-charcoal-600">
            {archetype.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Working Style */}
        <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-charcoal-900">How You Work Best</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed bg-ivory-50 p-3.5 rounded-2xl border border-ivory-200">
            {archetype.workingStyle}
          </p>
        </div>

      </div>

      {/* Recommended Careers */}
      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
            Matching Paths
          </span>
          <h3 className="text-lg font-bold text-charcoal-900 mt-0.5">
            Careers that fit your thinking style
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {archetype.recommendedCareers.map((car, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-xs text-charcoal-900">{car.title}</h4>
                  {car.match && (
                    <span className="text-[10px] font-mono font-bold text-forest-800 shrink-0">
                      {car.match}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-charcoal-600 mt-1 leading-snug">{car.reason}</p>
              </div>
              <Link
                to={car.id ? `/careers/${car.id}` : `/explore?q=${encodeURIComponent(car.title)}`}
                className="text-[11px] font-semibold text-forest-800 hover:text-forest-900 inline-flex items-center gap-1 pt-1"
              >
                <span>View Career Profile →</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Action footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={onRetake}
          className="text-xs text-charcoal-500 hover:text-charcoal-800 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake assessment</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <Link to="/assessment/strengths">
            <Button variant="secondary" size="sm">
              Try Strength Assessment
            </Button>
          </Link>
          <Link to="/assessment/interests">
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Continue to Interest Assessment
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};
