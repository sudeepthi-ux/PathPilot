// Authentic Strength Assessment Questions & Answer-Based Pillar Scoring Engine

export const strengthQuestions = [
  {
    id: 1,
    domain: 'Problem Breakdown',
    question: 'When a project deadline is tight and everyone feels stuck on what to fix first, how do you naturally step in?',
    options: [
      {
        id: 'a',
        label: 'Diagnose the root bottleneck using facts and metrics',
        desc: 'I map out every dependency, isolate what is blocking everything else, and verify with clear evidence.',
        scores: { analytical: 4, creative: 1, communication: 1, execution: 3 }
      },
      {
        id: 'b',
        label: 'Sketch a fresh, simpler alternative angle nobody tried yet',
        desc: 'Instead of wrestling with a broken approach, I reimagine how the experience could work differently.',
        scores: { analytical: 1, creative: 4, communication: 2, execution: 1 }
      },
      {
        id: 'c',
        label: 'Align teammates and facilitate an honest reset conversation',
        desc: 'I listen to each person’s hurdle and translate everyone’s thoughts into clear shared priorities.',
        scores: { analytical: 1, creative: 2, communication: 4, execution: 2 }
      },
      {
        id: 'd',
        label: 'Split the work into small concrete deliverables and drive completion',
        desc: 'I immediately list owners, set checkpoints, and start knocking tasks off step by step.',
        scores: { analytical: 2, creative: 1, communication: 2, execution: 4 }
      }
    ]
  },
  {
    id: 2,
    domain: 'Learning & Mastery',
    question: 'When picking up a completely unfamiliar tool or skill on your own, what gives you the quickest confidence?',
    options: [
      {
        id: 'a',
        label: 'Understanding how the underlying principles and logic fit together',
        desc: 'Once I know why a rule or architecture works under the hood, I can apply it to anything.',
        scores: { analytical: 4, creative: 2, communication: 1, execution: 2 }
      },
      {
        id: 'b',
        label: 'Experimenting playfully and customizing something visual right away',
        desc: 'I learn fastest when tinkering, rearranging components, and seeing instant tangible output.',
        scores: { analytical: 1, creative: 4, communication: 1, execution: 2 }
      },
      {
        id: 'c',
        label: 'Explaining what I learned to a classmate or discussing examples together',
        desc: 'Teaching a concept back out loud helps me lock in clarity and notice nuances.',
        scores: { analytical: 1, creative: 2, communication: 4, execution: 1 }
      },
      {
        id: 'd',
        label: 'Completing a structured checklist of real practice exercises cleanly',
        desc: 'Finishing defined challenges steadily gives me visible proof that I can execute reliably.',
        scores: { analytical: 2, creative: 1, communication: 1, execution: 4 }
      }
    ]
  },
  {
    id: 3,
    domain: 'Information & Insights',
    question: 'You are handed raw survey feedback or a dense 20-page document for a team decision. What do you spot fastest?',
    options: [
      {
        id: 'a',
        label: 'Trends, contradictions, and hidden numbers across the rows',
        desc: 'I quickly verify claims against numbers and catch flaws in reasoning.',
        scores: { analytical: 4, creative: 1, communication: 1, execution: 2 }
      },
      {
        id: 'b',
        label: 'Opportunities to turn cluttered ideas into a crisp visual flow',
        desc: 'I naturally picture diagrams, cleaner screen flows, or a compelling concept.',
        scores: { analytical: 1, creative: 4, communication: 2, execution: 1 }
      },
      {
        id: 'c',
        label: 'What real users actually care about—and how to frame the story clearly',
        desc: 'I zero in on the human emotion behind feedback and write summaries anyone grasps.',
        scores: { analytical: 1, creative: 2, communication: 4, execution: 1 }
      },
      {
        id: 'd',
        label: 'Exact action items, timelines, and risks to resolve before launch',
        desc: 'I turn vague paragraphs into concrete deliverables and realistic schedules.',
        scores: { analytical: 2, creative: 1, communication: 2, execution: 4 }
      }
    ]
  },
  {
    id: 4,
    domain: 'Peer Recognition',
    question: 'What do friends, teammates, or classmates most consistently come to you for help with?',
    options: [
      {
        id: 'a',
        label: 'Debugging tricky logic, math concepts, or technical assignments',
        desc: 'People count on my patience and clear step-by-step analysis when problems stall.',
        scores: { analytical: 4, creative: 1, communication: 1, execution: 2 }
      },
      {
        id: 'b',
        label: 'Improving layouts, visuals, ideas, or making rough work feel polished',
        desc: 'Classmates ask for my eye on design, originality, and creative presentation.',
        scores: { analytical: 1, creative: 4, communication: 2, execution: 1 }
      },
      {
        id: 'c',
        label: 'Reviewing drafts, speaking up in presentations, or calming team tension',
        desc: 'People rely on me to voice clear arguments, listen deeply, and keep morale steady.',
        scores: { analytical: 1, creative: 2, communication: 4, execution: 1 }
      },
      {
        id: 'd',
        label: 'Keeping everyone organized and making sure projects cross the finish line',
        desc: 'Teams trust me to hold deadlines, coordinate pieces, and handle critical follow-through.',
        scores: { analytical: 2, creative: 1, communication: 2, execution: 4 }
      }
    ]
  },
  {
    id: 5,
    domain: 'Building & Craft',
    question: 'During a weekend hackathon or intensive group sprint, which role naturally energizes you most?',
    options: [
      {
        id: 'a',
        label: 'Designing the core data flow, logic engine, or analytical model',
        desc: 'Making the underlying machinery work accurately and fast gives me real satisfaction.',
        scores: { analytical: 4, creative: 2, communication: 1, execution: 2 }
      },
      {
        id: 'b',
        label: 'Prototyping the user journey, visuals, and interactive concept',
        desc: 'Turning rough prompts into a tangible experience users enjoy touching feels exciting.',
        scores: { analytical: 1, creative: 4, communication: 2, execution: 1 }
      },
      {
        id: 'c',
        label: 'Interviewing testers, shaping the narrative, and pitching the final demo',
        desc: 'Helping judges and users immediately feel why the solution matters is my favorite part.',
        scores: { analytical: 1, creative: 2, communication: 4, execution: 2 }
      },
      {
        id: 'd',
        label: 'Scoping MVP features, unblocking team members, and shipping on schedule',
        desc: 'Making sure our demo works cleanly without crashing by submission hour drives me.',
        scores: { analytical: 2, creative: 1, communication: 2, execution: 4 }
      }
    ]
  },
  {
    id: 6,
    domain: 'Handling Complexity',
    question: 'When facing an ambiguous problem with no textbook answer key, what proves to be your strongest instinct?',
    options: [
      {
        id: 'a',
        label: 'Testing variables systematically until clear patterns emerge',
        desc: 'I narrow uncertainties by isolating hypotheses one piece at a time.',
        scores: { analytical: 4, creative: 2, communication: 1, execution: 2 }
      },
      {
        id: 'b',
        label: 'Connecting unrelated disciplines to invent an original hybrid solution',
        desc: 'I thrive when there is room to experiment freely with fresh combinations.',
        scores: { analytical: 2, creative: 4, communication: 1, execution: 1 }
      },
      {
        id: 'c',
        label: 'Asking smart questions to people experienced with the real problem',
        desc: 'Gathering human context reveals constraints that pure desk research misses.',
        scores: { analytical: 1, creative: 2, communication: 4, execution: 1 }
      },
      {
        id: 'd',
        label: 'Defining a practical baseline pilot and iterating from weekly checkpoints',
        desc: 'Structured execution turns vague ambitions into measurable momentum.',
        scores: { analytical: 2, creative: 1, communication: 2, execution: 4 }
      }
    ]
  },
  {
    id: 7,
    domain: 'Attention & Quality',
    question: 'Right before submitting an assignment or releasing work, what kind of improvement do you care about most?',
    options: [
      {
        id: 'a',
        label: 'Edge cases, calculation accuracy, and logical soundness',
        desc: 'Nothing gets past me without double-checking assumptions and proofs.',
        scores: { analytical: 4, creative: 1, communication: 1, execution: 3 }
      },
      {
        id: 'b',
        label: 'Visual elegance, spacing harmony, and memorable originality',
        desc: 'Good work feels effortless when both aesthetics and user flow feel crisp.',
        scores: { analytical: 1, creative: 4, communication: 2, execution: 1 }
      },
      {
        id: 'c',
        label: 'Tone clarity, empathy for the reader, and persuasive storytelling',
        desc: 'I refine wording so even someone completely new grasps our intent immediately.',
        scores: { analytical: 1, creative: 2, communication: 4, execution: 1 }
      },
      {
        id: 'd',
        label: 'Complete requirement coverage, formatting consistency, and reliability',
        desc: 'I verify every requirement item has zero loose ends before calling work done.',
        scores: { analytical: 2, creative: 1, communication: 1, execution: 4 }
      }
    ]
  },
  {
    id: 8,
    domain: 'Communication Style',
    question: 'How do you usually make your strongest contribution during a lively class seminar or team meeting?',
    options: [
      {
        id: 'a',
        label: 'Pointing out key trade-offs, technical constraints, or missing data',
        desc: 'I ground debates in clear logic and testable reasoning.',
        scores: { analytical: 4, creative: 1, communication: 2, execution: 2 }
      },
      {
        id: 'b',
        label: 'Offering unexpected creative examples or visual analogies',
        desc: 'A fresh perspective often unlocks a room stuck in narrow thinking.',
        scores: { analytical: 1, creative: 4, communication: 2, execution: 1 }
      },
      {
        id: 'c',
        label: 'Summarizing different viewpoints so everyone feels understood and moves forward',
        desc: 'Bridging perspectives clearly builds trust and faster agreement.',
        scores: { analytical: 1, creative: 1, communication: 4, execution: 2 }
      },
      {
        id: 'd',
        label: 'Closing discussions with concrete next steps, deadlines, and owners',
        desc: 'Ideas matter most when someone translates talk into accountable action.',
        scores: { analytical: 2, creative: 1, communication: 2, execution: 4 }
      }
    ]
  },
  {
    id: 9,
    domain: 'Work Environment',
    question: 'Which kind of weekly routine keeps you performing at your absolute highest level?',
    options: [
      {
        id: 'a',
        label: 'Deep independent problem-solving time backed by solid documentation',
        desc: 'Long uninterrupted stretches let me dive deeply into tough systems and data.',
        scores: { analytical: 4, creative: 2, communication: 1, execution: 2 }
      },
      {
        id: 'b',
        label: 'Dynamic creative sprints alternating between sketching and live prototyping',
        desc: 'Variety and visual iteration keep my curiosity sharp.',
        scores: { analytical: 1, creative: 4, communication: 2, execution: 1 }
      },
      {
        id: 'c',
        label: 'Interactive workshops, peer coaching, and user-facing collaboration',
        desc: 'Regular human dialogue sparks energy and sharper ideas for me.',
        scores: { analytical: 1, creative: 2, communication: 4, execution: 2 }
      },
      {
        id: 'd',
        label: 'Goal-driven milestones with clear dashboards and measurable impact',
        desc: 'Tracking visible progress against weekly targets motivates me steadily.',
        scores: { analytical: 2, creative: 1, communication: 2, execution: 4 }
      }
    ]
  },
  {
    id: 10,
    domain: 'Long-Term Impact',
    question: 'Imagine looking back two years from now at a project you are genuinely proud of. What stands out most?',
    options: [
      {
        id: 'a',
        label: 'Solving a tough analytical or engineering puzzle nobody else cracked',
        desc: 'Building something technically rigorous that stood up under real pressure.',
        scores: { analytical: 4, creative: 1, communication: 1, execution: 3 }
      },
      {
        id: 'b',
        label: 'Crafting a distinctive product or design that delighted thousands of users',
        desc: 'Creating something original, intuitive, and memorable from early sketches.',
        scores: { analytical: 1, creative: 4, communication: 2, execution: 1 }
      },
      {
        id: 'c',
        label: 'Mentoring others, shaping public understanding, or driving human change',
        desc: 'Knowing clear communication and empathy made life easier for real people.',
        scores: { analytical: 1, creative: 2, communication: 4, execution: 2 }
      },
      {
        id: 'd',
        label: 'Leading a messy initiative from zero to reliable real-world launch',
        desc: 'Proving consistent discipline and team coordination turned vision into reality.',
        scores: { analytical: 2, creative: 1, communication: 2, execution: 4 }
      }
    ]
  }
];

