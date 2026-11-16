import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  CheckCircle2,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { discoveryQuestions, getCareerMatches } from '../../data/interactiveDiscoveryData';

export const InteractiveDiscovery = () => {
  // Current active question step (0 to 4)
  const [currentStep, setCurrentStep] = useState(0);

  // User's chosen answers across 5 questions
  const [answers, setAnswers] = useState({
    subject: 'tech',
    activity: 'build',
    style: 'flexible',
    motivation: 'create_new',
    direction: 'software'
  });

  // Track whether student has made custom edits
  const [hasInteracted, setHasInteracted] = useState(false);

  // Active question object
  const activeQuestion = discoveryQuestions[currentStep];

  // Dynamically calculate matching careers (2-3 matches)
  const matches = useMemo(() => {
    return getCareerMatches(answers);
  }, [answers]);

  // Handle option selection
  const handleSelectOption = (questionId, optionId) => {
    setHasInteracted(true);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  // Step navigation
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

  const handleReset = () => {
    setAnswers({
      subject: 'tech',
      activity: 'build',
      style: 'flexible',
      motivation: 'create_new',
      direction: 'software'
    });
    setCurrentStep(0);
    setHasInteracted(false);
  };

  // Progress percentage (20%, 40%, 60%, 80%, 100%)
  const progressPercent = Math.round(((currentStep + 1) / discoveryQuestions.length) * 100);

  return (
    <section id="discover" className="py-20 md:py-28 bg-ivory-50 border-t border-ivory-200/70 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200/80 text-forest-800 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-forest-700" />
            <span>Interactive Career Discovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal-900 leading-[1.15]">
            See what careers fit your natural curiosity.
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-charcoal-600 leading-relaxed">
            Answer 5 quick, simple questions to see real-world careers that fit your favorite subjects, working style, and aspirations.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Interactive 5-Step Quiz Card */}
          <div className="lg:col-span-7 bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm flex flex-col justify-between space-y-6">
            
            {/* Top Stepper & Progress Indicator */}
            <div className="space-y-4">
              
              {/* Step Pills Navigation */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-ivory-200/70">
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
                  {discoveryQuestions.map((q, idx) => {
                    const isActive = idx === currentStep;
                    const isAnswered = Boolean(answers[q.id]);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentStep(idx)}
                        className={`h-7 px-2.5 sm:px-3 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-accent text-on-accent shadow-sm'
                            : isAnswered
                            ? 'bg-ivory-50 text-charcoal-700 hover:bg-muted border border-ivory-200'
                            : 'bg-card text-charcoal-400 border border-ivory-200'
                        }`}
                        title={`Go to Question ${idx + 1}: ${q.category}`}
                      >
                        <span className="font-mono text-[11px]">{idx + 1}</span>
                        <span className="hidden sm:inline">{q.category}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Reset button */}
                {hasInteracted && (
                  <button
                    onClick={handleReset}
                    className="text-xs text-charcoal-500 hover:text-charcoal-800 flex items-center gap-1 shrink-0 ml-1 transition-colors"
                    title="Reset to default choices"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span className="hidden md:inline">Reset</span>
                  </button>
                )}
              </div>

              {/* Progress Bar & Counter */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-charcoal-500">
                  <span className="font-medium text-forest-800 uppercase tracking-wider text-[11px]">
                    Step {currentStep + 1} of {discoveryQuestions.length} • {activeQuestion.category}
                  </span>
                  <span className="font-mono text-charcoal-600 font-semibold">{progressPercent}%</span>
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

            {/* Options List (5 to 7 clean options) */}
            <div className="space-y-2.5 pt-1">
              {activeQuestion.options.map((option) => {
                const isSelected = answers[activeQuestion.id] === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(activeQuestion.id, option.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start justify-between gap-3 group ${
                      isSelected
                        ? 'bg-accent text-on-accent border-accent shadow-sm'
                        : 'bg-card text-charcoal-900 border-ivory-200 hover:border-forest-600/40 hover:bg-ivory-50'
                    }`}
                  >
                    <div className="space-y-1 pr-2">
                      <p className={`font-semibold text-xs sm:text-sm leading-snug ${
                        isSelected ? 'text-on-accent' : 'text-charcoal-900 group-hover:text-forest-900'
                      }`}>
                        {option.label}
                      </p>
                      <p className={`text-xs leading-relaxed ${
                        isSelected ? 'text-accent-soft' : 'text-charcoal-500'
                      }`}>
                        {option.desc}
                      </p>
                    </div>

                    {/* Radio indicator */}
                    <div className={`w-5 h-5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-on-accent bg-forest-600'
                        : 'border-ivory-300 bg-card group-hover:border-forest-400'
                    }`}>
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

            {/* Stepper Navigation Footer */}
            <div className="pt-4 border-t border-ivory-200 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all ${
                  currentStep === 0
                    ? 'text-charcoal-300 cursor-not-allowed'
                    : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-ivory-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {currentStep < discoveryQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-accent text-on-accent hover:bg-accent-hover transition-colors shadow-sm"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-forest-800 bg-forest-50 border border-forest-200/70 px-3 py-1.5 rounded-xl">
                    All 5 Questions Answered
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Live Career Recommendations */}
          <div className="lg:col-span-5 bg-card rounded-3xl p-6 sm:p-7 border border-ivory-200 shadow-sm flex flex-col justify-between space-y-6 lg:sticky lg:top-24">
            
            <div className="space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-ivory-200/70">
                <div className="flex items-center gap-2 text-forest-800 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                  <span>Your Live Career Matches</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-forest-700 bg-forest-50 px-2 py-0.5 rounded-full border border-forest-200/60">
                  {matches.length} Matches
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-charcoal-900 tracking-tight">
                  Careers fitting your answers
                </h3>
                <p className="text-xs text-charcoal-500 mt-1">
                  Dynamically updated in real time as you adjust your 5 answers.
                </p>
              </div>

              {/* 2 to 3 Curated Matches */}
              <div className="space-y-3 pt-1">
                {matches.map((career, index) => {
                  const isTopMatch = index === 0;
                  return (
                    <div
                      key={career.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isTopMatch
                          ? 'bg-ivory-50 border-forest-600/30 shadow-xs'
                          : 'bg-card border-ivory-200 hover:border-charcoal-300'
                      }`}
                    >
                      {/* Top Match Tag & Badge */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800">
                          {career.categoryName}
                        </span>
                        <div className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-forest-800 bg-forest-50 px-2 py-0.5 rounded-full border border-forest-200/70">
                          <span>{career.matchPercentage} Match</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="font-bold text-sm text-charcoal-900">
                        {career.title}
                      </h4>
                      <p className="text-[11px] text-charcoal-500 mt-0.5">
                        {career.tagline}
                      </p>

                      {/* Short, Understandable Explanation */}
                      <p className="text-xs text-charcoal-600 leading-relaxed mt-2.5 p-2.5 rounded-xl bg-card border border-ivory-200/70">
                        {career.why}
                      </p>

                      {/* Link to Career Exploration */}
                      <div className="mt-3 pt-2 border-t border-ivory-200/60 flex items-center justify-between">
                        <span className="text-[11px] text-charcoal-400">
                          PathPilot Career Library
                        </span>
                        <Link
                          to={career.exploreUrl}
                          className="text-xs font-semibold text-forest-800 hover:text-forest-900 inline-flex items-center gap-1 group"
                        >
                          <span>Explore Career</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Assessment Callout Banner */}
            <div className="pt-4 border-t border-ivory-200 space-y-3">
              <div className="space-y-1">
                <p className="text-xs font-bold text-charcoal-800">
                  Ready for a complete personalized profile?
                </p>
                <p className="text-[11px] text-charcoal-500 leading-relaxed">
                  Take the in-depth 5-minute assessment for 30-signal personality scoring and custom skill roadmaps.
                </p>
              </div>

              <Link
                to="/assessment/personality"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-on-accent text-xs font-semibold hover:bg-accent-hover transition-colors shadow-sm"
              >
                <span>Take 5-Min Full Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
