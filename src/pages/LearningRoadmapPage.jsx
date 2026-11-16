import React, { useMemo } from 'react';
import { useSearchParams, useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { allCareers } from '../data/careerLibraryData';
import { generateRoadmapForCareer } from '../data/roadmapTemplates';
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  BookOpen, 
  Wrench, 
  Award, 
  Lightbulb,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const LearningRoadmapPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { careerId: careerIdParam } = useParams();
  const navigate = useNavigate();
  const { 
    studentProfile, 
    toggleRoadmapActivity, 
    isRoadmapActivityCompleted,
    getRoadmapProgress 
  } = useAuth();

  const careerParam = careerIdParam || searchParams.get('career') || 'product-designer';
  const selectedCareer = allCareers.find(c => c.id === careerParam) || allCareers[0];

  const skillGapData = studentProfile.skillGapResults?.[selectedCareer.id] || null;

  // Generate structured 4-stage roadmap
  const roadmap = useMemo(() => {
    return generateRoadmapForCareer(selectedCareer.id, skillGapData);
  }, [selectedCareer.id, skillGapData]);

  // Compute total activities and completed count
  const allActivities = useMemo(() => {
    return roadmap.stages.flatMap(st => st.activities);
  }, [roadmap]);

  const progress = getRoadmapProgress(selectedCareer.id, allActivities.length);

  const handleCareerChange = (e) => {
    const newCareerId = e.target.value;
    if (careerIdParam) {
      navigate(`/roadmap/${newCareerId}`);
    } else {
      setSearchParams({ career: newCareerId });
    }
  };

  return (
    <div className="pt-24 pb-20 bg-ivory-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-ivory-200 gap-4">
          <Link
            to="/careers"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Career Discovery Library</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link to={`/skills?career=${selectedCareer.id}`}>
              <Button variant="ghost" size="sm" icon={Compass} iconPosition="left">
                Skill Gap Analyzer
              </Button>
            </Link>
            <Link to={`/careers/${selectedCareer.id}`}>
              <Button variant="secondary" size="sm">
                Career Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Page Hero */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
            Personalized Learning Roadmap
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900">
            Step-by-Step Pathway for <br />
            <span className="font-serif italic font-normal text-forest-800">
              {selectedCareer.title}.
            </span>
          </h1>
          <p className="text-sm text-charcoal-600 leading-relaxed">
            A clear, four-stage progression from beginner foundations to independent portfolio projects and community connection. Check off activities as you learn.
          </p>
        </div>

        {/* Career Selector & Gap Context Banner */}
        <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
              Learning Roadmap For:
            </label>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-forest-800 shrink-0" />
              <select
                value={selectedCareer.id}
                onChange={handleCareerChange}
                className="bg-ivory-50 border border-ivory-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-forest-800"
              >
                {allCareers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.categoryName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Skill Gap Context */}
          {skillGapData ? (
            <div className="flex items-center gap-3 bg-forest-50 border border-forest-200 px-4 py-2 rounded-2xl">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 block">
                  Identified Readiness:
                </span>
                <p className="text-xs font-semibold text-forest-950">
                  {skillGapData.readinessScore}% Match • {skillGapData.missingSkills?.length || 0} priority gaps
                </p>
              </div>
              <Link to={`/skills?career=${selectedCareer.id}`} className="text-xs text-forest-800 font-bold hover:underline">
                Edit Gaps
              </Link>
            </div>
          ) : (
            <Link
              to={`/skills?career=${selectedCareer.id}`}
              className="text-xs font-semibold text-charcoal-600 hover:text-forest-800"
            >
              Want tailored priorities? Analyze your skill gap →
            </Link>
          )}
        </div>

        {/* Overall Progress Banner */}
        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
                Roadmap Progress
              </span>
              <h3 className="text-xl font-bold text-charcoal-900">
                {progress.completed} of {progress.total} Activities Completed ({progress.percentage}%)
              </h3>
            </div>
            {progress.percentage === 100 && (
              <span className="px-3 py-1 rounded-full bg-forest-100 text-forest-900 font-bold text-xs flex items-center gap-1.5 animate-fadeIn">
                <Award className="w-4 h-4 text-forest-700" /> All Milestones Completed!
              </span>
            )}
          </div>

          <div className="w-full h-2.5 bg-ivory-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>

        {/* 4 Simple Stages Accordion/Cards */}
        <div className="space-y-6">
          {roadmap.stages.map((stage) => {
            const stageCompletedCount = stage.activities.filter(a => isRoadmapActivityCompleted(selectedCareer.id, a.id)).length;
            const isStageFullyDone = stageCompletedCount === stage.activities.length;

            return (
              <div
                key={stage.id}
                className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-6"
              >
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-ivory-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
                        {stage.title.split(':')[0]}
                      </span>
                      <span className="text-[10px] text-charcoal-400 font-mono">
                        • {stage.estimatedTime}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-charcoal-900">
                      {stage.title.split(': ')[1] || stage.title}
                    </h3>
                    <p className="text-xs text-charcoal-600 leading-relaxed max-w-2xl">
                      {stage.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                      isStageFullyDone
                        ? 'bg-forest-100 text-forest-900'
                        : 'bg-ivory-50 border border-ivory-200 text-charcoal-600'
                    }`}>
                      {isStageFullyDone ? <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" /> : <Circle className="w-3.5 h-3.5 text-charcoal-400" />}
                      <span>{stageCompletedCount}/{stage.activities.length} Complete</span>
                    </span>
                  </div>
                </div>

                {/* Milestone Pill */}
                <div className="p-3 rounded-2xl bg-ivory-50 border border-ivory-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium text-charcoal-800">
                    <Award className="w-4 h-4 text-forest-800 shrink-0" />
                    <span>Stage Milestone: <strong className="text-charcoal-900">{stage.milestone}</strong></span>
                  </div>
                  {isStageFullyDone && (
                    <span className="text-[11px] font-bold text-forest-800 uppercase tracking-wider">
                      Unlocked ✓
                    </span>
                  )}
                </div>

                {/* Activities List */}
                <div className="space-y-3">
                  {stage.activities.map((act) => {
                    const isDone = isRoadmapActivityCompleted(selectedCareer.id, act.id);
                    return (
                      <div
                        key={act.id}
                        onClick={() => toggleRoadmapActivity(selectedCareer.id, act.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isDone
                            ? 'bg-forest-50/50 border-forest-200'
                            : 'bg-card border-ivory-200 hover:border-charcoal-400 hover:bg-ivory-50/40'
                        }`}
                      >
                        {/* Interactive Checkbox */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRoadmapActivity(selectedCareer.id, act.id);
                          }}
                          className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isDone
                              ? 'bg-accent text-on-accent'
                              : 'border border-charcoal-300 hover:border-charcoal-600 bg-card'
                          }`}
                        >
                          {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>

                        {/* Activity Details */}
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h4 className={`text-xs sm:text-sm font-bold ${
                              isDone ? 'line-through text-charcoal-500' : 'text-charcoal-900'
                            }`}>
                              {act.title}
                            </h4>
                            <span className="text-[10px] font-mono text-charcoal-400 uppercase tracking-wider">
                              {act.type}
                            </span>
                          </div>

                          <p className={`text-xs leading-relaxed ${
                            isDone ? 'text-charcoal-400' : 'text-charcoal-600'
                          }`}>
                            {act.description}
                          </p>

                          {act.resource && (
                            <div className="pt-1 flex items-center gap-1.5 text-[11px] text-forest-800 font-medium">
                              <BookOpen className="w-3 h-3 text-forest-700" />
                              <span>Free Resource: {act.resource}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

        {/* Motivational Quote */}
        <p className="text-center text-xs text-charcoal-400 font-serif italic pt-4">
          "Every discovery brings you closer to your purpose."
        </p>

      </div>
    </div>
  );
};
