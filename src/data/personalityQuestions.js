export const personalityQuestions = [
  // 1. Decision-Making
  {
    id: 1,
    domain: "Decision-Making",
    tagline: "Making Big Choices",
    question: "When you have to make an important decision with limited information, what do you usually do?",
    options: [
      {
        id: "a",
        label: "Break down the facts and compare the pros and cons",
        desc: "I like making a clear list, looking at the evidence, and choosing the most logical path.",
        scores: { systems: 4, ambiguity: 2, empathy: 1, grit: 3 }
      },
      {
        id: "b",
        label: "Try a quick experiment and see what happens",
        desc: "I prefer taking a small step forward to get real experience before committing fully.",
        scores: { systems: 2, ambiguity: 4, empathy: 1, grit: 2 }
      },
      {
        id: "c",
        label: "Talk it through with friends or the people affected",
        desc: "I want to hear how others feel and find an option that works well for everyone.",
        scores: { systems: 1, ambiguity: 2, empathy: 4, grit: 2 }
      },
      {
        id: "d",
        label: "Go with what has worked reliably in the past",
        desc: "I prefer proven methods that minimize surprises and guarantee steady results.",
        scores: { systems: 3, ambiguity: 1, empathy: 2, grit: 4 }
      }
    ]
  },
  {
    id: 2,
    domain: "Decision-Making",
    tagline: "When Plans Change",
    question: "In a group project, a classmate points out a major flaw in your team's initial idea. How do you react?",
    options: [
      {
        id: "a",
        label: "Look closely at the details to understand where things went wrong",
        desc: "I want to examine the notes or data to find the root cause of the mistake.",
        scores: { systems: 4, ambiguity: 3, empathy: 1, grit: 3 }
      },
      {
        id: "b",
        label: "Get excited to brainstorm an entirely new approach",
        desc: "Mistakes often reveal new, creative ideas that we had not considered before.",
        scores: { systems: 2, ambiguity: 4, empathy: 2, grit: 1 }
      },
      {
        id: "c",
        label: "Bring the team together to talk it over openly",
        desc: "I make sure everyone's perspective is heard so no one feels blamed or discouraged.",
        scores: { systems: 1, ambiguity: 2, empathy: 4, grit: 2 }
      },
      {
        id: "d",
        label: "Double-check the work carefully before changing anything",
        desc: "Before we throw away our plan, I want to confirm whether the issue is genuinely critical.",
        scores: { systems: 3, ambiguity: 1, empathy: 1, grit: 4 }
      }
    ]
  },

  // 2. Problem-Solving
  {
    id: 3,
    domain: "Problem-Solving",
    tagline: "Starting a New Project",
    question: "When you start a big, open-ended assignment or project, where do you begin?",
    options: [
      {
        id: "a",
        label: "Outline the entire project and break it into organized steps",
        desc: "I like seeing the big picture first and knowing how every milestone fits together.",
        scores: { systems: 4, ambiguity: 2, empathy: 1, grit: 3 }
      },
      {
        id: "b",
        label: "Jump in and make a rough first draft right away",
        desc: "Building a quick, messy version helps me learn what works faster than overthinking.",
        scores: { systems: 2, ambiguity: 4, empathy: 1, grit: 2 }
      },
      {
        id: "c",
        label: "Think about who this is for and what will help them most",
        desc: "I focus on the audience or end users so the finished project genuinely solves a problem.",
        scores: { systems: 1, ambiguity: 2, empathy: 4, grit: 2 }
      },
      {
        id: "d",
        label: "Review the grading criteria and set up a solid checklist",
        desc: "I want clear expectations and benchmarks so I know exactly what quality looks like.",
        scores: { systems: 3, ambiguity: 1, empathy: 1, grit: 4 }
      }
    ]
  },
  {
    id: 4,
    domain: "Problem-Solving",
    tagline: "Overcoming Roadblocks",
    question: "You hit a tough roadblock late at night before a deadline. What helps you push through?",
    options: [
      {
        id: "a",
        label: "Retrace my steps methodically to isolate the error",
        desc: "I test each section one by one until I find the exact spot where things broke down.",
        scores: { systems: 4, ambiguity: 2, empathy: 1, grit: 3 }
      },
      {
        id: "b",
        label: "Try a creative workaround or change the rules",
        desc: "If the standard method is blocked, I find a different, unconventional path around it.",
        scores: { systems: 2, ambiguity: 4, empathy: 1, grit: 2 }
      },
      {
        id: "c",
        label: "Message a friend or classmate to bounce ideas around",
        desc: "Talking through the problem out loud with someone usually reveals the blind spot quickly.",
        scores: { systems: 1, ambiguity: 2, empathy: 4, grit: 2 }
      },
      {
        id: "d",
        label: "Stay with it with calm focus until I solve it",
        desc: "I have strong patience for details and take pride in sticking with it until it works.",
        scores: { systems: 2, ambiguity: 1, empathy: 1, grit: 4 }
      }
    ]
  },

  // 3. Creativity & Ideation
  {
    id: 5,
    domain: "Creativity",
    tagline: "What Creativity Means to You",
    question: "Which of these feels like the most exciting kind of creative work?",
    options: [
      {
        id: "a",
        label: "Connecting two completely different subjects together",
        desc: "Like using ideas from music in programming, or applying psychology to web design.",
        scores: { systems: 4, ambiguity: 3, empathy: 1, grit: 2 }
      },
      {
        id: "b",
        label: "Inventing original ideas that challenge the standard way",
        desc: "Proposing bold, imaginative concepts that make people look at things differently.",
        scores: { systems: 1, ambiguity: 4, empathy: 2, grit: 1 }
      },
      {
        id: "c",
        label: "Designing something that brings people joy and feels great to use",
        desc: "Creating an experience, product, or story that connects with people emotionally.",
        scores: { systems: 1, ambiguity: 2, empathy: 4, grit: 2 }
      },
      {
        id: "d",
        label: "Refining something complex until it works simply and smoothly",
        desc: "Taking a messy layout or slow code and turning it into an elegant, fast solution.",
        scores: { systems: 3, ambiguity: 1, empathy: 1, grit: 4 }
      }
    ]
  },
  {
    id: 6,
    domain: "Creativity",
    tagline: "Choosing Between Ideas",
    question: "Your team has come up with ten different ideas for a project. How do you pick the best one?",
    options: [
      {
        id: "a",
        label: "Compare which idea has the highest practical impact",
        desc: "I focus on which option solves the real underlying problem in the cleanest way.",
        scores: { systems: 4, ambiguity: 2, empathy: 1, grit: 3 }
      },
      {
        id: "b",
        label: "Pick the boldest, most interesting idea",
        desc: "Safe ideas are forgettable; I would rather go after something ambitious and memorable.",
        scores: { systems: 1, ambiguity: 4, empathy: 1, grit: 2 }
      },
      {
        id: "c",
        label: "Choose the idea that people will find easiest and friendliest to use",
        desc: "No matter how clever an idea is, its true value comes from how well it helps real people.",
        scores: { systems: 1, ambiguity: 2, empathy: 4, grit: 2 }
      },
      {
        id: "d",
        label: "Choose the idea our team can execute with high quality",
        desc: "A realistic idea executed with care and polish beats a huge idea that never gets finished.",
        scores: { systems: 2, ambiguity: 1, empathy: 2, grit: 4 }
      }
    ]
  },

  // 4. Teamwork & Collaboration
  {
    id: 7,
    domain: "Teamwork",
    tagline: "Your Ideal Study Setting",
    question: "In what kind of work environment do you get the most done?",
    options: [
      {
        id: "a",
        label: "A quiet spot with hours of uninterrupted focus",
        desc: "I like getting in the zone where I can think through complex problems on my own.",
        scores: { systems: 4, ambiguity: 2, empathy: 1, grit: 3 }
      },
      {
        id: "b",
        label: "An energetic study room with whiteboards and lively discussion",
        desc: "I get energized by bouncing thoughts back and forth with enthusiastic classmates.",
        scores: { systems: 2, ambiguity: 4, empathy: 3, grit: 1 }
      },
      {
        id: "c",
        label: "A warm, supportive group where everyone looks out for each other",
        desc: "I thrive when teammates are friendly, open, and celebrate each other's progress.",
        scores: { systems: 1, ambiguity: 2, empathy: 4, grit: 2 }
      },
      {
        id: "d",
        label: "A well-organized setup where everyone has clear tasks and deadlines",
        desc: "Give me clear expectations, and I will deliver my part reliably without distractions.",
        scores: { systems: 3, ambiguity: 1, empathy: 1, grit: 4 }
      }
    ]
  },
  {
    id: 8,
    domain: "Teamwork",
    tagline: "Working Through Disagreements",
    question: "When team members disagree about what direction to take, what do you do?",
    options: [
      {
        id: "a",
        label: "Look at the objective facts and compare the options fairly",
        desc: "Let the evidence decide the answer instead of personal opinions or egos.",
        scores: { systems: 4, ambiguity: 2, empathy: 1, grit: 3 }
      },
      {
        id: "b",
        label: "Suggest trying both on a small scale to see what works in practice",
        desc: "Testing small versions of both ideas settles debates much faster than arguing.",
        scores: { systems: 2, ambiguity: 4, empathy: 2, grit: 2 }
      },
      {
        id: "c",
        label: "Listen to both sides and help them find common ground",
        desc: "I make sure both teammates feel respected and help them reach a shared compromise.",
        scores: { systems: 1, ambiguity: 2, empathy: 4, grit: 2 }
      },
      {
        id: "d",
        label: "Remind everyone of the deadline and pick the safest path forward",
        desc: "We need to keep moving forward so the whole team finishes on time.",
        scores: { systems: 2, ambiguity: 1, empathy: 2, grit: 4 }
      }
    ]
  },

  // 5. Leadership & Initiative
  {
    id: 9,
    domain: "Leadership",
    tagline: "Leading a Project",
    question: "When you find yourself leading a group project or student club, how do you guide the team?",
    options: [
      {
        id: "a",
        label: "By setting a clear structure, goals, and high standards",
        desc: "I make sure the overall plan makes sense and everyone knows what needs to be done.",
        scores: { systems: 4, ambiguity: 2, empathy: 1, grit: 3 }
      },
      {
        id: "b",
        label: "By inspiring the team with exciting, creative possibilities",
        desc: "I get people enthusiastic about what we can accomplish and encourage bold ideas.",
        scores: { systems: 2, ambiguity: 4, empathy: 3, grit: 1 }
      },
      {
        id: "c",
        label: "By supporting teammates and making sure everyone feels heard",
        desc: "I listen closely, check in on team members, and help remove any roadblocks in their way.",
        scores: { systems: 1, ambiguity: 1, empathy: 4, grit: 2 }
      },
      {
        id: "d",
        label: "By being dependable and leading by example",
        desc: "I follow through on what I say, keep track of deadlines, and deliver steady results.",
        scores: { systems: 2, ambiguity: 1, empathy: 2, grit: 4 }
      }
    ]
  },
  {
    id: 10,
    domain: "Leadership",
    tagline: "Handling Setbacks",
    question: "A project your team worked hard on gets lower results or feedback than expected. What is your reaction?",
    options: [
      {
        id: "a",
        label: "Analyze the feedback carefully to see what specifically went wrong",
        desc: "I treat feedback as useful information to improve my process for the future.",
        scores: { systems: 4, ambiguity: 2, empathy: 2, grit: 3 }
      },
      {
        id: "b",
        label: "Shake it off quickly and focus on the next opportunity",
        desc: "Setbacks happen; I am already excited to try something new and apply what I learned.",
        scores: { systems: 1, ambiguity: 4, empathy: 2, grit: 1 }
      },
      {
        id: "c",
        label: "Check in with my teammates to keep everyone's spirits high",
        desc: "I make sure nobody feels discouraged so our team stays confident and connected.",
        scores: { systems: 1, ambiguity: 1, empathy: 4, grit: 2 }
      },
      {
        id: "d",
        label: "Review the work carefully and work harder to ace the next one",
        desc: "I take pride in my work and use setbacks as motivation to polish my craft.",
        scores: { systems: 3, ambiguity: 1, empathy: 1, grit: 4 }
      }
    ]
  }
];

