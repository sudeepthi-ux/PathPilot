import React, { useState } from 'react';
import { studentStories } from '../../data/careersData';
import { 
  Check, 
  X, 
  Quote, 
  Award, 
  ArrowUpRight, 
  Building2, 
  GraduationCap, 
  TrendingUp, 
  Star 
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const StudentProof = () => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const activeStory = studentStories[activeStoryIdx];

  const comparisonPoints = [
    {
      feature: "Guidance Freshness",
      traditional: "5-10 year delayed academic catalogs & outdated brochures",
      pathpilot: "Live weekly labor telemetry indexed across 1.4M+ postings"
    },
    {
      feature: "Trajectory Discovery",
      traditional: "Surface-level Myers-Briggs or generic RIASEC quizzes",
      pathpilot: "32-signal cognitive synthesis + cross-discipline matching"
    },
    {
      feature: "Actionable Deliverables",
      traditional: "Vague encouragement to 'network' and generic resume proofing",
      pathpilot: "Semester-by-semester project briefs, GitHub portfolios, cold-outreach templates"
    },
    {
      feature: "Mentorship Availability",
      traditional: "Single 20-minute appointment scheduled 4 weeks in advance",
      pathpilot: "24/7 on-demand AI copilot trained on real interview and hiring feedback"
    },
    {
      feature: "Starting Compensation",
      traditional: "Baseline entry salaries ($68k - $74k median)",
      pathpilot: "Precision positioning into high-margin frontier niches ($115k - $160k+)"
    }
  ];

  const universityAlumni = [
    "Stanford University",
    "UC Berkeley",
    "Carnegie Mellon",
    "Georgia Tech",
    "University of Michigan",
    "MIT",
    "UT Austin",
    "Oxford University"
  ];

  return (
    <section id="stories" className="py-20 md:py-28 bg-card border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <Badge variant="forest" size="md" className="mb-3">
            Proven Trajectory Velocity
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-charcoal-900 leading-tight">
            Built for ambitious students who refuse to settle for ordinary.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed">
            See how early career clarity compounds into tangible competitive advantage, publishable portfolios, and premier offers.
          </p>
        </div>

        {/* Testimonials Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Left Column: Student Story Switcher Cards */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-charcoal-400 block mb-2">
              Select Case Journey:
            </span>
            {studentStories.map((story, idx) => {
              const isActive = activeStoryIdx === idx;
              return (
                <button
                  key={story.name}
                  onClick={() => setActiveStoryIdx(idx)}
                  className={`w-full p-4.5 rounded-2xl text-left border transition-all duration-200 ${
                    isActive
                      ? 'bg-forest-50/90 border-forest-600/70 shadow-sm ring-1 ring-forest-600/20'
                      : 'bg-ivory-50/70 border-ivory-200 hover:bg-card hover:border-ivory-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-charcoal-900">{story.name}</span>
                    <Badge variant={isActive ? "forest" : "ivory"} size="sm">
                      {story.tag}
                    </Badge>
                  </div>
                  <p className="text-xs text-charcoal-500 mb-2">
                    {story.school} • {story.major}
                  </p>
                  <div className="flex items-center justify-between text-xs font-semibold text-forest-800">
                    <span>{story.trajectory}</span>
                    <span className="text-[11px] bg-card px-2 py-0.5 rounded-full border border-ivory-200 shadow-subtle">
                      {story.salaryIncrease}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: In-Depth Student Story Editorial Canvas */}
          <div className="lg:col-span-7 bg-ivory-50/70 rounded-3xl p-6 sm:p-10 border border-ivory-300 shadow-elevated flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-ivory-200 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-accent text-on-accent font-bold text-lg flex items-center justify-center shadow-sm">
                    {activeStory.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-charcoal-900 leading-tight">
                      {activeStory.name}
                    </h3>
                    <p className="text-xs text-charcoal-500">
                      {activeStory.school} — {activeStory.major}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-400 block">
                    Placement Outcome
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-forest-800">
                    {activeStory.outcome}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="w-8 h-8 text-forest-200 absolute -top-3 -left-3 -z-10" />
                <p className="text-base sm:text-lg text-charcoal-800 font-serif italic leading-relaxed">
                  "{activeStory.quote}"
                </p>
              </div>

              {/* Highlight Metrics */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-card border border-ivory-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-charcoal-400 tracking-wider">Target Trajectory</span>
                  <p className="text-sm font-bold text-charcoal-900 mt-0.5">{activeStory.trajectory}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-charcoal-400 tracking-wider">Salary Comp Advantage</span>
                  <p className="text-sm font-bold text-forest-800 mt-0.5">{activeStory.salaryIncrease}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-ivory-200/80 mt-6 flex items-center justify-between text-xs text-charcoal-500">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-forest-700" />
                Verified graduate outcome audited by PathPilot Career Research
              </span>
              <span className="font-semibold text-forest-800">Verified Trajectory</span>
            </div>
          </div>
        </div>

        {/* University Alumni Banner */}
        <div className="py-8 border-y border-ivory-200 text-center mb-20">
          <p className="text-xs uppercase font-bold tracking-wider text-charcoal-400 mb-6">
            Students & alumni leveraging PathPilot across top institutions:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-semibold text-charcoal-600">
            {universityAlumni.map((uni) => (
              <span key={uni} className="hover:text-forest-800 transition-colors">
                {uni}
              </span>
            ))}
          </div>
        </div>

        {/* Comparative Advantage Table (The Brutal Truth vs Generic Career Centers) */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight">
              Why traditional career counseling is fundamentally broken.
            </h3>
            <p className="mt-2 text-sm text-charcoal-500">
              A transparent comparison between standard university services and PathPilot's intelligence layer.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-ivory-300 shadow-card overflow-hidden">
            <div className="grid grid-cols-12 bg-ivory-100/80 p-4 sm:p-5 border-b border-ivory-200 text-xs font-bold uppercase tracking-wider text-charcoal-600">
              <div className="col-span-4 sm:col-span-3">Dimension</div>
              <div className="col-span-4 sm:col-span-4 text-charcoal-400">Campus Career Centers</div>
              <div className="col-span-4 sm:col-span-5 text-forest-800 font-bold flex items-center gap-1">
                <span>PathPilot Intelligence</span>
                <span className="text-[10px] bg-forest-100 px-1.5 py-0.2 rounded">Advantage</span>
              </div>
            </div>

            <div className="divide-y divide-ivory-200">
              {comparisonPoints.map((pt, i) => (
                <div key={i} className="grid grid-cols-12 p-4 sm:p-5 text-xs sm:text-sm items-center hover:bg-sand-50/50 transition-colors">
                  <div className="col-span-4 sm:col-span-3 font-semibold text-charcoal-800 pr-2">
                    {pt.feature}
                  </div>
                  <div className="col-span-4 sm:col-span-4 text-charcoal-500 pr-3 flex items-start gap-1.5">
                    <X className="w-4 h-4 text-charcoal-400 shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed">{pt.traditional}</span>
                  </div>
                  <div className="col-span-4 sm:col-span-5 text-charcoal-900 font-medium flex items-start gap-1.5">
                    <Check className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed text-forest-950 font-semibold">{pt.pathpilot}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
