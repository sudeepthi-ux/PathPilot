import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  interestScenarios, 
  calculateInterestResults 
} from '../data/interestQuestions';
import { InterestResults } from '../components/assessment/InterestResults';
import { AssessmentCategoryNav } from '../components/assessment/AssessmentCategoryNav';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const InterestAnalyzerPage = () => {
  const { studentProfile, saveInterestResult, clearInterestResult } = useAuth();
  const navigate = useNavigate();

  // Load existing answers from profile if available
  const savedAnswers = studentProfile?.assessmentResponses?.interests || {};
  const [answers, setAnswers] = useState(savedAnswers);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(Boolean(studentProfile?.interestResult));
  const [activeResult, setActiveResult] = useState(studentProfile?.interestResult || null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const currentQ = interestScenarios[currentIndex];
  const totalQuestions = interestScenarios.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Sync state if profile changes externally
  useEffect(() => {
    if (studentProfile?.interestResult) {
      setActiveResult(studentProfile.interestResult);
      setIsCompleted(true);
    } else {
      setActiveResult(null);
      setIsCompleted(false);
    }
  }, [studentProfile?.interestResult]);

  // Keyboard navigation: 1-4
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isCompleted || isCalculating) return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        if (currentQ && currentQ.options[optionIndex]) {
          handleSelectOption(currentQ.options[optionIndex].score);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isCompleted, isCalculating, currentQ]);

  const handleSelectOption = (score) => {
    setValidationError(null);
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: score
    }));
  };

  const handleNext = () => {
    setValidationError(null);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // 1. Data Integrity Check: Verify all questions are answered
      const missingQuestions = interestScenarios.filter((q) => !answers[q.id]);
      if (missingQuestions.length > 0) {
        setValidationError(
          `Please answer all 10 interest fields before calculating your results. Field "${missingQuestions[0].categoryName}" is not yet answered.`
        );
        // Jump directly to the first missing question
        const firstMissingIndex = interestScenarios.findIndex((q) => q.id === missingQuestions[0].id);
        if (firstMissingIndex !== -1) {
          setCurrentIndex(firstMissingIndex);
        }
        return;
      }

      // 2. Calculate actual answer-based scores
      setIsCalculating(true);
      setTimeout(() => {
        const result = calculateInterestResults(answers);
        
        if (result.error) {
          setIsCalculating(false);
          setValidationError(result.message || 'Unable to calculate results. Please ensure all questions are answered.');
          return;
        }

        // 3. Save result and responses to AuthContext (persists to localStorage)
        saveInterestResult(result, answers);
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
    // Completely clear interest results from profile and storage
    clearInterestResult();
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
            2. Interest Assessment
          </span>
        </div>

        {/* Shared 3-Category Assessment Switcher */}
        <AssessmentCategoryNav activeCategory="interests" />

        {/* Validation Error Alert */}
        {validationError && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{validationError}</p>
          </div>
        )}

        {/* Calculating Loading State */}
        {isCalculating && (
          <div className="py-24 text-center space-y-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-forest-700 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal-900 tracking-tight">
              Calculating your genuine interest distribution...
            </h2>
            <p className="text-xs text-charcoal-500 max-w-sm mx-auto leading-relaxed">
              Analyzing your responses across 10 academic and professional fields.
            </p>
          </div>
        )}

        {/* Completed View */}
        {!isCalculating && isCompleted && activeResult && (
          <InterestResults
            result={activeResult}
            onRetake={handleRetake}
          />
        )}

        {/* Question View */}
        {!isCalculating && !isCompleted && currentQ && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-charcoal-700">
                  Field {currentIndex + 1} of {totalQuestions} • {currentQ.categoryName}
                </span>
                <span className="font-mono text-charcoal-500 font-semibold">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-ivory-50 border border-ivory-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-6">
              
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800">
                  {currentQ.categoryName}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-charcoal-900 tracking-tight leading-snug">
                  {currentQ.prompt}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === opt.score;
                  return (
                    <button
                      key={opt.score}
                      onClick={() => handleSelectOption(opt.score)}
                      className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start justify-between gap-3 group ${
                        isSelected
                          ? 'bg-accent text-on-accent border-accent shadow-sm'
                          : 'bg-ivory-50 text-charcoal-800 border-ivory-200 hover:border-charcoal-300 hover:bg-card'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full text-[11px] font-mono flex items-center justify-center font-bold shrink-0 ${
                            isSelected ? 'bg-accent text-on-accent' : 'bg-ivory-200 text-charcoal-600'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-xs sm:text-sm">
                            {opt.label}
                          </span>
                        </div>
                        <p className={`text-xs pl-7 leading-relaxed ${
                          isSelected ? 'text-accent-soft' : 'text-charcoal-500'
                        }`}>
                          {opt.sub}
                        </p>
                      </div>

                      <div className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                        isSelected ? 'border-on-accent bg-forest-600' : 'border-ivory-300 bg-card group-hover:border-charcoal-400'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-ivory-50" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Controls */}
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
                  {currentIndex === totalQuestions - 1 ? 'See Your Results' : 'Next Field'}
                </Button>
              </div>

            </div>

            {/* Reassuring footer quote */}
            <p className="text-center text-xs text-charcoal-400 font-serif italic">
              "Understanding your interests gives your career path genuine direction."
            </p>

          </div>
        )}

      </div>
    </div>
  );
};