/**
 * Meaningful Scoring Engine
 * Evaluates student answers across 4 core dimensions:
 * - Systems: Logical, analytical, and structured problem-solving
 * - Ambiguity: Creative exploration, curiosity, and rapid iteration
 * - Empathy: Understanding people, collaboration, and social impact
 * - Grit: Dedication, focus, craftsmanship, and reliability
 */
export const calculatePersonalityResults = (answers = {}) => {
  const missingQuestions = personalityQuestions.filter((q) => !answers[q.id]);
  if (missingQuestions.length > 0) {
    return {
      error: 'incomplete',
      missingCount: missingQuestions.length,
      missingIds: missingQuestions.map((q) => q.id),
      message: `Assessment incomplete: ${missingQuestions.length} question(s) still require an answer.`
    };
  }

  let totals = { systems: 0, ambiguity: 0, empathy: 0, grit: 0 };
  let counts = { systems: 0, ambiguity: 0, empathy: 0, grit: 0 };

  // Calculate raw scores from student answers
  personalityQuestions.forEach((q) => {
    const selectedOptionId = answers[q.id];
    const option = q.options.find((o) => o.id === selectedOptionId);
    if (option && option.scores) {
      Object.keys(option.scores).forEach((dim) => {
        totals[dim] += option.scores[dim];
        counts[dim] += 4; // Max score per question is 4
      });
    }
  });

  // Calculate normalized differentiated percentages (24% - 96%, never identical 100%)
  const calculatePercent = (dim) => {
    if (!counts[dim]) return 24;
    const rawRatio = totals[dim] / counts[dim];
    return Math.min(96, Math.max(24, Math.round(18 + rawRatio * 78)));
  };

  const scores = {
    systems: calculatePercent('systems'),
    ambiguity: calculatePercent('ambiguity'),
    empathy: calculatePercent('empathy'),
    grit: calculatePercent('grit')
  };

  // Determine top dimension with deterministic tie spacing
  const dimensionEntries = [
    { name: 'systems', score: scores.systems },
    { name: 'ambiguity', score: scores.ambiguity },
    { name: 'empathy', score: scores.empathy },
    { name: 'grit', score: scores.grit }
  ].sort((a, b) => b.score - a.score);

  if (dimensionEntries[0].score === dimensionEntries[1].score) {
    dimensionEntries[1].score = Math.max(24, dimensionEntries[1].score - 2);
    scores[dimensionEntries[1].name] = dimensionEntries[1].score;
  }

  const topDimension = dimensionEntries[0].name;
  const secondaryDimension = dimensionEntries[1].name;
  const formatMatch = (offset) => `${Math.min(96, Math.max(76, dimensionEntries[0].score - offset * 2))}% Fit`;

  let archetype = null;

  if (topDimension === "systems") {
    archetype = {
      title: "The Systems Thinker & Strategist",
      badge: "Logical Problem Solver",
      quote: "You see how the pieces connect, and you love bringing order to complex challenges.",
      overview: "You have a natural gift for looking at the big picture and understanding how things work. Whether organizing a group project, writing software, or planning a schedule, you break big problems down into clear, logical steps. People value your structured thinking and steady clarity.",
      strengths: [
        "Breaking large, messy challenges into clear, manageable steps",
        "Spotting patterns, bottlenecks, and logical inconsistencies easily",
        "Designing workflows and systems that work reliably over time",
        "Making calm, evidence-based choices without getting overwhelmed"
      ],
      naturalAbilities: [
        "Organizing complex information into simple, clear outlines",
        "Finding root causes of errors instead of just patching symptoms",
        "Thinking ahead to prevent potential problems before they happen"
      ],
      workingStyle: "You work best when you have clear goals, room for independent focus, and time to understand how all the parts fit together.",
      improvementAreas: [
        "Remember that taking action with 80% information is often better than waiting for 100% perfection",
        "Keep in mind that emotional and personal factors matter just as much as numbers and logic",
        "Practice sharing rough, early drafts with teammates before spending hours polishing"
      ],
      recommendedCareers: [
        {
          id: "software-engineer",
          title: "Full-Stack Software Engineer",
          match: formatMatch(0),
          reason: "Matches your love for building clean, logical systems that solve real problems."
        },
        {
          id: "financial-analyst",
          title: "Financial Analyst",
          match: formatMatch(1),
          reason: "Leverages your ability to find patterns in numbers and make data-driven decisions."
        },
        {
          id: "sustainable-architect",
          title: "Sustainable Architect",
          match: formatMatch(2),
          reason: "Combines structural thinking with practical, long-term spatial planning."
        }
      ]
    };
  } else if (topDimension === "ambiguity") {
    archetype = {
      title: "The Creative Explorer & Innovator",
      badge: "Curious Builder",
      quote: "You love exploring new ideas, experimenting with projects, and seeing what is possible.",
      overview: "You thrive when trying new things and thinking outside the box. You don't wait for rigid rules or perfect instructions—you jump in, build prototypes, and discover answers by doing. You bring energy, fresh perspectives, and creative spark to any team.",
      strengths: [
        "Rapidly coming up with original ideas and creative angles",
        "Adapting quickly when circumstances change or plans shift",
        "Building quick, tangible prototypes to test concepts in the real world",
        "Comfortable exploring unfamiliar topics and learning by doing"
      ],
      naturalAbilities: [
        "Spotting exciting opportunities where others see only confusion",
        "Energizing teammates with contagious enthusiasm for new projects",
        "Pivoting smoothly when an experiment shows a better direction"
      ],
      workingStyle: "You work best in flexible, fast-moving environments with high freedom, exciting challenges, and quick feedback.",
      improvementAreas: [
        "Try to stay engaged during the maintenance and polishing phase of a project",
        "Make sure to keep simple notes and documentation so teammates can follow your work",
        "Partner with structured planners to make sure your great ideas get crossed off the finish line"
      ],
      recommendedCareers: [
        {
          id: "product-designer",
          title: "Product (UI/UX) Designer",
          match: formatMatch(0),
          reason: "Combines creative visual imagination with rapid testing of new concepts."
        },
        {
          id: "creative-technologist",
          title: "Creative Technologist",
          match: formatMatch(1),
          reason: "Allows you to experiment with interactive code, visual art, and 3D web design."
        },
        {
          id: "startup-founder",
          title: "Entrepreneur & Startup Founder",
          match: formatMatch(2),
          reason: "Perfect for your high curiosity, resilience, and passion for creating new things."
        }
      ]
    };
  } else if (topDimension === "empathy") {
    archetype = {
      title: "The Human-Centered Connector",
      badge: "Team & Community Catalyst",
      quote: "You understand people naturally and make sure everyone feels heard and supported.",
      overview: "You have strong social intuition and care deeply about how decisions affect real people. You excel at listening, bringing teams together, and designing experiences that feel warm, intuitive, and welcoming. Teams look to you for empathy, communication, and heart.",
      strengths: [
        "Deep empathy and understanding of how different people think and feel",
        "Clear, welcoming communication that brings diverse people together",
        "Creating a supportive environment where everyone feels safe to contribute",
        "Translating confusing topics into friendly, relatable conversations"
      ],
      naturalAbilities: [
        "Noticing when a teammate is struggling before they even say anything",
        "Explaining complicated ideas so that anyone can easily understand",
        "Building genuine trust and collaboration across different groups"
      ],
      workingStyle: "You work best in friendly, collaborative teams with a clear social mission and lots of opportunities to interact with people.",
      improvementAreas: [
        "Remember to protect your own energy so you don't take on everyone else's stress",
        "Don't hesitate to deliver honest, constructive critique when it helps a teammate grow",
        "Set aside quiet time for your own independent study and skill development"
      ],
      recommendedCareers: [
        {
          id: "user-researcher",
          title: "UX Researcher & Behavioral Scientist",
          match: formatMatch(0),
          reason: "Directly uses your empathy to interview people and understand human behavior."
        },
        {
          id: "learning-experience-designer",
          title: "Learning Experience Designer",
          match: formatMatch(1),
          reason: "Applies your communication skills to make learning fun and accessible to everyone."
        },
        {
          id: "product-manager",
          title: "Associate Product Manager",
          match: formatMatch(2),
          reason: "Brings designers, engineers, and users together around a shared, clear purpose."
        }
      ]
    };
  } else if (topDimension === "grit") {
    archetype = {
      title: "The Thoughtful Craftsman & Specialist",
      badge: "Dedicated Finisher",
      quote: "You take pride in doing things right and seeing projects through to the very end.",
      overview: "You are the reliable backbone of any endeavor. While others might get distracted or abandon projects halfway, you have the patience and dedication to polish details, test quality, and ensure the final result is something to be proud of. People trust you because you deliver.",
      strengths: [
        "High dedication and focus when working on detailed, challenging tasks",
        "Remarkable reliability—when you take on a task, people know it gets done",
        "Careful attention to quality, verification, and catching errors early",
        "Patience for deep mastery rather than chasing superficial shortcuts"
      ],
      naturalAbilities: [
        "Finding subtle bugs, typos, and oversights that everyone else missed",
        "Building organized checklists that keep projects on schedule and budget",
        "Maintaining high standards of quality under tight academic deadlines"
      ],
      workingStyle: "You work best with clear expectations, honest feedback, and environments that respect thoroughness over rushed shortcuts.",
      improvementAreas: [
        "Don't be afraid to share a work-in-progress when an early check is needed",
        "Be open to changing course when circumstances prove an original plan needs an update",
        "Remember that 'done well' is often better than waiting endlessly for 'done perfectly'"
      ],
      recommendedCareers: [
        {
          id: "cybersecurity-analyst",
          title: "Cybersecurity Analyst",
          match: formatMatch(0),
          reason: "Matches your vigilance, eye for detail, and dedication to protecting systems."
        },
        {
          id: "biomedical-scientist",
          title: "Biomedical Research Scientist",
          match: formatMatch(1),
          reason: "Leverages your scientific patience, methodical care, and love of quality."
        },
        {
          id: "clean-energy-analyst",
          title: "Climate & Clean Energy Analyst",
          match: formatMatch(2),
          reason: "Combines rigorous data modeling with meaningful, long-term environmental action."
        }
      ]
    };
  }

  return {
    archetype,
    scores,
    topDimension,
    secondaryDimension,
    completedAt: new Date().toISOString()
  };
};