const PILLAR_METADATA = {
  analytical: {
    id: 'analytical',
    label: 'Analytical & Critical Problem Solving',
    strengths: [
      'Root-Cause Debugging & Pattern Analysis',
      'Structured Technical Reasoning',
      'Evidence-Based Decision Making'
    ],
    environment: 'Deep-focus problem solving paired with clean documentation and testable logic',
    teamRole: 'Technical Diagnostician & Systems Architect',
    learningPreference: 'First-principles breakdowns followed by challenging real exercises',
    careers: [
      {
        id: 'software-engineer',
        title: 'Software Engineer',
        reason: 'Directly channels your structured analysis and debugging persistence into scalable software.'
      },
      {
        id: 'ai-engineer',
        title: 'AI & Machine Learning Engineer',
        reason: 'Uses quantitative reasoning and disciplined iteration to evaluate and ship intelligent models.'
      },
      {
        id: 'cybersecurity-analyst',
        title: 'Cybersecurity Analyst',
        reason: 'Rewards sharp pattern detection, careful verification, and adversarial thinking.'
      }
    ]
  },
  creative: {
    id: 'creative',
    label: 'Creative Design & Rapid Prototyping',
    strengths: [
      'Visual Systems & Interaction Design',
      'Lateral Concept Generation',
      'Interactive Rapid Prototyping'
    ],
    environment: 'Flexible creative studio space with visual exploration and quick user feedback',
    teamRole: 'Concept Prototype Designer & Creative Catalyst',
    learningPreference: 'Hands-on visual tinkering, live critiques, and building tangible artifacts',
    careers: [
      {
        id: 'product-designer',
        title: 'Product (UI/UX) Designer',
        reason: 'Combines layout sensibility, flow clarity, and iterative prototyping around real human needs.'
      },
      {
        id: 'creative-technologist',
        title: 'Creative Technologist',
        reason: 'Bridges imaginative aesthetics with interactive web prototypes and code.'
      },
      {
        id: 'graphic-designer',
        title: 'Visual & Brand Designer',
        reason: 'Turns complex ideas into crisp, memorable visual stories and interfaces.'
      }
    ]
  },
  communication: {
    id: 'communication',
    label: 'Empathy, Communication & Mentoring',
    strengths: [
      'Active Listening & User Empathy',
      'Clear Storytelling & Presentation',
      'Cross-Team Alignment & Coaching'
    ],
    environment: 'Collaborative teams where user research, teaching, and clear dialogue drive decisions',
    teamRole: 'Facilitator, User Advocate & Clear Storyteller',
    learningPreference: 'Discussion, real user interviews, case studies, and explaining concepts simply',
    careers: [
      {
        id: 'user-researcher',
        title: 'UX Researcher',
        reason: 'Turns empathy and structured questioning into actionable product insights.'
      },
      {
        id: 'learning-experience-designer',
        title: 'Learning Experience Designer',
        reason: 'Applies clear communication and mentoring instincts to design engaging learning journeys.'
      },
      {
        id: 'content-strategist',
        title: 'Content & Communications Strategist',
        reason: 'Translates nuanced technical or social ideas into clear, persuasive narratives.'
      }
    ]
  },
  execution: {
    id: 'execution',
    label: 'Project Execution, Leadership & Reliability',
    strengths: [
      'Milestone Scoping & Prioritization',
      'Calm Coordination Under Deadlines',
      'End-to-End Quality Follow-Through'
    ],
    environment: 'Outcome-oriented teams with clear milestones, autonomy, and measurable real-world shipping',
    teamRole: 'Product Driver, Coordinator & Dependable Finisher',
    learningPreference: 'Goal-backed project checklists, weekly shipping goals, and peer accountability',
    careers: [
      {
        id: 'product-manager',
        title: 'Product Manager',
        reason: 'Aligns engineering, design, and users around focused milestones and real product outcomes.'
      },
      {
        id: 'startup-founder',
        title: 'Entrepreneur & Startup Founder',
        reason: 'Matches your bias for shipping MVPs, coordinating people, and iterating under uncertainty.'
      },
      {
        id: 'financial-analyst',
        title: 'Financial & Operations Analyst',
        reason: 'Pairs structured execution discipline with measurable resource and risk tracking.'
      }
    ]
  }
};

