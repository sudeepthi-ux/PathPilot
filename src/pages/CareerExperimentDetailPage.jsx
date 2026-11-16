import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { careerExperiments } from '../data/careerExperimentsData';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  BookOpen,
  Award,
  Compass,
  Check,
  Target,
  Clock,
  Play
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const CareerExperimentDetailPage = () => {
  const { experimentId } = useParams();
  const navigate = useNavigate();
  const { studentProfile, completeExperiment, toggleCompleteExperiment } = useAuth();
  const completedExperiments = studentProfile.completedExperiments || [];

  const experiment = careerExperiments.find((e) => e.id === experimentId) || careerExperiments[0];
  const isAlreadyCompleted = completedExperiments.includes(experiment.id);

  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStage = experiment.stages[currentStageIdx];
  const totalStages = experiment.stages.length;

  // Find 2 recommended other experiments
  const nextRecommended = careerExperiments
    .filter((e) => e.id !== experiment.id && !completedExperiments.includes(e.id))
    .slice(0, 2);

  const handleSelectOption = (optId) => {
    if (showFeedback) return;
    setSelectedOptionId(optId);
    setShowFeedback(true);
  };

  const handleNextStage = () => {
    if (currentStageIdx < totalStages - 1) {
      setCurrentStageIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setShowFeedback(false);
    } else {
      // Completed experiment
      completeExperiment(experiment.id, experiment.title);
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentStageIdx(0);
    setSelectedOptionId(null);
    setShowFeedback(false);
    setIsCompleted(false);
  };

  const selectedOption = currentStage?.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="pt-24 pb-20 bg-ivory-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-ivory-200">
          <Link
            to="/experiments"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Experiments Lab</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-200">
              {experiment.categoryName}
            </span>

            {/* Direct Completion Toggle */}
            <button
              type="button"
              onClick={() => toggleCompleteExperiment(experiment.id, experiment.title)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all ${
                isAlreadyCompleted || isCompleted
                  ? 'bg-forest-100 text-forest-800 border-forest-300'
                  : 'bg-card text-charcoal-600 border-ivory-200 hover:bg-ivory-50'
              }`}
              title={isAlreadyCompleted || isCompleted ? "Mark incomplete" : "Mark as completed"}
            >
              <Check className="w-3 h-3" />
              <span>{isAlreadyCompleted || isCompleted ? 'Completed' : 'Mark Done'}</span>
            </button>
          </div>
        </div>

        {/* Experiment Objective & Briefing Card (Always visible before or during simulation) */}
        {!isCompleted && currentStageIdx === 0 && !showFeedback && (
          <div className="bg-card rounded-3xl p-6 sm:p-7 border border-ivory-200 shadow-sm space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
                Simulation Briefing
              </span>
              <div className="flex items-center gap-2 text-[11px] text-charcoal-500 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-forest-700" />
                  {experiment.timeEstimate}
                </span>
                <span>•</span>
                <span>{experiment.difficulty}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-charcoal-900 tracking-tight">
                {experiment.title}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1 leading-relaxed">
                {experiment.overview}
              </p>
            </div>

            {/* 3 Structured Columns: Objective, Instructions, Expected Outcome */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              
              {/* Objective */}
              <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block">
                  1. Objective
                </span>
                <p className="text-xs text-charcoal-700 leading-snug">
                  {experiment.objective || "Solve real-world decisions and understand key trade-offs."}
                </p>
              </div>

              {/* Instructions */}
              <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block">
                  2. Instructions
                </span>
                <p className="text-xs text-charcoal-700 leading-snug">
                  {experiment.instructions || "Read each situation, pick your path, and review instant feedback."}
                </p>
              </div>

              {/* Expected Outcome */}
              <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block">
                  3. Expected Outcome
                </span>
                <p className="text-xs text-charcoal-700 leading-snug">
                  {experiment.expectedOutcome || "Discover your natural strengths and verify career alignment."}
                </p>
              </div>

            </div>

          </div>
        )}

        {/* Completion Screen */}
        {isCompleted ? (
          <div className="bg-card rounded-3xl p-8 sm:p-10 border border-ivory-200 shadow-sm space-y-6 text-center animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center mx-auto">
              <Award className="w-7 h-7 text-forest-700" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
                Experiment Completed • Saved to Your Dashboard
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight">
                Great job solving real-world challenges!
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto leading-relaxed">
                {experiment.takeaway}
              </p>
            </div>

            {/* Skills Demonstrated */}
            <div className="p-5 rounded-2xl bg-ivory-50 border border-ivory-200 max-w-lg mx-auto space-y-2.5 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block text-center">
                Skills Discovered & Verified in This Simulation:
              </span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {experiment.skillsGained.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full bg-card border border-ivory-200 text-forest-900 font-medium shadow-2xs"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Next Experiments */}
            {nextRecommended.length > 0 && (
              <div className="pt-2 max-w-lg mx-auto text-left space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-800 block text-center">
                  Recommended Next Simulations
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {nextRecommended.map((nextExp) => (
                    <Link
                      key={nextExp.id}
                      to={`/experiments/${nextExp.id}`}
                      onClick={() => {
                        setIsCompleted(false);
                        setCurrentStageIdx(0);
                        setSelectedOptionId(null);
                        setShowFeedback(false);
                      }}
                      className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 hover:border-forest-600/40 transition-all flex flex-col justify-between space-y-2 group"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800">
                          {nextExp.categoryName}
                        </span>
                        <h4 className="font-bold text-xs text-charcoal-900 group-hover:text-forest-900 leading-snug mt-0.5">
                          {nextExp.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-semibold text-forest-800 inline-flex items-center gap-1">
                        <span>Try next</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-ivory-200">
              <button
                onClick={handleRestart}
                className="text-xs text-charcoal-500 hover:text-charcoal-800 flex items-center gap-1.5 py-2 px-3"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Simulation</span>
              </button>

              <Link to={`/careers/${experiment.careerId}`}>
                <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                  Explore {experiment.roleName} Details
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Active Stage */
          <div className="space-y-6 animate-fadeIn">
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-charcoal-700">
                  Decision {currentStageIdx + 1} of {totalStages} • {experiment.roleName}
                </span>
                <span className="font-mono text-charcoal-400">
                  {Math.round(((currentStageIdx + 1) / totalStages) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-1.5 bg-ivory-50 border border-ivory-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${((currentStageIdx + 1) / totalStages) * 100}%` }}
                />
              </div>
            </div>

            {/* Main Stage Card */}
            <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-6">
              
              {/* Context */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
                  {currentStage.title}
                </span>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed bg-ivory-50 p-4 rounded-2xl border border-ivory-200">
                  {currentStage.context}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-charcoal-900 tracking-tight pt-1">
                  {currentStage.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentStage.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={showFeedback}
                      className={`w-full p-4 rounded-2xl text-left border transition-all text-xs sm:text-sm ${
                        isSelected
                          ? opt.feedbackType === 'success'
                            ? 'bg-forest-50 border-forest-600 text-charcoal-900 font-semibold shadow-sm'
                            : 'bg-amber-50/70 border-amber-500 text-charcoal-900 font-semibold shadow-sm'
                          : showFeedback
                          ? 'bg-ivory-50 text-charcoal-400 border-ivory-200 opacity-60'
                          : 'bg-ivory-50 text-charcoal-800 border-ivory-200 hover:border-charcoal-400 hover:bg-card'
                      }`}
                    >
                      <p className="leading-snug">{opt.title}</p>
                    </button>
                  );
                })}
              </div>

              {/* Instant Educational Feedback Banner */}
              {showFeedback && selectedOption && (
                <div className={`p-4 rounded-2xl border space-y-2 animate-fadeIn ${
                  selectedOption.feedbackType === 'success'
                    ? 'bg-forest-50/80 border-forest-200 text-forest-950'
                    : 'bg-amber-50/80 border-amber-200 text-amber-950'
                }`}>
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {selectedOption.feedbackType === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-forest-700" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                    )}
                    <span>Outcome & Real-World Reality:</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    {selectedOption.feedback}
                  </p>
                  <p className="text-[11px] opacity-80 pt-1 italic">
                    Why: {selectedOption.explanation}
                  </p>
                </div>
              )}

              {/* Controls */}
              {showFeedback && (
                <div className="pt-4 border-t border-ivory-200 flex justify-end animate-fadeIn">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleNextStage}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    {currentStageIdx < totalStages - 1 ? "Next Decision" : "Complete Experiment"}
                  </Button>
                </div>
              )}

            </div>

            <p className="text-center text-xs text-charcoal-400 font-serif italic">
              "Your future has more possibilities than you think."
            </p>

          </div>
        )}

      </div>
    </div>
  );
};
