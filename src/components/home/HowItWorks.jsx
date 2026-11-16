import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { simpleSteps } from '../../data/careersData';

export const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 bg-ivory-50 border-t border-ivory-200/70">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-800 block mb-2">
            How PathPilot Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 leading-tight">
            Three simple steps to clarity.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal-600">
            No complicated jargon or confusing advice. Just honest guidance to help you make decisions you feel good about.
          </p>
        </div>

        {/* 3 Clean Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {simpleSteps.map((step) => (
            <div
              key={step.step}
              className="bg-card rounded-3xl p-7 border border-ivory-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="font-serif italic text-2xl text-forest-800 block">
                  {step.step}
                </span>

                <h3 className="text-lg font-bold text-charcoal-900 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-ivory-200/80 text-[11px] text-forest-800 font-medium">
                {step.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Reassuring note & action */}
        <div className="mt-12 text-center">
          <Link
            to="/assessment/personality"
            className="inline-flex items-center gap-2 text-xs font-semibold text-forest-800 hover:text-forest-900"
          >
            <span>Start with Step 1: Understand Yourself</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