/**
 * Genuine Answer-Based Strength Assessment Scoring Engine.
 * - Requires all 10 scenarios to be answered before computing results.
 * - Produces differentiated pillar scores (never 100%, never identical across pillars).
 */
export const calculateStrengthResults = (answers = {}) => {
  const missing = strengthQuestions.filter((q) => !answers[q.id]);
  if (missing.length > 0) {
    return {
      error: 'incomplete',
      missingCount: missing.length,
      missingIds: missing.map((q) => q.id),
      message: `Strength Assessment incomplete: ${missing.length} question(s) still require an answer.`
    };
  }

  const totals = { analytical: 0, creative: 0, communication: 0, execution: 0 };
  const counts = { analytical: 0, creative: 0, communication: 0, execution: 0 };

  for (const q of strengthQuestions) {
    const selectedId = answers[q.id];
    const opt = q.options.find((o) => o.id === selectedId);
    if (opt?.scores) {
      for (const pillar of Object.keys(totals)) {
        totals[pillar] += opt.scores[pillar] || 0;
        counts[pillar] += 4;
      }
    }
  }

  const normalizePillar = (key) => {
    const ratio = counts[key] ? totals[key] / counts[key] : 0;
    return Math.min(95, Math.max(18, Math.round(16 + ratio * 79)));
  };

  const pillarScores = {
    analytical: normalizePillar('analytical'),
    creative: normalizePillar('creative'),
    communication: normalizePillar('communication'),
    execution: normalizePillar('execution')
  };

  const rankedPillars = Object.entries(pillarScores)
    .map(([id, score]) => ({
      id,
      label: PILLAR_METADATA[id].label,
      score
    }))
    .sort((a, b) => b.score - a.score);

  // Deterministic tie-spacing so primary and secondary strengths stay meaningfully ranked
  if (rankedPillars[0].score === rankedPillars[1].score) {
    rankedPillars[1].score = Math.max(18, rankedPillars[1].score - 3);
    pillarScores[rankedPillars[1].id] = rankedPillars[1].score;
  }

  const primary = PILLAR_METADATA[rankedPillars[0].id];
  const secondary = PILLAR_METADATA[rankedPillars[1].id];

  const topStrengths = [
    ...primary.strengths.slice(0, 3),
    secondary.strengths[0]
  ];

  const signatureTitle = `${primary.label.split(' & ')[0]} + ${secondary.label.split(' & ')[0]}`;
  const summary = `Your answers point to strongest natural capability in ${primary.label} (${rankedPillars[0].score}%), supported closely by ${secondary.label} (${rankedPillars[1].score}%). You add the most value when teams need ${primary.strengths[0].toLowerCase()} paired with ${secondary.strengths[0].toLowerCase()}.`;

  const recommendedCareers = primary.careers.map((c, idx) => ({
    ...c,
    match: `${Math.min(95, Math.max(76, rankedPillars[0].score - idx * 2))}% Match`
  }));

  return {
    signatureTitle,
    summary,
    pillarScores,
    rankedPillars,
    topStrengths,
    preferences: {
      workingEnvironment: primary.environment,
      teamRole: primary.teamRole,
      learningPreference: primary.learningPreference
    },
    recommendedCareers,
    completedAt: new Date().toISOString()
  };
};
