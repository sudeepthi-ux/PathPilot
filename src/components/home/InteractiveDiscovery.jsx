import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Compass,
  ArrowUpRight,
  Map,
  Layers,
  SlidersHorizontal
} from 'lucide-react';
import { discoveryQuestions, getCareerMatches } from '../../data/interactiveDiscoveryData';
import { allCareers } from '../../data/careerLibraryData';
import { useAuth } from '../../context/AuthContext';

const STEP_SHORT_LABELS = {
  subject: 'Subjects',
  activity: 'Activities',
  style: 'Work Style',
  motivation: 'Motivation',
  direction: 'Direction'
};

export const InteractiveDiscovery = ({ standalone = false }) => {
  const { studentProfile, saveCareerDiscoveryResult, clearCareerDiscoveryResult } = useAuth();
  const savedDiscovery = studentProfile?.careerDiscoveryResult || null;
  const hasSavedSubmission = Boolean(
    savedDiscovery?.answers &&
      discoveryQuestions.every((q) => Boolean(savedDiscovery.answers[q.id]))
  );

  // Current active question step (0 to 4)
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      const el = stepRefs.current[currentStep];
      el?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
  }, [currentStep]);

  // Restore previously submitted answers (persisted per user across refreshes); otherwise start empty
  const [answers, setAnswers] = useState(() => (hasSavedSubmission ? { ...savedDiscovery.answers } : {}));

  // Results remain hidden until the user explicitly submits; a saved submission re-opens the results view
  const [isSubmitted, setIsSubmitted] = useState(hasSavedSubmission);

  // Sync when the persisted profile hydrates after mount (e.g. session restore on refresh)
  const savedKey = savedDiscovery?.submittedAt || '';
  useEffect(() => {
    if (hasSavedSubmission) {
      setAnswers({ ...savedDiscovery.answers });
      setIsSubmitted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedKey]);

  const activeQuestion = discoveryQuestions[currentStep];

  const answeredCount = useMemo(
    () => discoveryQuestions.filter((q) => Boolean(answers[q.id])).length,
    [answers]
  );
  const allQuestionsAnswered = answeredCount === discoveryQuestions.length;
  const firstUnansweredIndex = useMemo(
    () => discoveryQuestions.findIndex((q) => !answers[q.id]),
    [answers]
  );

  // Only compute recommendations after all 5 answers exist AND the user explicitly submits
  const matches = useMemo(() => {
    if (!isSubmitted || !allQuestionsAnswered) return [];
    return getCareerMatches(answers);
  }, [isSubmitted, allQuestionsAnswered, answers]);

  // Selected answer summary chips for the Results banner
  const answerSummaryChips = useMemo(() => {
    return discoveryQuestions.map((q) => {
      const chosen = q.options.find((opt) => opt.id === answers[q.id]);
      return {
        id: q.id,
        category: STEP_SHORT_LABELS[q.id] || q.category,
        label: chosen?.label || ''
      };
    }).filter((item) => item.label);
  }, [answers]);

  // Handle option selection without triggering premature recommendations
  const handleSelectOption = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentStep < discoveryQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitDiscovery = () => {
    if (!allQuestionsAnswered) {
      if (firstUnansweredIndex !== -1) {
        setCurrentStep(firstUnansweredIndex);
      }
      return;
    }
    setIsSubmitted(true);
    saveCareerDiscoveryResult(answers);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleEditAnswers = () => {
    setIsSubmitted(false);
    setCurrentStep(0);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsSubmitted(false);
    if (savedDiscovery) clearCareerDiscoveryResult();
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Progress bar synchronized cleanly with current step (20%, 40%, 60%, 80%, 100%)
  const progressPercent = Math.round(((currentStep + 1) / discoveryQuestions.length) * 100);

  return (
    <section
      id="career-discovery"
      ref={sectionRef}
      className={`${
        standalone ? 'pt-24 pb-20 md:pt-28 min-h-screen' : 'py-20 md:py-28 border-t border-ivory-200/70'
      } bg-ivory-50 scroll-mt-16`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200/80 text-forest-800 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-forest-700" />
            <span>{isSubmitted ? 'Career Discovery Results' : 'Career Discovery Assessment'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal-900 leading-[1.15]">
            {isSubmitted
              ? 'Careers Matching Your Answers'
              : 'See what careers fit your natural curiosity.'}
          </h1>
          <p className="mt-3.5 text-sm sm:text-base text-charcoal-600 leading-relaxed">
            {isSubmitted
              ? 'We analyzed all five of your answers together—including your hands-on, creative, scientific, and coding preferences. Your results are saved to your profile.'
              : 'Answer all 5 thoughtful questions at your own pace, then submit to generate tailored career matches built around your real interests.'}
          </p>
        </div>

        {/* BEFORE SUBMISSION: Focused 5-Step Questions Only (Zero Side Panel / Zero Live Matches) */}
        {!isSubmitted ? (
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-6 sm:p-8 md:p-10 border border-ivory-200 shadow-sm flex flex-col justify-between space-y-6">
            {/* Top Stepper & Progress Indicator */}
            <div className="space-y-4">
              {/* Step Pills Navigation — 5-col grid on desktop, smooth touch scroll on mobile */}
              <div
                role="tablist"
                aria-label="Career discovery steps"
                className="flex sm:grid sm:grid-cols-5 items-center gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-visible scroll-smooth snap-x snap-mandatory touch-pan-x pb-2.5 border-b border-ivory-200/70"
              >
                {discoveryQuestions.map((q, idx) => {
                  const isActive = idx === currentStep;
                  const isAnswered = Boolean(answers[q.id]);
                  const shortLabel = STEP_SHORT_LABELS[q.id] || q.category;
                  return (
                    <button
                      key={q.id}
                      ref={(el) => {
                        stepRefs.current[idx] = el;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setCurrentStep(idx)}
                      className={`h-9 px-3 sm:px-2 rounded-xl text-xs font-semibold transition-all shrink-0 sm:shrink snap-start flex items-center justify-center gap-1.5 min-w-0 ${
                        isActive
                          ? 'bg-accent text-on-accent shadow-sm'
                          : isAnswered
                          ? 'bg-forest-50 text-forest-900 hover:bg-muted border border-forest-200/70'
                          : 'bg-ivory-50 text-charcoal-600 hover:bg-muted border border-ivory-200'
                      }`}
                      title={`Step ${idx + 1}: ${q.category}`}
                    >
                      <span className="font-mono text-[11px] shrink-0">{idx + 1}.</span>
                      <span className="whitespace-nowrap sm:truncate">{shortLabel}</span>
                      {isAnswered && !isActive && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Synchronized Progress Bar & Counter */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-charcoal-500">
                  <span className="font-medium text-forest-800 uppercase tracking-wider text-[11px]">
                    Step {currentStep + 1} of {discoveryQuestions.length} • {activeQuestion.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-charcoal-500">
                      {answeredCount} of {discoveryQuestions.length} answered
                    </span>
                    {answeredCount > 0 && (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs text-charcoal-500 hover:text-charcoal-800 flex items-center gap-1 transition-colors"
                        title="Clear all choices"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                    <span className="font-mono text-charcoal-700 font-semibold">{progressPercent}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-ivory-50 border border-ivory-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Current Question & Hint */}
            <div key={activeQuestion.id} className="space-y-2 animate-fadeIn">
              <h3 className="text-xl sm:text-2xl font-bold text-charcoal-900 tracking-tight leading-snug">
                {activeQuestion.question}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                {activeQuestion.hint}
              </p>
            </div>

            {/* Options Grid (Responsive 1-col mobile, 2-col desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {activeQuestion.options.map((option) => {
                const isSelected = answers[activeQuestion.id] === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleSelectOption(activeQuestion.id, option.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start justify-between gap-3 group ${
                      isSelected
                        ? 'bg-accent text-on-accent border-accent shadow-sm'
                        : 'bg-card text-charcoal-900 border-ivory-200 hover:border-forest-600/40 hover:bg-ivory-50'
                    }`}
                  >
                    <div className="space-y-1 pr-1">
                      <p
                        className={`font-semibold text-xs sm:text-sm leading-snug ${
                          isSelected ? 'text-on-accent' : 'text-charcoal-900 group-hover:text-forest-900'
                        }`}
                      >
                        {option.label}
                      </p>
                      <p
                        className={`text-xs leading-relaxed ${
                          isSelected ? 'text-accent-soft' : 'text-charcoal-500'
                        }`}
                      >
                        {option.desc}
                      </p>
                    </div>

                    {/* Radio indicator */}
                    <div
                      className={`w-5 h-5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-on-accent bg-forest-600'
                          : 'border-ivory-300 bg-card group-hover:border-forest-400'
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-on-accent" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-transparent" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Completion Callout + Navigation Footer */}
            <div className="pt-5 border-t border-ivory-200 space-y-4">
              {allQuestionsAnswered && (
                <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-forest-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-forest-700" />
                      <span>All 5 Career Discovery questions completed!</span>
                    </p>
                    <p className="text-xs text-charcoal-600">
                      Ready to see careers aligned with your interests, skills preference, and goals.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmitDiscovery}
                    className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold px-6 py-3 rounded-2xl bg-accent text-on-accent hover:bg-accent-hover transition-all shadow-sm shrink-0"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Discover My Career Matches →</span>
                  </button>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all ${
                    currentStep === 0
                      ? 'text-charcoal-300 cursor-not-allowed'
                      : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-ivory-50 border border-ivory-200'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2.5 ml-auto">
                  {currentStep < discoveryQuestions.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-5 py-2.5 rounded-xl bg-accent text-on-accent hover:bg-accent-hover transition-colors shadow-sm"
                    >
                      <span>Next Question</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : !allQuestionsAnswered ? (
                    <button
                      type="button"
                      onClick={() => firstUnansweredIndex !== -1 && setCurrentStep(firstUnansweredIndex)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-ivory-50 text-forest-800 border border-forest-200 hover:bg-muted transition-colors"
                    >
                      <span>
                        Complete Question {firstUnansweredIndex + 1} ({discoveryQuestions.length - answeredCount} remaining)
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-forest-800">
                      Click “Discover My Career Matches →” above to view results
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* AFTER SUBMISSION: Dedicated Personalized Results View */
          <div className="space-y-8 animate-fadeIn">
            {/* Results Summary & Controls Bar */}
            <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-ivory-200/80">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-800">
                    <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                    <span>Personalized Career Compatibility Report</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-charcoal-900 tracking-tight">
                    Top {matches.length} Best-Matched Careers for You
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleEditAnswers}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ivory-50 border border-ivory-200 text-xs font-semibold text-charcoal-800 hover:bg-muted transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-forest-700" />
                    <span>Edit My Answers</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-card border border-ivory-200 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-50 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Start Over</span>
                  </button>
                </div>
              </div>

              {/* Chosen Answers Pills */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">
                  Generated from your 5 selections
                </p>
                <div className="flex flex-wrap gap-2">
                  {answerSummaryChips.map((chip) => (
                    <span
                      key={chip.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory-50 border border-ivory-200 text-xs text-charcoal-700"
                    >
                      <span className="font-bold text-forest-800">{chip.category}:</span>
                      <span>{chip.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Matched Careers 2-Column Rich Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matches.map((career, index) => {
                const isTopMatch = index === 0;
                return (
                  <article
                    key={career.id}
                    className={`bg-card rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between space-y-5 shadow-sm ${
                      isTopMatch ? 'border-forest-600/50 ring-1 ring-forest-600/15' : 'border-ivory-200'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Rank, Category & Compatibility Percentage */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-accent text-on-accent text-[10px] font-bold uppercase tracking-wider">
                            #{index + 1} {isTopMatch ? 'Top Match' : 'Strong Fit'}
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800">
                            {career.categoryName}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-forest-900 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
                          <span>{career.matchPercentage} Match</span>
                        </div>
                      </div>

                      {/* Compatibility Progress Meter */}
                      <div className="w-full h-1.5 bg-ivory-50 border border-ivory-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-500"
                          style={{ width: career.matchPercentage }}
                        />
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1.5">
                        <h4 className="font-bold text-lg sm:text-xl text-charcoal-900 tracking-tight">
                          {career.title}
                        </h4>
                        <p className="text-xs font-medium text-forest-800 font-serif italic">
                          {career.tagline}
                        </p>
                        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed pt-1">
                          {career.overview}
                        </p>
                      </div>

                      {/* Why It Matches Your Interests */}
                      <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Why This Fits You</span>
                        </span>
                        <p className="text-xs text-charcoal-700 leading-relaxed">
                          {career.why}
                        </p>
                      </div>

                      {/* Required Skills */}
                      {career.technicalSkills.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            <span>Key Skills You’ll Build</span>
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {career.technicalSkills.slice(0, 4).map((skill) => (
                              <span
                                key={skill}
                                className="text-[11px] px-2.5 py-0.5 rounded-full bg-ivory-50 border border-ivory-200 text-charcoal-700 font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Relevant Learning Path Preview */}
                      {career.learningPath.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1">
                            <Map className="w-3 h-3" />
                            <span>First Step in Your Learning Path</span>
                          </span>
                          <p className="text-xs text-charcoal-600 leading-relaxed bg-forest-50/60 border border-forest-200/60 rounded-xl p-2.5">
                            {career.learningPath[0]}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Footer */}
                    <div className="pt-4 border-t border-ivory-200 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        to={career.roadmapUrl}
                        className="text-xs font-semibold text-charcoal-600 hover:text-forest-900 inline-flex items-center gap-1 transition-colors"
                      >
                        <Map className="w-3.5 h-3.5" />
                        <span>View Learning Path</span>
                      </Link>

                      <Link
                        to={career.exploreUrl}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-on-accent hover:bg-accent-hover text-xs font-semibold transition-colors shadow-sm group"
                      >
                        <span>Explore Career</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Deep Assessment & Full Library Callout */}
            <div className="bg-card rounded-3xl p-6 sm:p-7 border border-ivory-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-bold text-charcoal-900">
                  Want an even deeper 30-signal personalized profile or browse all {allCareers.length} career profiles?
                </p>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Take our full Personality, Interest & Strength Assessments or explore every career in the PathPilot Career Library.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/careers"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-ivory-50 border border-ivory-200 text-xs font-semibold text-charcoal-800 hover:bg-muted transition-colors"
                >
                  <span>Browse Career Library</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/assessment/personality"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent text-on-accent text-xs font-semibold hover:bg-accent-hover transition-colors shadow-sm"
                >
                  <span>Take 5-Min Full Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
