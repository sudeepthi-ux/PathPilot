import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, Heart } from 'lucide-react';

export const HeroSection = ({ compactTop = false }) => {
  return (
    <section
      className={`${
        compactTop ? 'pt-10 pb-16 md:pt-14 md:pb-24' : 'pt-32 pb-20 md:pt-40 md:pb-28'
      } bg-ivory-50 relative overflow-hidden`}
    >
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        
        {/* Soft, friendly intro pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100/70 border border-forest-200/80 text-forest-900 text-xs font-medium tracking-tight">
          <Sparkles className="w-3.5 h-3.5 text-forest-700" />
          <span>For students wondering what to do next</span>
        </div>

        {/* Large editorial headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-charcoal-900 leading-[1.12]">
          Not sure what you want to become? <br />
          <span className="font-serif italic font-normal text-forest-800">
            Let's figure it out together.
          </span>
        </h1>

        {/* Short, friendly description */}
        <p className="text-base sm:text-lg text-charcoal-600 max-w-xl mx-auto leading-relaxed">
          PathPilot helps you discover your natural strengths, explore careers that match your real interests, and take confident steps toward your future.
        </p>

        {/* Clear CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/assessment/personality"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-on-accent text-sm font-medium tracking-tight shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2"
          >
            <span>Discover What You're Good At</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/explore"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-card hover:bg-muted text-charcoal-800 border border-ivory-200 text-sm font-medium transition-all inline-flex items-center justify-center"
          >
            Explore Career Paths
          </Link>
        </div>

        {/* Subtle, reassuring student note */}
        <p className="text-xs text-charcoal-400 font-serif italic pt-4">
          "Your journey starts with one small step."
        </p>

      </div>
    </section>
  );
};
