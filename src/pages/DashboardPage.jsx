import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { ProfileSettingsModal } from '../components/dashboard/ProfileSettingsModal';
import { RoleDetailModal } from '../components/common/RoleDetailModal';
import { calculateRuleBasedRecommendations } from '../services/geminiRecommendations';
import { careerExperiments } from '../data/careerExperimentsData';
import { allCareers } from '../data/careerLibraryData';
import { generateRoadmapForCareer } from '../data/roadmapTemplates';
import { inspirationalQuotes } from '../data/inspirationalQuotes';
import { 
  Sparkles, 
  Brain, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Menu, 
  ExternalLink,
  ChevronRight,
  User,
  Bookmark,
  Award,
  Map
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const DashboardPage = () => {
  const { user, studentProfile, profileCompletionPercentage, toggleSaveCareer } = useAuth();
  const navigate = useNavigate();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState(null);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const currentQuote = inspirationalQuotes[quoteIdx] || inspirationalQuotes[0];
  const academicParts = [
    user?.university,
    user?.major,
    user?.gradYear ? `Class of ${user.gradYear}` : ''
  ].filter(Boolean);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const studentName = user?.name ? user.name.split(' ')[0] : 'Student';

  const hasAnyDiscoveryData = Boolean(
    studentProfile.personalityResult ||
      studentProfile.interestResult ||
      studentProfile.strengthResult ||
      (studentProfile.completedExperiments || []).length > 0
  );

  // Recommended careers calculated from real assessments & experiments
  const recommendedCareers = useMemo(() => {
    const computed = calculateRuleBasedRecommendations({
      personalityResult: studentProfile.personalityResult,
      interestResult: studentProfile.interestResult,
      strengthResult: studentProfile.strengthResult,
      completedExperiments: studentProfile.completedExperiments || []
    });
    return computed.slice(0, 3).map((c) => ({
      id: c.id,
      title: c.title,
      field: c.categoryName,
      matchPercentage: c.matchPercentage,
      reason: c.whySuitsYou
    }));
  }, [
    studentProfile.personalityResult,
    studentProfile.interestResult,
    studentProfile.strengthResult,
    studentProfile.completedExperiments
  ]);

  // Discovered skills from completed experiments
  const discoveredSkills = useMemo(() => {
    const completedIds = studentProfile.completedExperiments || [];
    const skills = new Set();
    completedIds.forEach((expId) => {
      const exp = careerExperiments.find((e) => e.id === expId);
      if (exp?.skillsGained) {
        exp.skillsGained.forEach((s) => skills.add(s));
      }
    });
    return Array.from(skills);
  }, [studentProfile.completedExperiments]);

  // Active learning roadmaps summary
  const activeRoadmaps = useMemo(() => {
    return Object.entries(studentProfile.learningRoadmaps || {})
      .map(([careerId, rm]) => {
        const completedCount = (rm?.completedActivityIds || []).length;
        if (completedCount === 0) return null;
        const careerObj = allCareers.find((c) => c.id === careerId);
        const generated = generateRoadmapForCareer(careerId);
        const totalActs = generated.stages.reduce((acc, st) => acc + st.activities.length, 0) || 12;
        return {
          careerId,
          careerTitle: careerObj?.title || careerId,
          completedCount,
          totalActs,
          percentage: Math.min(100, Math.round((completedCount / totalActs) * 100))
        };
      })
      .filter(Boolean);
  }, [studentProfile.learningRoadmaps]);

  // Normalize savedCareers safely (handles both string IDs and career objects)
  const normalizedSavedCareers = useMemo(() => {
    return (Array.isArray(studentProfile?.savedCareers) ? studentProfile.savedCareers : [])
      .map((c) => {
        if (typeof c === 'string') {
          const found = allCareers.find((item) => item.id === c);
          return found
            ? { id: found.id, title: found.title, category: found.categoryName }
            : { id: c, title: c, category: 'Saved Career' };
        }
        if (c && typeof c === 'object') {
          return {
            id: c.id || 'product-designer',
            title: c.title || c.id || 'Career Role',
            category: c.category || c.categoryName || 'Saved Career'
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [studentProfile?.savedCareers]);

  return (
    <div className="pt-16 min-h-screen bg-ivory-50 flex flex-col lg:flex-row items-start w-full">
      
      {/* Sidebar */}
      <DashboardSidebar
        onOpenSettings={() => setSettingsOpen(true)}
        isMobileOpen={mobileSidebarOpen}
        setIsMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 w-full p-6 sm:p-8 lg:p-10 pb-20 max-w-5xl mx-auto space-y-8">
        
        {/* Top Greeting Header with Academic Info & Minimal Motivational Quote */}
        <div className="pb-6 border-b border-ivory-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="p-2 rounded-xl border border-ivory-200 lg:hidden text-charcoal-700 hover:bg-card"
              >
                <Menu className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal-900">
                  {getGreeting()}, {studentName}
                </h1>
                {academicParts.length > 0 ? (
                  <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
                    {academicParts.join(' • ')}
                  </p>
                ) : (
                  <p className="text-xs text-charcoal-500 mt-0.5">
                    Add your university &amp; major in{' '}
                    <button
                      type="button"
                      onClick={() => setSettingsOpen(true)}
                      className="font-semibold text-forest-800 hover:underline"
                    >
                      Profile Settings
                    </button>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-forest-800 bg-forest-50 px-2.5 py-1 rounded-full border border-forest-200">
                {profileCompletionPercentage}% profile ready
              </span>
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="text-xs text-charcoal-600 hover:text-charcoal-900 font-medium"
              >
                Edit Profile
              </button>
              <Link to="/advisor">
                <Button variant="primary" size="sm" icon={Sparkles} iconPosition="left">
                  Ask AI Guide
                </Button>
              </Link>
            </div>
          </div>

          <div className="pt-2">
            <blockquote className="font-serif italic text-sm sm:text-base text-charcoal-700 leading-relaxed">
              “{currentQuote.quote}”
            </blockquote>
            <p className="text-[11px] text-charcoal-400 mt-0.5">
              — {currentQuote.author}
            </p>
          </div>
        </div>

        {/* 3 Self-Discovery Assessment Modules Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Personality Assessment Card */}
          <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-forest-800">
                  Step 1
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  studentProfile.personalityResult
                    ? 'bg-forest-100 text-forest-800'
                    : 'bg-muted text-charcoal-600'
                }`}>
                  {studentProfile.personalityResult ? 'Completed' : 'Not Started'}
                </span>
              </div>

              <h3 className="font-bold text-base text-charcoal-900">
                Personality Assessment
              </h3>

              <p className="text-xs text-charcoal-600 leading-relaxed">
                Understand how you naturally solve problems, make decisions, and collaborate in teams.
              </p>

              {studentProfile.personalityResult && (
                <div className="p-3 rounded-2xl bg-ivory-50 border border-ivory-200 text-xs font-medium text-forest-900">
                  Archetype: <strong className="text-charcoal-900">{studentProfile.personalityResult.archetype?.title}</strong>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-ivory-200 flex justify-end">
              <Link to="/assessment/personality">
                <Button variant={studentProfile.personalityResult ? "ghost" : "primary"} size="sm">
                  {studentProfile.personalityResult ? "View Results →" : "Start Assessment"}
                </Button>
              </Link>
            </div>
          </div>

          {/* 2. Interest Assessment Card */}
          <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-forest-800">
                  Step 2
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  studentProfile.interestResult
                    ? 'bg-forest-100 text-forest-800'
                    : 'bg-muted text-charcoal-600'
                }`}>
                  {studentProfile.interestResult ? 'Completed' : 'Not Started'}
                </span>
              </div>

              <h3 className="font-bold text-base text-charcoal-900">
                Interest Assessment
              </h3>

              <p className="text-xs text-charcoal-600 leading-relaxed">
                Map your curiosity distribution across 10 core fields from technology to social impact.
              </p>

              {studentProfile.interestResult && (
                <div className="p-3 rounded-2xl bg-ivory-50 border border-ivory-200 text-xs font-medium text-forest-900 truncate">
                  Top Field: <strong className="text-charcoal-900">{studentProfile.interestResult.topThree?.[0]?.name}</strong>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-ivory-200 flex justify-end">
              <Link to="/assessment/interests">
                <Button variant={studentProfile.interestResult ? "ghost" : "primary"} size="sm">
                  {studentProfile.interestResult ? "View Spectrum →" : "Start Assessment"}
                </Button>
              </Link>
            </div>
          </div>

          {/* 3. Strength Assessment Card */}
          <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-forest-800">
                  Step 3
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  studentProfile.strengthResult
                    ? 'bg-forest-100 text-forest-800'
                    : 'bg-muted text-charcoal-600'
                }`}>
                  {studentProfile.strengthResult ? 'Completed' : 'Not Started'}
                </span>
              </div>

              <h3 className="font-bold text-base text-charcoal-900">
                Strength Assessment
              </h3>

              <p className="text-xs text-charcoal-600 leading-relaxed">
                Identify your top capabilities across analytical, creative, communication, and execution pillars.
              </p>

              {studentProfile.strengthResult && (
                <div className="p-3 rounded-2xl bg-ivory-50 border border-ivory-200 text-xs font-medium text-forest-900 truncate">
                  Signature: <strong className="text-charcoal-900">{studentProfile.strengthResult.signatureTitle}</strong>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-ivory-200 flex justify-end">
              <Link to="/assessment/strengths">
                <Button variant={studentProfile.strengthResult ? "ghost" : "primary"} size="sm">
                  {studentProfile.strengthResult ? "View Strengths →" : "Start Assessment"}
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Skill Gap & Learning Roadmap Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Skill Gap Card */}
          <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-forest-800">
                Action Step 3
              </span>
              <h3 className="font-bold text-base text-charcoal-900">
                Analyze Your Skill Gaps
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Compare your existing technical and soft skills against any of our 21 careers to see what you need to develop.
              </p>
            </div>

            <div className="pt-3 border-t border-ivory-200 flex justify-end">
              <Link to="/skills">
                <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
                  Open Skill Gap Analyzer
                </Button>
              </Link>
            </div>
          </div>

          {/* Learning Roadmap Card */}
          <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-forest-800">
                Action Step 4
              </span>
              <h3 className="font-bold text-base text-charcoal-900">
                Personalized Learning Roadmap
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Follow structured 4-stage roadmaps with free beginner tutorials, courses, and hands-on portfolio projects.
              </p>
            </div>

            <div className="pt-3 border-t border-ivory-200 flex justify-end">
              <Link to="/roadmap">
                <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
                  View Learning Roadmaps
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Career Experiments Quick Banner */}
        <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800">
              Interactive Test Drive
            </span>
            <h3 className="font-bold text-sm text-charcoal-900">
              Experience a Career Before Deciding
            </h3>
            <p className="text-xs text-charcoal-600">
              Solve real situations faced by Product Designers, Engineers, and Analysts in 3-minute interactive simulations.
            </p>
          </div>
          <Link to="/experiments" className="shrink-0">
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Explore Experiments
            </Button>
          </Link>
        </div>

        {/* Recommended Careers */}
        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-forest-800">
                Curated For You
              </span>
              <h3 className="text-lg font-bold text-charcoal-900 mt-0.5">
                Recommended Career Directions
              </h3>
            </div>
            <Link to="/recommendations" className="text-xs font-semibold text-forest-800 hover:text-forest-900">
              View full recommendations breakdown →
            </Link>
          </div>

          {!hasAnyDiscoveryData && (
            <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-charcoal-600">
                Complete at least one assessment or career experiment to personalize your match scores and explanations.
              </p>
              <Link to="/assessment/personality" className="text-xs font-bold text-forest-800 hover:underline shrink-0">
                Take 5-min Assessment →
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCareers.map((career) => (
              <div
                key={career.id}
                className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-xs text-charcoal-900">{career.title}</h4>
                    {hasAnyDiscoveryData && career.matchPercentage && (
                      <span className="text-[10px] font-mono font-bold text-forest-800 bg-forest-50 px-2 py-0.5 rounded-full border border-forest-200 shrink-0">
                        {career.matchPercentage}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-forest-800 font-medium mt-0.5">{career.field}</p>
                  <p className="text-[11px] text-charcoal-600 mt-2 leading-relaxed">{career.reason}</p>
                </div>
                <Link
                  to={`/careers/${career.id}`}
                  className="text-xs font-semibold text-forest-800 hover:text-forest-900 inline-flex items-center gap-1 pt-1"
                >
                  <span>Learn about this role →</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Careers, Discovered Skills & Active Learning Roadmaps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Saved Careers */}
          <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-forest-700" />
                  <span>Saved Careers</span>
                </h3>
                <span className="text-xs font-mono font-bold text-forest-800">
                  {normalizedSavedCareers.length}
                </span>
              </div>

              {normalizedSavedCareers.length > 0 ? (
                <div className="space-y-2">
                  {normalizedSavedCareers.slice(0, 4).map((c) => (
                    <Link
                      key={c.id}
                      to={`/careers/${c.id}`}
                      className="block p-3 rounded-2xl bg-ivory-50 hover:bg-muted border border-ivory-200 transition-colors"
                    >
                      <p className="text-xs font-bold text-charcoal-900 truncate">{c.title}</p>
                      <p className="text-[10px] text-charcoal-500 truncate">{c.category}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-charcoal-500 leading-relaxed py-2">
                  You haven&apos;t bookmarked any careers yet. Explore the Career Library to save roles that catch your eye.
                </p>
              )}
            </div>
            <Link to="/careers" className="text-xs font-semibold text-forest-800 hover:underline pt-2 inline-block">
              Browse Career Library →
            </Link>
          </div>

          {/* Discovered Skills */}
          <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-forest-700" />
                  <span>Discovered Skills</span>
                </h3>
                <span className="text-xs font-mono font-bold text-forest-800">
                  {discoveredSkills.length}
                </span>
              </div>

              {discoveredSkills.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {discoveredSkills.slice(0, 8).map((sk) => (
                    <span
                      key={sk}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-900 font-medium"
                    >
                      ✓ {sk}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-charcoal-500 leading-relaxed py-2">
                  No hands-on skills verified yet. Complete a 4-minute simulation in Career Experiments to unlock skills.
                </p>
              )}
            </div>
            <Link to="/experiments" className="text-xs font-semibold text-forest-800 hover:underline pt-2 inline-block">
              Try a Career Experiment →
            </Link>
          </div>

          {/* Learning Roadmap Progress */}
          <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5">
                  <Map className="w-3.5 h-3.5 text-forest-700" />
                  <span>Roadmap Progress</span>
                </h3>
                <span className="text-xs font-mono font-bold text-forest-800">
                  {activeRoadmaps.length} active
                </span>
              </div>

              {activeRoadmaps.length > 0 ? (
                <div className="space-y-2.5">
                  {activeRoadmaps.slice(0, 3).map((rm) => (
                    <Link
                      key={rm.careerId}
                      to={`/roadmap?career=${rm.careerId}`}
                      className="block p-3 rounded-2xl bg-ivory-50 hover:bg-muted border border-ivory-200 space-y-1.5 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-charcoal-900 truncate pr-2">{rm.careerTitle}</span>
                        <span className="font-mono text-forest-800 font-bold shrink-0">{rm.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-ivory-200 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${rm.percentage}%` }} />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-charcoal-500 leading-relaxed py-2">
                  No roadmap milestones checked off yet. Pick a target career in Learning Roadmaps to track your steps.
                </p>
              )}
            </div>
            <Link to="/roadmap" className="text-xs font-semibold text-forest-800 hover:underline pt-2 inline-block">
              Open Learning Roadmaps →
            </Link>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
            Recent Activities
          </h3>

          {(studentProfile.recentActivities || []).length > 0 ? (
            <div className="divide-y divide-ivory-200/60">
              {(studentProfile.recentActivities || []).slice(0, 5).map((act) => (
                <div key={act.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-medium text-charcoal-800">{act.title}</p>
                    <p className="text-[11px] text-charcoal-500">{act.detail}</p>
                  </div>
                  <span className="text-[10px] text-charcoal-400 font-mono">
                    {act.timestamp}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-charcoal-500 py-2">
              Your recent assessments, experiments, and roadmap milestones will appear here as you explore.
            </p>
          )}
        </div>

      </main>

      {/* Modals */}
      <ProfileSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <RoleDetailModal
        isOpen={!!selectedRoleForDetail}
        onClose={() => setSelectedRoleForDetail(null)}
        role={selectedRoleForDetail}
      />
    </div>
  );
};
