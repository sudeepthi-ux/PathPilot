import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { generateCareerRecommendations } from '../services/geminiRecommendations';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  Brain, 
  Compass, 
  RotateCcw,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const RecommendationsPage = () => {
  const { user, studentProfile, toggleSaveCareer } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const personalityResult = studentProfile.personalityResult;
  const interestResult = studentProfile.interestResult;
  const strengthResult = studentProfile.strengthResult;
  const completedExperiments = studentProfile.completedExperiments || [];
  const savedCareers = studentProfile.savedCareers || [];

  const hasTakenAnyAssessment = Boolean(personalityResult || interestResult || strengthResult || completedExperiments.length > 0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    generateCareerRecommendations({
      personalityResult,
      interestResult,
      strengthResult,
      completedExperiments,
      userPreferences: {
        major: user?.major,
        university: user?.university
      }
    }).then((results) => {
      if (isMounted) {
        setRecommendations(results.slice(0, 4));
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [personalityResult, interestResult, strengthResult, completedExperiments, user]);

  return (
    <div className="pt-24 pb-20 bg-ivory-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
            Personalized Guidance
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-charcoal-900 leading-tight">
            Careers Recommended <br />
            <span className="font-serif italic font-normal text-forest-800">
              for who you are.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            These suggestions are calculated directly from your personality thinking style, interest spectrum, and completed career challenges.
          </p>
        </div>

        {/* Assessment Completion Notice */}
        {!hasTakenAnyAssessment && (
          <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-charcoal-900">Unlock Tailored Match Calculations</h3>
              <p className="text-xs text-charcoal-500">
                You haven't completed an assessment yet. Taking 5 minutes will personalize your exact match scores and strengths!
              </p>
            </div>
            <Link to="/assessment/personality">
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                Start Personality Assessment
              </Button>
            </Link>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-forest-700 animate-spin mx-auto" />
            <p className="text-xs text-charcoal-500">
              Calculating recommendations from your strengths and interests...
            </p>
          </div>
        ) : (
          /* Recommendations Cards List */
          <div className="space-y-6">
            {recommendations.map((rec, idx) => {
              const isSaved = savedCareers.some(c => c.id === rec.id || c.title === rec.title);
              return (
                <div
                  key={rec.id}
                  className="bg-card rounded-3xl p-7 sm:p-8 border border-ivory-200 shadow-sm hover:shadow-md transition-all space-y-5"
                >
                  {/* Top Bar with Match Percentage & Save Bookmark */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-ivory-200">
                    <div className="flex items-center gap-2.5">
                      <span className="font-serif text-lg italic text-forest-800 font-bold">
                        #{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-forest-900 bg-forest-100 px-3 py-1 rounded-full border border-forest-200">
                        {rec.matchPercentage} Trajectory Match
                      </span>
                      <span className="text-xs text-charcoal-400 font-medium">
                        {rec.categoryName}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleSaveCareer(rec)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5 ${
                        isSaved
                          ? 'bg-accent text-on-accent border-accent'
                          : 'bg-ivory-50 text-charcoal-700 border-ivory-200 hover:border-charcoal-400'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-accent-soft" /> : <Bookmark className="w-3.5 h-3.5" />}
                      <span>{isSaved ? "Saved" : "Save Career"}</span>
                    </button>
                  </div>

                  {/* Title & Overview */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-bold text-charcoal-900 tracking-tight">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-charcoal-500 font-serif italic">
                      "{rec.tagline}"
                    </p>
                  </div>

                  {/* Why it suits you */}
                  <div className="p-4 rounded-2xl bg-forest-50/70 border border-forest-200/80 space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                      Why this career suits you:
                    </span>
                    <p className="text-xs sm:text-sm text-forest-950 leading-relaxed">
                      {rec.whySuitsYou}
                    </p>
                  </div>

                  {/* Matching Strengths & Interests Tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block mb-1">
                        Matching Strengths:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.matchingStrengths.map((str) => (
                          <span key={str} className="px-2.5 py-0.5 rounded-md bg-ivory-50 border border-ivory-200 text-charcoal-700 font-medium">
                            ✓ {str}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block mb-1">
                        Required Core Skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(rec.technicalSkills || []).slice(0, 3).map((sk) => (
                          <span key={sk} className="px-2.5 py-0.5 rounded-md bg-ivory-50 border border-ivory-200 text-charcoal-700 font-medium">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* What you should learn next */}
                  <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-600 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-forest-700" />
                      Suggested Starter Project to Try:
                    </span>
                    <p className="text-xs text-charcoal-700 leading-relaxed">
                      {rec.nextStep}
                    </p>
                  </div>

                  {/* Footer actions & alternative options */}
                  <div className="pt-4 border-t border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="text-charcoal-500">
                      <span>Similar paths to check: </span>
                      <strong className="text-charcoal-800">
                        {rec.alternativeOptions.join(", ")}
                      </strong>
                    </div>

                    <Link to={`/careers/${rec.id}`}>
                      <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                        View Full Career Overview
                      </Button>
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Motivational note */}
        <p className="text-center text-xs text-charcoal-400 font-serif italic pt-4">
          "Explore your interests. Discover your possibilities."
        </p>

      </div>
    </div>
  );
};
