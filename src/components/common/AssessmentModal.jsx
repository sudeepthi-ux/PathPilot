import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Brain, 
  Compass, 
  Award,
  ChevronRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

export const AssessmentModal = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [major, setMajor] = useState('Computer Science');
  const [secondaryInterest, setSecondaryInterest] = useState('Cognitive Psychology');
  const [workPreference, setWorkPreference] = useState('High Autonomy & R&D');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [result, setResult] = useState(null);

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setResult({
        trajectoryTitle: "AI Interaction & Intent Architect",
        domain: "Human-AI Symbiosis & Autonomous Systems",
        fitScore: "98.4%",
        compensation: "$138,000 - $195,000",
        growthVelocity: "+42% (5-Yr Outlook)",
        cognitiveStrengths: [
          "High systems empathy & mental model projection",
          "Translates probabilistic model behaviors into reliable interfaces",
          "Strong aversion to routine administrative maintenance"
        ],
        quarterOneMilestones: [
          "Milestone 1: Complete Stanford CS224N or equivalent transformer architecture lectures.",
          "Milestone 2: Build an interactive latency visualization canvas for generative reasoning chains.",
          "Milestone 3: Audit 3 senior design portfolio teardowns in PathPilot's library."
        ]
      });
      setStep(4);
    }, 1200);
  };

  const resetAssessment = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === 4 ? "Your Synthesized Trajectory Blueprint" : "PathPilot Cognitive Profiling"}
      subtitle={step === 4 ? "Precision Assessment Complete" : `Step ${step} of 3 — Discovery Intake`}
      maxWidth="max-w-2xl"
    >
      {step === 1 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <label className="text-xs uppercase font-bold tracking-wider text-charcoal-700 block mb-2">
              What is your current or intended primary major / discipline?
            </label>
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="e.g. Computer Science, Mechanical Eng, Biology, Economics, Philosophy"
              className="w-full px-4 py-3 rounded-2xl bg-ivory-50 border border-ivory-300 text-charcoal-900 font-medium focus:outline-none focus:ring-2 focus:ring-forest-600/30 focus:border-forest-600 text-sm"
            />
          </div>

          <div>
            <label className="text-xs uppercase font-bold tracking-wider text-charcoal-700 block mb-2">
              Select or type your secondary intellectual obsession:
            </label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {[
                "Cognitive Psychology",
                "Molecular Biology",
                "Renewable Energy",
                "Quantitative Finance",
                "Robotics & Hardware",
                "Product UI Craft"
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSecondaryInterest(opt)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-colors ${
                    secondaryInterest === opt
                      ? 'bg-accent text-on-accent border-accent'
                      : 'bg-card text-charcoal-700 border-ivory-200 hover:bg-ivory-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={secondaryInterest}
              onChange={(e) => setSecondaryInterest(e.target.value)}
              placeholder="Or write custom..."
              className="w-full px-3.5 py-2 rounded-xl bg-ivory-50 border border-ivory-300 text-xs text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(2)}
              icon={ArrowRight}
              iconPosition="right"
            >
              Continue to Step 2
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <label className="text-xs uppercase font-bold tracking-wider text-charcoal-700 block mb-2">
              What work environment brings out your highest focus?
            </label>
            <div className="space-y-2">
              {[
                { label: "High Autonomy & R&D", desc: "Solving unstructured open questions with deep independent focus" },
                { label: "Cross-Discipline Orchestration", desc: "Coordinating engineers, scientists, and executives" },
                { label: "High-Speed Commercial Scaling", desc: "Rapid iterations, user feedback loops, and venture creation" },
                { label: "High-Rigor Zero-Error Systems", desc: "Critical infrastructure, medical verification, mathematical proof" }
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setWorkPreference(item.label)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                    workPreference === item.label
                      ? 'bg-accent text-on-accent border-accent shadow-sm'
                      : 'bg-card text-charcoal-800 border-ivory-200 hover:bg-sand-50'
                  }`}
                >
                  <p className="text-xs font-bold">{item.label}</p>
                  <p className={`text-[11px] mt-0.5 ${workPreference === item.label ? 'text-accent-soft' : 'text-charcoal-500'}`}>
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(3)}
              icon={ArrowRight}
              iconPosition="right"
            >
              Continue to Step 3
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200/80">
            <h4 className="text-sm font-bold text-forest-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-forest-700" />
              Intake Summary Ready for Synthesis
            </h4>
            <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
              <div className="bg-card p-2.5 rounded-xl border border-forest-200">
                <span className="text-[10px] text-charcoal-400 block font-semibold">Primary Discipline</span>
                <span className="font-bold text-charcoal-900">{major}</span>
              </div>
              <div className="bg-card p-2.5 rounded-xl border border-forest-200">
                <span className="text-[10px] text-charcoal-400 block font-semibold">Secondary Anchor</span>
                <span className="font-bold text-charcoal-900">{secondaryInterest}</span>
              </div>
              <div className="bg-card p-2.5 rounded-xl border border-forest-200">
                <span className="text-[10px] text-charcoal-400 block font-semibold">Cognitive Focus</span>
                <span className="font-bold text-charcoal-900 truncate block">{workPreference}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-charcoal-500 leading-relaxed">
            PathPilot will benchmark your responses against 1.4M+ verified job requisitions, 480+ specialized career paths, and current compensation bands.
          </p>

          <div className="pt-2 flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              disabled={isSynthesizing}
              onClick={handleSynthesize}
              icon={Sparkles}
              iconPosition="right"
            >
              {isSynthesizing ? "Synthesizing Trajectory..." : "Generate Trajectory Blueprint"}
            </Button>
          </div>
        </div>
      )}

      {step === 4 && result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Result Card */}
          <div className="p-6 rounded-3xl bg-forest-50 border border-forest-200 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="forest" size="md" dot>
                Top Fit Trajectory
              </Badge>
              <div className="flex items-center gap-1.5 bg-card px-3 py-1 rounded-full border border-forest-200 shadow-subtle text-xs font-bold text-forest-900">
                <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                {result.fitScore} Fit Score
              </div>
            </div>

            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-forest-700">
                {result.domain}
              </p>
              <h4 className="text-2xl font-bold text-charcoal-900 tracking-tight mt-0.5">
                {result.trajectoryTitle}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-card rounded-2xl border border-forest-100">
                <span className="text-[10px] uppercase font-bold text-charcoal-400">Entry Compensation</span>
                <p className="font-bold text-charcoal-900 text-sm mt-0.5">{result.compensation}</p>
              </div>
              <div className="p-3 bg-card rounded-2xl border border-forest-100">
                <span className="text-[10px] uppercase font-bold text-charcoal-400">Demand Velocity</span>
                <p className="font-bold text-forest-800 text-sm mt-0.5">{result.growthVelocity}</p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-bold text-forest-900 block">Identified Cognitive Advantages:</span>
              {result.cognitiveStrengths.map((str, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-charcoal-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* First Milestones */}
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-charcoal-700 block">
              Immediate Quarter-One Execution Tasks:
            </span>
            <div className="space-y-1.5">
              {result.quarterOneMilestones.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-ivory-100 border border-ivory-200 text-xs text-charcoal-800">
                  {m}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-ivory-200">
            <button
              onClick={resetAssessment}
              className="text-xs text-charcoal-500 hover:text-charcoal-900 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Retake Profiling
            </button>
            <Button
              variant="primary"
              size="md"
              onClick={onClose}
              icon={CheckCircle2}
              iconPosition="right"
            >
              Save to My Career Compass
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
