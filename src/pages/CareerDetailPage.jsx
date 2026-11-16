import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { allCareers } from '../data/careerLibraryData';
import { careerExperiments } from '../data/careerExperimentsData';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  BookOpen, 
  Wrench, 
  GraduationCap, 
  TrendingUp, 
  Play,
  Lightbulb,
  Compass,
  Layers,
  Map
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const CareerDetailPage = () => {
  const { careerId } = useParams();
  const navigate = useNavigate();
  const { studentProfile, toggleSaveCareer, recordCareerExplored } = useAuth();

  const career = allCareers.find((c) => c.id === careerId) || allCareers[0];
  const isSaved = (studentProfile.savedCareers || []).some((c) => c.id === career.id || c.title === career.title);

  useEffect(() => {
    if (career?.id) {
      recordCareerExplored(career.id);
    }
  }, [career?.id]);

  // Check if there is an interactive experiment for this career
  const relatedExperiment = careerExperiments.find((e) => e.careerId === career.id || e.id.includes(career.id));

  // Find related careers
  const relatedCareerObjects = (career.relatedCareers || []).map((relId) => {
    return allCareers.find((c) => c.id === relId);
  }).filter(Boolean);

  return (
    <div className="pt-24 pb-20 bg-ivory-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        
        {/* Back Link & Category */}
        <div className="flex items-center justify-between pb-6 border-b border-ivory-200">
          <Link
            to="/careers"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Career Discovery Library</span>
          </Link>

          <span className="text-xs font-semibold text-forest-800">
            {career.categoryName}
          </span>
        </div>

        {/* Hero Header */}
        <div className="bg-card rounded-3xl p-8 sm:p-10 border border-ivory-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
                Career Profile
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900">
                {career.title}
              </h1>
              <p className="text-base text-charcoal-600 font-serif italic">
                "{career.tagline}"
              </p>
            </div>

            <button
              onClick={() => toggleSaveCareer(career)}
              className={`p-3 rounded-full border transition-all flex items-center justify-center shrink-0 self-start ${
                isSaved
                  ? 'bg-accent text-on-accent border-accent shadow-sm'
                  : 'bg-ivory-50 text-charcoal-600 border-ivory-200 hover:border-charcoal-400'
              }`}
              title={isSaved ? "Saved in your dashboard" : "Save this career"}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5 text-accent-soft" /> : <Bookmark className="w-5 h-5" />}
            </button>
          </div>

          <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed pt-2">
            {career.overview}
          </p>

          {/* Quick Actions: Skill Gap & Learning Roadmap */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to={`/skills?career=${career.id}`}>
              <Button variant="secondary" size="sm" icon={Layers} iconPosition="left">
                Analyze Skill Gap
              </Button>
            </Link>
            <Link to={`/roadmap?career=${career.id}`}>
              <Button variant="ghost" size="sm" icon={Map} iconPosition="left">
                View Learning Roadmap
              </Button>
            </Link>
          </div>

          {/* Interactive Experiment Banner if available */}
          {relatedExperiment && (
            <div className="p-5 rounded-2xl bg-forest-50 border border-forest-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Try The Career Experiment
                </span>
                <p className="text-xs text-forest-950 font-medium">
                  {relatedExperiment.tagline}
                </p>
              </div>
              <Link to={`/experiments/${relatedExperiment.id}`}>
                <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                  Test-Drive This Role (4 Mins)
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* What People Do & Daily Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* What people do */}
          <div className="bg-card rounded-3xl p-7 border border-ivory-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-charcoal-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-forest-800" />
              What people do in this profession
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed bg-ivory-50 p-4 rounded-2xl border border-ivory-200">
              {career.whatTheyDo}
            </p>
          </div>

          {/* Daily responsibilities */}
          <div className="bg-card rounded-3xl p-7 border border-ivory-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-charcoal-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-800" />
              Day-to-day responsibilities
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-700">
              {career.dailyResponsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-700 shrink-0 mt-2" />
                  <span className="leading-snug">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Skills & Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Skills */}
          <div className="bg-card rounded-3xl p-7 border border-ivory-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-charcoal-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-forest-800" />
              Helpful Skills to Build
            </h3>
            
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block mb-1.5">
                  Technical & Craft Skills:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {career.technicalSkills.map((sk) => (
                    <span key={sk} className="text-xs px-3 py-1 rounded-full bg-ivory-50 border border-ivory-200 text-charcoal-800 font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block mb-1.5">
                  Soft Skills & Human Strengths:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {career.softSkills.map((sk) => (
                    <span key={sk} className="text-xs px-3 py-1 rounded-full bg-ivory-50 border border-ivory-200 text-charcoal-800 font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tools & Educational Paths */}
          <div className="bg-card rounded-3xl p-7 border border-ivory-200 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-base text-charcoal-900 flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4 text-forest-800" />
                Tools Commonly Used
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {career.tools.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 font-semibold font-mono text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-ivory-200">
              <h3 className="font-bold text-base text-charcoal-900 flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-forest-800" />
                Educational Pathways
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed bg-ivory-50 p-3.5 rounded-2xl border border-ivory-200">
                {career.education}
              </p>
            </div>
          </div>

        </div>

        {/* How to Get Started - 3 Simple Steps */}
        {career.howToGetStarted && career.howToGetStarted.length > 0 && (
          <div className="bg-card rounded-3xl p-8 border border-ivory-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-forest-700" />
                How to Get Started
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-charcoal-900 tracking-tight">
                Three simple steps you can take right now
              </h3>
              <p className="text-xs text-charcoal-600">
                You do not need years of preparation. Start with these low-pressure steps to explore this profession.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {career.howToGetStarted.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-3 flex flex-col justify-start"
                >
                  <div className="w-6 h-6 rounded-full bg-accent text-on-accent text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed font-medium">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Beginner Project & Learning Resources */}
        <div className="bg-card rounded-3xl p-8 border border-ivory-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-forest-700" />
              Try a Beginner Weekend Project
            </span>
            <h3 className="text-lg font-bold text-charcoal-900">
              Test your curiosity with a hands-on project
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed bg-forest-50/70 p-4 rounded-2xl border border-forest-200">
              {career.beginnerProject}
            </p>
          </div>

          {/* Learning Resources */}
          <div className="space-y-2 pt-2 border-t border-ivory-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
              Free Beginner Learning Resources:
            </span>
            <ul className="space-y-1.5 text-xs text-charcoal-600">
              {career.learningResources.map((res, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-forest-800 font-bold">•</span>
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Careers */}
        {relatedCareerObjects.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-500">
              Related Careers You Might Like:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedCareerObjects.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/careers/${rel.id}`}
                  className="p-5 rounded-2xl bg-card border border-ivory-200 hover:border-charcoal-300 transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div>
                    <h4 className="font-bold text-xs text-charcoal-900 group-hover:text-forest-800 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-charcoal-500 mt-1 line-clamp-2">
                      {rel.tagline}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-forest-800 inline-flex items-center gap-1 pt-1">
                    <span>Learn more →</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
