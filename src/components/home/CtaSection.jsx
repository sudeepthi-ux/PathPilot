import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export const CtaSection = () => {
  return (
    <section className="py-24 bg-ivory-50 border-t border-ivory-200/70 text-center">
      <div className="max-w-3xl mx-auto px-6 space-y-6">
        
        <p className="text-xs uppercase font-bold tracking-wider text-forest-800">
          Ready to Begin?
        </p>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-charcoal-900 leading-tight">
          Your future begins with <br />
          <span className="font-serif italic font-normal text-forest-800">
            understanding yourself.
          </span>
        </h2>

        <p className="text-sm sm:text-base text-charcoal-600 max-w-lg mx-auto leading-relaxed">
          Take 5 minutes to discover your natural thinking style and explore careers you'll genuinely look forward to.
        </p>

        <div className="pt-2">
          <Link
            to="/assessment/personality"
            className="px-6 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-on-accent text-sm font-medium tracking-tight shadow-sm hover:shadow transition-all inline-flex items-center gap-2"
          >
            <span>Start Free Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-xs text-charcoal-400 font-serif italic pt-4">
          Free for all students. No credit card required.
        </p>

      </div>
    </section>
  );
};
