import React, { useState, useEffect } from 'react';
import { inspirationalQuotes } from '../../data/inspirationalQuotes';
import { Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const QuoteCard = () => {
  const [index, setIndex] = useState(0);

  // Auto-rotate quote every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const current = inspirationalQuotes[index];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + inspirationalQuotes.length) % inspirationalQuotes.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % inspirationalQuotes.length);
  };

  return (
    <div className="bg-sand-50/70 rounded-3xl p-6 sm:p-7 border border-ivory-200 relative overflow-hidden transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 text-forest-800">
          <Sparkles className="w-4 h-4 text-forest-700" />
          <span className="text-[11px] uppercase font-bold tracking-wider text-forest-800">
            Daily Trajectory Insight • {current.category}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-800 hover:bg-card/80 transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono text-charcoal-400">
            {index + 1}/{inspirationalQuotes.length}
          </span>
          <button
            onClick={handleNext}
            className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-800 hover:bg-card/80 transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="py-4">
        <p className="text-base sm:text-lg text-charcoal-800 font-serif italic leading-relaxed">
          "{current.quote}"
        </p>
        <p className="text-xs text-charcoal-500 font-medium mt-2">
          — {current.author}
        </p>
      </div>
    </div>
  );
};
