import React from 'react';
import { Compass, Sparkles, GitCompare, MapPin, ArrowRight } from 'lucide-react';

export const QUICK_STARTER_OPTIONS = [
  {
    id: 'explore_careers',
    title: 'Explore Careers',
    description: 'Find roles matching your curiosity and interests',
    prompt: 'Can you help me explore careers that match my profile and curiosity?',
    icon: Compass
  },
  {
    id: 'discover_strengths',
    title: 'Discover My Strengths',
    description: 'Uncover your natural thinking style and abilities',
    prompt: 'Help me discover my natural strengths and how I work best.',
    icon: Sparkles
  },
  {
    id: 'compare_paths',
    title: 'Compare Career Paths',
    description: 'Weigh two college majors or roles side by side',
    prompt: 'I want to compare two career paths or majors side by side.',
    icon: GitCompare
  },
  {
    id: 'plan_next_step',
    title: 'Plan My Next Step',
    description: 'Get a practical action plan based on where you are today',
    prompt: 'Based on my journey so far, what should my practical next step be?',
    icon: MapPin
  }
];

export const QuickStarterCards = ({ onSelectStarter, disabled = false }) => {
  return (
    <section className="space-y-3" aria-label="Quick conversation starters">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
          Quick Conversation Starters
        </h3>
        <span className="text-[11px] text-charcoal-400">
          Tap any topic to talk with AIRA
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {QUICK_STARTER_OPTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectStarter(item)}
              className="group p-4 rounded-2xl bg-card border border-ivory-200 hover:border-forest-600/50 hover:shadow-card transition-all text-left flex flex-col justify-between space-y-3 disabled:opacity-50"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-xl bg-forest-50 border border-forest-200/70 text-forest-800 flex items-center justify-center group-hover:bg-accent group-hover:text-on-accent transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-charcoal-900 group-hover:text-forest-900">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-charcoal-500 leading-snug mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-forest-800 inline-flex items-center gap-1">
                <span>Talk to AIRA</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
