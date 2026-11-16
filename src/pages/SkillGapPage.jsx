import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { allCareers } from '../data/careerLibraryData';
import { careerExperiments } from '../data/careerExperimentsData';
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  BookOpen, 
  Layers, 
  Award,
  Play
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const SkillGapPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { careerId: careerIdParam } = useParams();
  const navigate = useNavigate();
  const { studentProfile, saveSkillGapResult } = useAuth();

  const careerParam = careerIdParam || searchParams.get('career') || 'product-designer';
  const selectedCareer = allCareers.find(c => c.id === careerParam) || allCareers[0];

  // Map of skill states: { [skillName]: 'have' | 'improving' | 'need' }
  const [skillStates, setSkillStates] = useState({});
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Check if experiment exists for this career
  const relatedExperiment = careerExperiments.find(
    e => e.careerId === selectedCareer.id || e.id.includes(selectedCareer.id)
  );

  // Initialize skills strictly from saved skill gap records or real completed experiments & assessments
  useEffect(() => {
    const saved = studentProfile.skillGapResults?.[selectedCareer.id];
    if (saved && saved.existingSkills) {
      const stateObj = {};
      (saved.existingSkills || []).forEach(s => { stateObj[s] = 'have'; });
      (saved.improvingSkills || []).forEach(s => { stateObj[s] = 'improving'; });
      (saved.missingSkills || []).forEach(s => { stateObj[s] = 'need'; });
      setSkillStates(stateObj);
    } else {
      const stateObj = {};
      const completedIds = studentProfile.completedExperiments || [];
      const completedExps = careerExperiments.filter((e) => completedIds.includes(e.id));
      const discoveredSkillsLower = completedExps.flatMap((e) =>
        (e.skillsGained || []).map((s) => s.toLowerCase())
      );
      const hasCompletedRelatedExp = completedExps.some(
        (e) => e.careerId === selectedCareer.id || e.categoryId === selectedCareer.categoryId
      );

      const topDim = studentProfile.personalityResult?.topDimension;
      const strengthTextList = [
        ...(studentProfile.strengthResult?.topStrengths || []),
        ...(studentProfile.personalityResult?.archetype?.strengths || [])
      ].map((s) => s.toLowerCase());
      const topInterestIds = (studentProfile.interestResult?.topThree || []).map((i) => i.id);
      const hasMatchingInterest = topInterestIds.includes(selectedCareer.categoryId);

      const matchesSkillList = (skill, list) => {
        const sk = skill.toLowerCase();
        return list.some((item) => item.includes(sk) || sk.includes(item));
      };

      (selectedCareer.technicalSkills || []).forEach((sk, idx) => {
        if (matchesSkillList(sk, discoveredSkillsLower)) {
          stateObj[sk] = 'have';
        } else if (hasCompletedRelatedExp && idx === 0) {
          stateObj[sk] = 'improving';
        } else {
          stateObj[sk] = 'need';
        }
      });

      (selectedCareer.softSkills || []).forEach((sk) => {
        const skLower = sk.toLowerCase();
        if (matchesSkillList(sk, discoveredSkillsLower) || matchesSkillList(sk, strengthTextList)) {
          stateObj[sk] = 'have';
        } else if (
          (topDim === 'empathy' && (skLower.includes('empathy') || skLower.includes('listen') || skLower.includes('comm'))) ||
          (topDim === 'systems' && (skLower.includes('logic') || skLower.includes('analytical') || skLower.includes('problem'))) ||
          (topDim === 'grit' && (skLower.includes('detail') || skLower.includes('reliab'))) ||
          hasMatchingInterest
        ) {
          stateObj[sk] = 'improving';
        } else {
          stateObj[sk] = 'need';
        }
      });
      setSkillStates(stateObj);
    }
  }, [
    selectedCareer.id,
    studentProfile.skillGapResults,
    studentProfile.personalityResult,
    studentProfile.strengthResult,
    studentProfile.interestResult,
    studentProfile.completedExperiments
  ]);

  // Skill state toggle handler
  const setStatus = (skillName, status) => {
    const updated = { ...skillStates, [skillName]: status };
    setSkillStates(updated);
    persistAnalysis(updated);
  };

  // Grouped lists
  const existingSkills = useMemo(() => {
    return Object.keys(skillStates).filter(s => skillStates[s] === 'have');
  }, [skillStates]);

  const improvingSkills = useMemo(() => {
    return Object.keys(skillStates).filter(s => skillStates[s] === 'improving');
  }, [skillStates]);

  const missingSkills = useMemo(() => {
    return Object.keys(skillStates).filter(s => skillStates[s] === 'need');
  }, [skillStates]);

  // Total required skills count
  const allRequiredSkills = useMemo(() => {
    return (selectedCareer.technicalSkills || []).concat(selectedCareer.softSkills || []);
  }, [selectedCareer]);

  // Calculate readiness score: have = 100%, improving = 50%, need = 0%
  const readinessScore = useMemo(() => {
    if (allRequiredSkills.length === 0) return 0;
    const haveWeight = existingSkills.length * 1.0;
    const improvingWeight = improvingSkills.length * 0.5;
    const raw = ((haveWeight + improvingWeight) / allRequiredSkills.length) * 100;
    return Math.min(100, Math.round(raw));
  }, [allRequiredSkills, existingSkills, improvingSkills]);

  // Persist analysis helper
  const persistAnalysis = (states) => {
    const existing = Object.keys(states).filter(s => states[s] === 'have');
    const improving = Object.keys(states).filter(s => states[s] === 'improving');
    const missing = Object.keys(states).filter(s => states[s] === 'need');

    const haveWeight = existing.length * 1.0;
    const improvingWeight = improving.length * 0.5;
    const score = Math.min(100, Math.round(((haveWeight + improvingWeight) / (allRequiredSkills.length || 1)) * 100));

    saveSkillGapResult(selectedCareer.id, {
      careerId: selectedCareer.id,
      careerTitle: selectedCareer.title,
      existingSkills: existing,
      improvingSkills: improving,
      missingSkills: missing,
      readinessScore: score
    });

    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const handleCareerChange = (e) => {
    const newCareerId = e.target.value;
    if (careerIdParam) {
      navigate(`/skills/${newCareerId}`);
    } else {
      setSearchParams({ career: newCareerId });
    }
  };

  // Personalized narrative summary
  const summaryText = useMemo(() => {
    const topStrength = existingSkills[0] || "your natural curiosity";
    const topGap = missingSkills[0] || (selectedCareer.technicalSkills?.[0] || "core technical methods");
    
    if (readinessScore >= 75) {
      return `You have an outstanding starting foundation for ${selectedCareer.title}! Your demonstrated strength in ${topStrength} gives you immediate credibility. Focus on refining ${topGap} to achieve full mastery.`;
    }
    if (readinessScore >= 45) {
      return `You have a promising foundation for ${selectedCareer.title}. By building on ${topStrength} and advancing ${improvingSkills[0] || "your developing abilities"}, you can quickly bridge into professional readiness. Prioritize ${topGap} as your next learning sprint.`;
    }
    return `Every career journey begins with discovery. While ${selectedCareer.title} requires several new proficiencies, your interest and foundation in ${topStrength} provide a clear entry point. Starting with hands-on practice in ${topGap} will accelerate your progress.`;
  }, [readinessScore, selectedCareer, existingSkills, improvingSkills, missingSkills]);

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
            {isSavedNotice && (
              <span className="text-xs text-forest-800 font-semibold flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved
              </span>
            )}
            <Link to={`/roadmap?career=${selectedCareer.id}`}>
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                View Learning Roadmap
              </Button>
            </Link>
          </div>
        </div>

        {/* Page Hero */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
            Skill Gap Analyzer
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900">
            Map Your Current Skills <br />
            <span className="font-serif italic font-normal text-forest-800">
              Against Your Desired Career.
            </span>
          </h1>
          <p className="text-sm text-charcoal-600 leading-relaxed">
            Select any of PathPilot's 21 professions. Identify the skills you already have, the ones you are developing, and what to focus on next.
          </p>
        </div>

        {/* Career Selector Bar */}
        <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
              Target Career Direction:
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

          <div className="flex items-center gap-2">
            <Link
              to={`/careers/${selectedCareer.id}`}
              className="text-xs font-semibold text-charcoal-600 hover:text-forest-800 transition-colors"
            >
              Explore Profile →
            </Link>
            {relatedExperiment && (
              <Link to={`/experiments/${relatedExperiment.id}`}>
                <Button variant="secondary" size="sm" icon={Play} iconPosition="left">
                  Test-Drive Role
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Skill Readiness Score Banner */}
        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
                Skill Readiness Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
                  {readinessScore}%
                </span>
                <span className="text-xs text-charcoal-500 font-medium">
                  Readiness for {selectedCareer.title}
                </span>
              </div>
            </div>

            {/* Counts breakdown */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-2xl bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-900">
                {existingSkills.length} Have
              </span>
              <span className="px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
                {improvingSkills.length} Improving
              </span>
              <span className="px-3 py-1.5 rounded-2xl bg-ivory-50 border border-ivory-200 text-xs font-semibold text-charcoal-700">
                {missingSkills.length} Need
              </span>
            </div>
          </div>

          {/* Readiness Meter Bar */}
          <div className="w-full h-2.5 bg-ivory-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${readinessScore}%` }}
            />
          </div>

          {/* Personalized Summary */}
          <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest-700" />
              Personalized Analysis
            </span>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              {summaryText}
            </p>
          </div>
        </div>

        {/* Interactive Skill Classification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Technical & Craft Skills */}
          <div className="bg-card rounded-3xl p-6 sm:p-7 border border-ivory-200 shadow-sm space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">
                Category 1
              </span>
              <h3 className="font-bold text-base text-charcoal-900">
                Technical & Craft Skills
              </h3>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Methods, software tools, and domain proficiencies.
              </p>
            </div>

            <div className="space-y-3">
              {(selectedCareer.technicalSkills || []).map((skill) => {
                const currentStatus = skillStates[skill] || 'need';
                return (
                  <div
                    key={skill}
                    className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-charcoal-900">
                      {skill}
                    </span>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setStatus(skill, 'have')}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                          currentStatus === 'have'
                            ? 'bg-accent text-on-accent shadow-sm'
                            : 'bg-card text-charcoal-600 border border-ivory-200 hover:bg-muted'
                        }`}
                      >
                        ✓ I Have This
                      </button>
                      <button
                        onClick={() => setStatus(skill, 'improving')}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                          currentStatus === 'improving'
                            ? 'bg-amber-600 text-on-accent shadow-sm'
                            : 'bg-card text-charcoal-600 border border-ivory-200 hover:bg-muted'
                        }`}
                      >
                        Improving
                      </button>
                      <button
                        onClick={() => setStatus(skill, 'need')}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                          currentStatus === 'need'
                            ? 'bg-inverse text-on-inverse shadow-sm'
                            : 'bg-card text-charcoal-600 border border-ivory-200 hover:bg-muted'
                        }`}
                      >
                        Need
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Soft Skills & Human Strengths */}
          <div className="bg-card rounded-3xl p-6 sm:p-7 border border-ivory-200 shadow-sm space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">
                Category 2
              </span>
              <h3 className="font-bold text-base text-charcoal-900">
                Soft Skills & Human Strengths
              </h3>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Communication, collaboration, and thinking habits.
              </p>
            </div>

            <div className="space-y-3">
              {(selectedCareer.softSkills || []).map((skill) => {
                const currentStatus = skillStates[skill] || 'need';
                return (
                  <div
                    key={skill}
                    className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-charcoal-900">
                      {skill}
                    </span>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setStatus(skill, 'have')}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                          currentStatus === 'have'
                            ? 'bg-accent text-on-accent shadow-sm'
                            : 'bg-card text-charcoal-600 border border-ivory-200 hover:bg-muted'
                        }`}
                      >
                        ✓ I Have This
                      </button>
                      <button
                        onClick={() => setStatus(skill, 'improving')}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                          currentStatus === 'improving'
                            ? 'bg-amber-600 text-on-accent shadow-sm'
                            : 'bg-card text-charcoal-600 border border-ivory-200 hover:bg-muted'
                        }`}
                      >
                        Improving
                      </button>
                      <button
                        onClick={() => setStatus(skill, 'need')}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                          currentStatus === 'need'
                            ? 'bg-inverse text-on-inverse shadow-sm'
                            : 'bg-card text-charcoal-600 border border-ivory-200 hover:bg-muted'
                        }`}
                      >
                        Need
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* 3-Column Visual Comparison Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Existing Skills */}
          <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-forest-800 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-forest-700" />
              <span>Skills You Already Have ({existingSkills.length})</span>
            </div>
            {existingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {existingSkills.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs text-forest-900 font-medium">
                    ✓ {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-charcoal-400 italic">No skills marked as acquired yet.</p>
            )}
          </div>

          {/* Skills to Improve */}
          <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <TrendingUp className="w-4 h-4 text-amber-700" />
              <span>Skills to Sharpen ({improvingSkills.length})</span>
            </div>
            {improvingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {improvingSkills.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                    ↗ {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-charcoal-400 italic">No skills currently marked as improving.</p>
            )}
          </div>

          {/* Missing Skills */}
          <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-charcoal-700 font-bold text-sm">
              <Layers className="w-4 h-4 text-charcoal-600" />
              <span>Missing Skills to Learn ({missingSkills.length})</span>
            </div>
            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {missingSkills.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-ivory-50 border border-ivory-200 text-xs text-charcoal-700 font-medium">
                    • {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-charcoal-400 italic">No missing skills! You meet all listed requirements.</p>
            )}
          </div>

        </div>

        {/* Bottom CTA to Learning Roadmap */}
        <div className="bg-card rounded-3xl p-8 border border-ivory-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
              Next Step in Your Journey
            </span>
            <h3 className="text-lg font-bold text-charcoal-900">
              Ready to bridge your skill gap?
            </h3>
            <p className="text-xs text-charcoal-600">
              Generate a 4-stage personalized roadmap with beginner tutorials, free courses, and weekend projects tailored for {selectedCareer.title}.
            </p>
          </div>

          <Link to={`/roadmap?career=${selectedCareer.id}`} className="shrink-0">
            <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
              Generate Learning Roadmap
            </Button>
          </Link>
        </div>

        {/* Motivational Quote */}
        <p className="text-center text-xs text-charcoal-400 font-serif italic pt-2">
          "Your potential is built one skill at a time."
        </p>

      </div>
    </div>
  );
};
