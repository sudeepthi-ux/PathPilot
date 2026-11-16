import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Brain, 
  Play, 
  Compass, 
  Layers, 
  Award,
  ArrowRight
} from 'lucide-react';
import { Button } from '../common/Button';

export const ProgressTracker = () => {
  const { progressMetrics, studentProfile } = useAuth();

  const getEncouragement = () => {
    const pct = progressMetrics.overallProgressPercentage;
    if (pct >= 80) return "Outstanding dedication! You have built clear self-awareness, tested real roles, and established actionable learning plans.";
    if (pct >= 50) return "Great momentum! You are uncovering your strengths and taking practical steps toward your future.";
    if (pct >= 25) return "Good start! Keep exploring career experiments and map your skills to see where you naturally excel.";
    return "Welcome to your discovery journey! Start with one of the 3 self-discovery assessments or try a 4-minute career experiment.";
  };

  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-8">
      
      {/* Header & Overall Meter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
              Student Progress & Milestones
            </span>
            <h3 className="text-xl font-bold text-charcoal-900 tracking-tight">
              Career Discovery Readiness
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-charcoal-900">
              {progressMetrics.overallProgressPercentage}%
            </span>
            <span className="text-xs text-charcoal-500 font-medium">
              Overall Completion
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-ivory-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progressMetrics.overallProgressPercentage}%` }}
          />
        </div>

        {/* Encouraging Milestone Note */}
        <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-medium">
            {getEncouragement()}
          </p>
        </div>
      </div>

      {/* 6 Core Metric Tracking Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* 1. Assessments */}
        <Link
          to="/assessment/personality"
          className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 hover:border-charcoal-400 transition-all flex flex-col justify-between space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <Brain className="w-4 h-4 text-forest-800" />
            <span className="text-[10px] font-bold text-forest-800">
              {progressMetrics.assessmentsCompleted}/{progressMetrics.totalAssessments}
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-charcoal-900 group-hover:text-forest-800">Assessments</h4>
            <p className="text-[10px] text-charcoal-500">Self-Discovery</p>
          </div>
        </Link>

        {/* 2. Experiments */}
        <Link
          to="/experiments"
          className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 hover:border-charcoal-400 transition-all flex flex-col justify-between space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <Play className="w-4 h-4 text-forest-800" />
            <span className="text-[10px] font-bold text-forest-800">
              {progressMetrics.experimentsCompleted}/{progressMetrics.totalExperiments}
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-charcoal-900 group-hover:text-forest-800">Experiments</h4>
            <p className="text-[10px] text-charcoal-500">Test Drives</p>
          </div>
        </Link>

        {/* 3. Careers Explored */}
        <Link
          to="/careers"
          className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 hover:border-charcoal-400 transition-all flex flex-col justify-between space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <Compass className="w-4 h-4 text-forest-800" />
            <span className="text-[10px] font-bold text-forest-800">
              {progressMetrics.exploredCareersCount}/21
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-charcoal-900 group-hover:text-forest-800">Explored</h4>
            <p className="text-[10px] text-charcoal-500">Library Catalog</p>
          </div>
        </Link>

        {/* 4. Saved Careers */}
        <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <Award className="w-4 h-4 text-forest-800" />
            <span className="text-[10px] font-bold text-forest-800">
              {progressMetrics.savedCareersCount}
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-charcoal-900">Saved</h4>
            <p className="text-[10px] text-charcoal-500">Bookmarked</p>
          </div>
        </div>

        {/* 5. Skill Gaps */}
        <Link
          to="/skills"
          className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 hover:border-charcoal-400 transition-all flex flex-col justify-between space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <Layers className="w-4 h-4 text-forest-800" />
            <span className="text-[10px] font-bold text-forest-800">
              {progressMetrics.skillsAnalyzedCount}
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-charcoal-900 group-hover:text-forest-800">Skill Gaps</h4>
            <p className="text-[10px] text-charcoal-500">Analyzed</p>
          </div>
        </Link>

        {/* 6. Roadmap */}
        <Link
          to="/roadmap"
          className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 hover:border-charcoal-400 transition-all flex flex-col justify-between space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <CheckCircle2 className="w-4 h-4 text-forest-800" />
            <span className="text-[10px] font-bold text-forest-800">
              {progressMetrics.roadmapActivitiesCompleted}
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-charcoal-900 group-hover:text-forest-800">Roadmap</h4>
            <p className="text-[10px] text-charcoal-500">Completed Acts</p>
          </div>
        </Link>

      </div>

      {/* Milestones Unlocking Cards */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
          Career Discovery Milestones
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {progressMetrics.milestones.map((m) => (
            <div
              key={m.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                m.achieved
                  ? 'bg-forest-50/70 border-forest-200 text-charcoal-900'
                  : 'bg-ivory-50 border-ivory-200 text-charcoal-500'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                {m.achieved ? (
                  <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-charcoal-300 shrink-0" />
                )}
                <div className="truncate">
                  <h5 className="text-xs font-bold truncate">{m.title}</h5>
                  <p className="text-[10px] text-charcoal-500 truncate">{m.description}</p>
                </div>
              </div>

              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                m.achieved
                  ? 'bg-forest-200/80 text-forest-900'
                  : 'bg-card text-charcoal-400 border border-ivory-200'
              }`}>
                {m.date}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
