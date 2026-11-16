import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  Sparkles,
  Brain,
  FlaskConical,
  MessageSquareText,
  Map,
  CheckCircle2,
  ShieldCheck,
  Target,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const STUDENT_PROBLEMS_SOLVED = [
  {
    problem: 'Confusing jargon & vague advice',
    solution:
      'Plain-English questions and everyday college scenarios reveal how you think and what drives your curiosity.'
  },
  {
    problem: 'Choosing a major blindly',
    solution:
      'Compare 21+ careers across 15 modern fields alongside daily tasks, skills needed, and degree connections.'
  },
  {
    problem: 'Never trying work before committing',
    solution:
      'Bite-sized interactive Career Experiments let you test-drive real role tasks in 15–25 minutes.'
  },
  {
    problem: 'No clear step-by-step path after deciding',
    solution:
      'Skill Gap Analyzer and structured Learning Roadmaps translate goals into practical weekly milestones.'
  }
];

const PLATFORM_FEATURES = [
  {
    icon: Brain,
    tag: 'Interests & Strengths',
    title: 'Personality & 10-Field Interest Assessments',
    description:
      'Answer simple conversational questions about group projects, classes, and problem-solving habits. Scores across all 10 interest categories are calculated purely from your actual choices—no hardcoded defaults.',
    ctaLabel: 'Sign in to take assessments',
    destination: '/assessment/personality'
  },
  {
    icon: Compass,
    tag: 'Career Exploration',
    title: 'Curated Career Library & Role Breakdowns',
    description:
      'Explore technology, design, healthcare, climate, policy, business, and research roles. Understand what a typical week feels like, how skills transfer, and which college majors lead there.',
    ctaLabel: 'Sign in to explore careers',
    destination: '/careers'
  },
  {
    icon: FlaskConical,
    tag: 'Career Exploration Lab',
    title: 'Hands-On Interactive Career Experiments',
    description:
      'Go beyond reading job titles. Try interactive mini-projects across 10 categories—from UX wireframing and debugging logic to business trade-offs and social impact challenges—to see what excites you in practice.',
    ctaLabel: 'Sign in to try experiments',
    destination: '/experiments'
  },
  {
    icon: MessageSquareText,
    tag: 'AI Career Companion',
    title: 'Personalized Plain-Language Career Guidance',
    description:
      'Stuck deciding between majors like CSE vs. ECE or combining art and engineering? Ask PathPilot’s AI Guide anytime for calm, honest, student-friendly perspective and recommended roles.',
    ctaLabel: 'Sign in to ask AI Guide',
    destination: '/advisor'
  },
  {
    icon: Map,
    tag: 'Skill Gaps & Roadmaps',
    title: 'Structured Skill Gap & Learning Roadmaps',
    description:
      'Check off your existing strengths against any target career, spotlight missing skills clearly, and follow a three-stage roadmap of small, achievable learning milestones.',
    ctaLabel: 'Sign in to build your roadmap',
    destination: '/roadmap'
  }
];

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Discover Your Thinking Style & Interests',
    description:
      'Complete quick, jargon-free Personality and Interest assessments designed around real college situations.'
  },
  {
    step: '02',
    title: 'Explore Matching Fields & Real Roles',
    description:
      'Review career profiles matched to your genuine results, see daily workflows, and bookmark top paths.'
  },
  {
    step: '03',
    title: 'Test Careers Through Mini-Experiments',
    description:
      'Practice bite-sized simulations in the Career Exploration Lab and chat with AI Guide whenever questions come up.'
  },
  {
    step: '04',
    title: 'Build Your Skill Roadmap',
    description:
      'Spot skill gaps for your chosen direction and track concrete next steps inside your student workspace.'
  }
];

