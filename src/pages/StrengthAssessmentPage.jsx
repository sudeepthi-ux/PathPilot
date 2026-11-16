import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { strengthQuestions, calculateStrengthResults } from '../data/strengthQuestions';
import { StrengthResults } from '../components/assessment/StrengthResults';
import { AssessmentCategoryNav } from '../components/assessment/AssessmentCategoryNav';
import { Button } from '../components/common/Button';

export const StrengthAssessmentPage = () => {
  const { studentProfile, saveStrengthResult, clearStrengthResult } = useAuth();

  const savedAnswers = studentProfile?.assessmentResponses?.strengths || {};
  const [answers, setAnswers] = useState(savedAnswers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(Boolean(studentProfile?.strengthResult));
  const [activeResult, setActiveResult] = useState(studentProfile?.strengthResult || null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const currentQ = strengthQuestions[currentIndex];
  const totalQuestions = strengthQuestions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  useEffect(() => {
    setAnswers(studentProfile?.assessmentResponses?.strengths || {});
    if (studentProfile?.strengthResult) {
      setActiveResult(studentProfile.strengthResult);
      setIsCompleted(true);
    } else {
      setActiveResult(null);
      setIsCompleted(false);
    }
  }, [studentProfile?.strengthResult]);

  // Keyboard navigation: 1, 2, 3, 4
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isCompleted || isCalculating) return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        if (currentQ && currentQ.options[optionIndex]) {
          handleSelectOption(currentQ.options[optionIndex].id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isCompleted, isCalculating, currentQ]);

  const handleSelectOption = (optionId) => {
    setValidationError(null);
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleNext = () => {
    setValidationError(null);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const missingQuestions = strengthQuestions.filter((q) => !answers[q.id]);
      if (missingQuestions.length > 0) {
        setValidationError(
          `Please answer all 10 strength scenarios before viewing your results. Scenario ${missingQuestions[0].id} still needs a selection.`
        );
        const firstMissingIdx = strengthQuestions.findIndex((q) => q.id === missingQuestions[0].id);
        if (firstMissingIdx !== -1) setCurrentIndex(firstMissingIdx);
        return;
      }

      setIsCalculating(true);
      setTimeout(() => {
        const result = calculateStrengthResults(answers);
        if (result.error) {
          setIsCalculating(false);
          setValidationError(result.message || 'Unable to compute strength assessment.');
          return;
        }
        saveStrengthResult(result, answers);
        setActiveResult(result);
        setIsCompleted(true);
        setIsCalculating(false);
      }, 700);
    }
  };

  const handlePrevious = () => {
    setValidationError(null);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    clearStrengthResult();
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    setActiveResult(null);
    setValidationError(null);
  };

  return (
    <div className="pt-24 pb-20 bg-ivory-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-ivory-200">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>

          <span className="text-xs font-semibold text-forest-800">
            3. Strength Assessment
          </span>
        </div>

        {/* Shared 3-Category Assessment Switcher */}
        <AssessmentCategoryNav activeCategory="strengths" />

        {validationError && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{validationError}</p>
          </div>
        )}

        {/* Calculating State */}
        {isCalculating && (
          <div className="py-24 text-center space-y-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-forest-700 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal-900 tracking-tight">
              Calculating your natural strengths...
            </h2>
            <p className="text-xs text-charcoal-500 max-w-sm mx-auto leading-relaxed">
              Evaluating your responses across analytical, creative, communication, and execution pillars.
            </p>
          </div>
        )}

        {/* Completed Results View */}
        {!isCalculating && isCompleted && activeResult && (
          <StrengthResults result={activeResult} onRetake={handleRetake} />
        )}

        {/* Single-Question Flow */}
        {!isCalculating && !isCompleted && currentQ && (
          <div className="space-y-6 animate-fadeIn">
            {/* Progress Indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-charcoal-700">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span className="font-mono text-charcoal-500 font-semibold">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-ivory-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800">
                  {currentQ.domain}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-charcoal-900 tracking-tight leading-snug">
                  {currentQ.question}
                </h2>
              </div>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-accent text-on-accent border-accent shadow-sm'
                          : 'bg-ivory-50 text-charcoal-800 border-ivory-200 hover:border-charcoal-300'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full text-[11px] font-mono flex items-center justify-center font-bold shrink-0 ${
                              isSelected ? 'bg-forest-600 text-on-accent' : 'bg-ivory-200 text-charcoal-600'
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-xs sm:text-sm">
                            {opt.label}
                          </span>
                        </div>
                        <p
                          className={`text-xs pl-7 leading-relaxed ${
                            isSelected ? 'text-accent-soft' : 'text-charcoal-500'
                          }`}
                        >
                          {opt.desc}
                        </p>
                      </div>

                      <div
                        className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                          isSelected ? 'border-on-accent bg-forest-600' : 'border-ivory-300 bg-card'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-ivory-50" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-ivory-200 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentIndex === 0}
                  onClick={handlePrevious}
                  icon={ArrowLeft}
                  iconPosition="left"
                >
                  Previous
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  disabled={!answers[currentQ.id]}
                  onClick={handleNext}
                  icon={currentIndex === totalQuestions - 1 ? Sparkles : ArrowRight}
                  iconPosition="right"
                >
                  {currentIndex === totalQuestions - 1 ? 'See Your Results' : 'Next'}
                </Button>
              </div>
            </div>

            <p className="text-center text-xs text-charcoal-400 font-serif italic">
              "Clarity grows when you notice where your effort turns naturally into momentum."
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
