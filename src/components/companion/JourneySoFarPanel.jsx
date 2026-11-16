import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Award, Bookmark, ArrowRight } from 'lucide-react';

/**
 * Displays ONLY real, verified PathPilot context for the signed-in student.
 * Never fabricates interests, strengths, or 100% scores when data is missing.
 */
export const JourneySoFarPanel = ({ user, studentProfile }) => {
  const personalityArchetype = studentProfile?.personalityResult?.archetype?.title || null;
  const archetypeStrengths = studentProfile?.personalityResult?.archetype?.strengths || [];
  const strengthAssessmentStrengths = studentProfile?.strengthResult?.topStrengths || [];
  const mergedStrengths = strengthAssessmentStrengths.length > 0 ? strengthAssessmentStrengths : archetypeStrengths;
  const strengthSignature = studentProfile?.strengthResult?.signatureTitle || null;
  const topInterests = studentProfile?.interestResult?.topThree || [];
  const savedCareers = studentProfile?.savedCareers || [];
  const completedExperiments = studentProfile?.completedExperiments || [];

  return (
    <aside className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm space-y-5">
      <div className="space-y-1 pb-3 border-b border-ivory-200/80">
        <div className="flex items-center gap-1.5 text-forest-800 text-[11px] font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-forest-700" />
          <span>Personalized Context</span>
        </div>
        <h3 className="text-base font-bold text-charcoal-900 tracking-tight">
          Your Journey So Far
        </h3>
        <p className="text-[11px] text-charcoal-500 leading-relaxed">
          {user?.name
            ? `AIRA uses ${user.name.split(' ')[0]}'s real PathPilot progress to guide our conversation.`
            : 'AIRA uses your actual PathPilot assessments and activities to personalize guidance.'}
        </p>
      </div>

      {/* 1. Thinking Style */}
      <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block">
          Thinking Style
        </span>
        {personalityArchetype ? (
          <p className="text-xs font-bold text-forest-900">{personalityArchetype}</p>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-charcoal-500 italic">Not discovered yet</span>
            <Link
              to="/assessment/personality"
              className="text-[11px] font-semibold text-forest-800 hover:underline inline-flex items-center gap-0.5 shrink-0"
            >
              <span>Discover</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* 2. Top Measured Interests */}
      <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block">
          Top Measured Interests
        </span>
        {topInterests.length > 0 ? (
          <div className="space-y-1.5">
            {topInterests.map((interest) => (
              <div key={interest.id} className="flex items-center justify-between text-xs">
                <span className="text-charcoal-800 font-medium truncate pr-2">
                  {interest.name}
                </span>
                <span className="font-mono text-[11px] font-bold text-forest-800 shrink-0">
                  {interest.percentage}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-charcoal-500 italic">Not mapped yet</span>
            <Link
              to="/assessment/interests"
              className="text-[11px] font-semibold text-forest-800 hover:underline inline-flex items-center gap-0.5 shrink-0"
            >
              <span>Analyze</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* 3. Identified Strengths */}
      <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-forest-700" />
          Identified Strengths
        </span>
        {strengthSignature && (
          <p className="text-[11px] font-semibold text-forest-900">{strengthSignature}</p>
        )}
        {mergedStrengths.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {mergedStrengths.slice(0, 4).map((strength, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-card border border-ivory-200 text-charcoal-700 font-medium"
              >
                {strength}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-charcoal-500 italic">No strengths recorded yet</span>
            <Link
              to="/assessment/strengths"
              className="text-[11px] font-semibold text-forest-800 hover:underline inline-flex items-center gap-0.5 shrink-0"
            >
              <span>Assess</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* 4. Saved Paths & Labs */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1">
            <Bookmark className="w-3 h-3 text-forest-700" />
            Saved Paths
          </span>
          <p className="text-xs font-semibold text-charcoal-900 truncate">
            {savedCareers.length > 0 ? `${savedCareers.length} saved` : 'None yet'}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1">
            <Award className="w-3 h-3 text-forest-700" />
            Labs Done
          </span>
          <p className="text-xs font-semibold text-charcoal-900">
            {completedExperiments.length} completed
          </p>
        </div>
      </div>

      {savedCareers.length > 0 && (
        <div className="pt-1 flex flex-wrap gap-1.5">
          {savedCareers.slice(0, 3).map((c) => (
            <Link
              key={c.id}
              to={`/careers/${c.id}`}
              className="text-[11px] px-2.5 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-900 font-medium hover:bg-forest-100 transition-colors"
            >
              {c.title}
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
};