export const PublicLandingPage = ({ initialSection = null }) => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const hashTarget = location.hash ? location.hash.replace('#', '') : '';
    const targetId = hashTarget || initialSection;

    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash, initialSection]);

  return (
    <main className="min-h-screen bg-ivory-50 text-charcoal-900">
      {/* 1. Public Hero Section */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-24 bg-ivory-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100/75 border border-forest-200/80 text-forest-900 text-xs font-semibold tracking-tight">
                <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                <span>Career Clarity Built for College Students</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal-900 leading-[1.1]">
                Figure out where you belong—
                <span className="font-serif italic font-normal text-forest-800 block mt-1">
                  one honest step at a time.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 max-w-xl leading-relaxed">
                PathPilot is a guided student career discovery platform. Uncover your natural
                strengths, test real roles through short experiments, talk through dilemmas with an
                AI Guide, and turn curiosity into an actionable learning roadmap.
              </p>

              {/* Prominent Auth Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                {user ? (
                  <>
                    <Link
                      to="/home"
                      className="px-7 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-on-accent text-sm font-semibold tracking-tight shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2"
                    >
                      <span>Open Student Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/dashboard"
                      className="px-7 py-3.5 rounded-full bg-card hover:bg-muted text-charcoal-800 border border-ivory-200 text-sm font-semibold transition-all inline-flex items-center justify-center"
                    >
                      View Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="px-7 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-on-accent text-sm font-semibold tracking-tight shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2"
                    >
                      <span>Create Free Student Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/login"
                      className="px-7 py-3.5 rounded-full bg-card hover:bg-muted text-charcoal-900 border border-ivory-200 text-sm font-semibold transition-all inline-flex items-center justify-center gap-2"
                    >
                      <span>Login to Continue</span>
                    </Link>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-charcoal-500">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-forest-700" />
                  Private student progress tracking
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-700" />
                  21+ career paths &amp; 10 hands-on labs
                </span>
              </div>
            </div>

            {/* Clean Architectural Visual Preview Card (Static product architecture overview, zero private student data) */}
            <div className="lg:col-span-5">
              <div className="bg-card rounded-[32px] border border-ivory-200 shadow-card p-6 sm:p-7 space-y-5 relative">
                <div className="flex items-center justify-between pb-4 border-b border-ivory-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-accent text-on-accent flex items-center justify-center">
                      <Compass className="w-4 h-4 text-accent-soft" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-charcoal-900">Your Guided Trajectory</p>
                      <p className="text-[11px] text-charcoal-500">From college questions to clear direction</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-forest-50 border border-forest-200/80 text-[10px] font-semibold text-forest-800">
                    Member Access
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      step: '01',
                      label: 'Strengths & Interests',
                      detail: 'Plain-English self-discovery across 10 fields'
                    },
                    {
                      step: '02',
                      label: 'Career Exploration Lab',
                      detail: 'Short practical activities across 10 categories'
                    },
                    {
                      step: '03',
                      label: 'AI Career Companion',
                      detail: 'Thoughtful guidance on majors, skills & tradeoffs'
                    },
                    {
                      step: '04',
                      label: 'Skill Gap & Roadmap',
                      detail: 'Clear stage-by-stage plan tailored to your role'
                    }
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200"
                    >
                      <span className="w-7 h-7 rounded-full bg-card border border-ivory-200 text-forest-800 font-serif italic text-xs font-semibold flex items-center justify-center shrink-0">
                        {item.step}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-charcoal-900">{item.label}</p>
                        <p className="text-[11px] text-charcoal-500">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-ivory-200 flex items-center justify-between text-xs">
                  <span className="text-charcoal-500 font-medium">Ready inside PathPilot</span>
                  <Link
                    to={user ? '/home' : '/login'}
                    className="font-semibold text-forest-800 hover:text-forest-900 inline-flex items-center gap-1"
                  >
                    <span>{user ? 'Enter workspace' : 'Sign in to unlock'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About PathPilot: What, Why & Problems Solved */}
      <section
        id="about"
        className="py-20 md:py-24 bg-card/70 border-t border-ivory-200/80 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-6 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200/80 text-forest-800 text-xs font-semibold">
                <Target className="w-3.5 h-3.5 text-forest-700" />
                <span>About PathPilot</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 leading-tight">
                What is PathPilot, and why was it created?
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-charcoal-600 leading-relaxed">
              <p>
                <strong className="text-charcoal-900">PathPilot</strong> is a student-first career
                discovery platform built to bridge the gap between what you study in college and the
                real careers waiting beyond graduation.
              </p>
              <p>
                It was created because most career tools overwhelm students with dense corporate
                jargon, generic personality labels, or static job lists that never show what a job
                actually feels like day to day. PathPilot gives students a calm, structured place to
                understand themselves, test roles hands-on, and plan their next skills with confidence.
              </p>
            </div>
          </div>

          {/* Problems PathPilot Solves */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STUDENT_PROBLEMS_SOLVED.map((item) => (
              <div
                key={item.problem}
                className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-subtle space-y-3"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800 block">
                  Student Challenge
                </span>
                <h3 className="text-sm font-bold text-charcoal-900 leading-snug">
                  {item.problem}
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed pt-2 border-t border-ivory-200/80">
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Platform Capabilities */}
      <section className="py-20 md:py-24 bg-ivory-50 border-t border-ivory-200/80">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200/80 text-forest-800 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-forest-700" />
              <span>Inside the Platform</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 leading-tight">
              Everything you need to explore your future in one workspace.
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600">
              Sign in with your student account to unlock interactive tools tailored to your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLATFORM_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card rounded-3xl p-7 border border-ivory-200 hover:border-forest-600/40 shadow-subtle transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-forest-50 border border-forest-200/80 text-forest-800 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-charcoal-500">
                        {feature.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-charcoal-900 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-ivory-200">
                    <Link
                      to={user ? feature.destination : '/login'}
                      state={!user ? { from: { pathname: feature.destination } } : undefined}
                      className="text-xs font-semibold text-forest-800 hover:text-forest-900 inline-flex items-center gap-1.5 group"
                    >
                      <span>
                        {user ? `Open ${feature.tag}` : feature.ctaLabel}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section
        id="how-it-works"
        className="py-20 md:py-24 bg-card/70 border-t border-ivory-200/80 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 block">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 leading-tight">
              Four clear steps from uncertainty to action.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-card rounded-3xl p-6 border border-ivory-200 shadow-subtle space-y-3"
              >
                <span className="font-serif italic text-2xl text-forest-800 block">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-charcoal-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-ivory-50 border-t border-ivory-200/80 text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <p className="text-xs uppercase font-bold tracking-wider text-forest-800">
            Start Your PathPilot Workspace
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 leading-tight">
            Ready to explore your real options?
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            Create an account in seconds or sign in to continue your assessments, experiments, and
            personalized roadmap.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {user ? (
              <Link
                to="/home"
                className="px-7 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-on-accent text-sm font-semibold inline-flex items-center gap-2 transition-all"
              >
                <span>Go to Workspace Home</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-on-accent text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all"
                >
                  <span>Sign Up Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-card hover:bg-muted text-charcoal-900 border border-ivory-200 text-sm font-semibold inline-flex items-center justify-center transition-all"
                >
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
