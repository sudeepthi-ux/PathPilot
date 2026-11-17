import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Clock, ListChecks, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Minimal Career Assessment introduction for the home page.
 * Intentionally shows NO recommendation cards, match percentages, or career descriptions —
 * results live only on the dedicated /discover page after the student submits the assessment.
 */
export const CareerAssessmentIntro = () => {
  const { studentProfile } = useAuth();
  const hasSubmitted = Boolean(studentProfile?.careerDiscoveryResult?.submittedAt);

  const highlights = [
    { icon: ListChecks, label: '5 focused questions' },
    { icon: Clock, label: 'About 2 minutes' },
    { icon: ShieldCheck, label: 'Results saved privately' }
  ];

  return (
    <section
      id="discover"
      className="py-20 md:py-24 bg-ivory-50 border-t border-ivory-200/70 scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-card rounded-[32px] border border-ivory-200 shadow-sm p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200/80 text-forest-800 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-forest-700" />
            <span>Career Discovery Assessment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal-900 leading-[1.15]">
            Find careers that fit{' '}
            <span className="font-serif italic font-normal text-forest-800">how you think.</span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-xl mx-auto">
            Answer five quick questions about your interests, favourite activities, working style,
            motivations, and future direction. When you submit, PathPilot matches you with careers
            across robotics, engineering, science, design, technology, and more.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-charcoal-600">
            {highlights.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-forest-700" />
                {label}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/discover"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-on-accent text-sm font-semibold tracking-tight shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Take Assessment →</span>
            </Link>
          </div>

          {hasSubmitted && (
            <p className="text-xs text-charcoal-500 inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
              <span>
                You’ve completed this assessment.{' '}
                <Link to="/discover" className="font-semibold text-forest-800 hover:underline">
                  View Careers Matching Your Answers
                </Link>
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
