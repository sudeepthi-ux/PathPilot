import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, User } from 'lucide-react';

export const AiGuidancePreview = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(0);

  const studentPrompts = [
    {
      id: "art-code",
      chip: "Art + Coding",
      question: "I like visual art and computer science, but I don't know what careers exist between them.",
      answer: {
        role: "Product & UI/UX Design or Creative Technology",
        summary: "You don't have to choose between art and computers. The digital world desperately needs people who understand both aesthetics and code.",
        steps: [
          "Learn the basics of Figma to sketch and design app interfaces.",
          "Build a simple interactive website showing your artwork and small code experiments.",
          "Explore how creative studios blend 3D design, motion, and web development."
        ]
      }
    },
    {
      id: "no-idea",
      chip: "Not Sure Yet",
      question: "I genuinely don't know what I'm good at yet. How do I even begin figuring it out?",
      answer: {
        role: "Start With Exploration, Not Pressure",
        summary: "Most students feel this way, even if they pretend they don't. The best way to find out what fits is to try small projects and notice what energizes you.",
        steps: [
          "Take PathPilot's 5-minute personality assessment to identify your natural thinking style.",
          "Shadow or talk to 2 people in fields you find slightly interesting.",
          "Remember that career discovery is a series of small, fun experiments, not a permanent test."
        ]
      }
    },
    {
      id: "bio-not-doctor",
      chip: "Biology Without Medicine",
      question: "I love biology classes, but I know I don't want to go to medical school or be a doctor.",
      answer: {
        role: "Biotechnology, Genomics, or Health Tech",
        summary: "Medicine is only one small slice of biology. Exciting fields exist in genetic software, environmental science, laboratory tools, and science communication.",
        steps: [
          "Look into Computational Biology — using software to analyze DNA and biological systems.",
          "Explore sustainability careers working on clean agriculture or bio-materials.",
          "Check out digital health tools improving patient experiences outside of hospitals."
        ]
      }
    }
  ];

  const current = studentPrompts[selectedPrompt];

  return (
    <section className="py-20 md:py-28 bg-ivory-50 border-t border-ivory-200/70">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
            Ask PathPilot
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900">
            Real questions. Friendly answers.
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Ask about choosing a major, exploring careers, or figuring out your next step.
          </p>
        </div>

        {/* Gemini-Inspired Clean Canvas */}
        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm space-y-6">
          
          {/* Prompt Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-ivory-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 shrink-0 mr-1">
              Popular questions:
            </span>
            {studentPrompts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedPrompt(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedPrompt === idx
                    ? 'bg-accent text-on-accent shadow-sm'
                    : 'bg-ivory-50 text-charcoal-700 hover:bg-muted'
                }`}
              >
                {p.chip}
              </button>
            ))}
          </div>

          {/* Student Question */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-ivory-50 border border-ivory-200 text-charcoal-700 flex items-center justify-center shrink-0 mt-0.5">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="bg-ivory-50 rounded-2xl p-4 text-xs sm:text-sm text-charcoal-800 font-medium leading-relaxed max-w-2xl border border-ivory-200/80">
              "{current.question}"
            </div>
          </div>

          {/* AI Response */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-accent text-on-accent flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-accent-soft" />
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-charcoal-800 flex-1">
              <div>
                <p className="text-xs uppercase font-bold text-forest-800 tracking-wider mb-1">
                  Suggested Direction: {current.answer.role}
                </p>
                <p className="text-charcoal-700 leading-relaxed">
                  {current.answer.summary}
                </p>
              </div>

              {/* Action Steps */}
              <div className="space-y-2 bg-ivory-50 p-4 rounded-2xl border border-ivory-200">
                <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal-700">
                  Helpful Next Steps:
                </p>
                <ul className="space-y-1.5 text-xs text-charcoal-600">
                  {current.answer.steps.map((st, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-forest-700 font-bold">•</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Link to Full AI Advisor */}
          <div className="pt-4 border-t border-ivory-200 flex items-center justify-between">
            <span className="text-xs text-charcoal-400">
              Have your own question?
            </span>
            <Link
              to="/advisor"
              className="text-xs font-semibold text-forest-800 hover:text-forest-900 inline-flex items-center gap-1 group"
            >
              <span>Chat with PathPilot Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
